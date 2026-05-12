// Resend registration OTP
router.post("/resend-otp", async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ error: "User not found" });
        if (user.isVerified)
            return res.status(400).json({ error: "User already verified" });
        const otp = generateOtp();
        const otpExpires = new Date(Date.now() + 1 * 60 * 1000); // 1 min
        user.otp = otp;
        user.otpExpires = otpExpires;
        await user.save();
        await sendOtpEmail(email, otp, "registration");
        res.json({ message: "OTP resent to email." });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Resend forgot password OTP
router.post("/resend-reset-otp", async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ error: "User not found" });
        const otp = generateOtp();
        const otpExpires = new Date(Date.now() + 1 * 60 * 1000); // 1 min
        user.resetPasswordOtp = otp;
        user.resetPasswordOtpExpires = otpExpires;
        await user.save();
        await sendOtpEmail(email, otp, "reset");
        res.json({ message: "OTP resent to email for password reset." });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
// Forgot Password: Step 1 - Send OTP
router.post("/forgot-password", async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ error: "User not found" });
        const otp = generateOtp();
        const otpExpires = new Date(Date.now() + 1 * 60 * 1000); // 1 min
        user.resetPasswordOtp = otp;
        user.resetPasswordOtpExpires = otpExpires;
        await user.save();
        await sendOtpEmail(email, otp, "reset");
        res.json({ message: "OTP sent to email for password reset." });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Forgot Password: Step 2 - Verify OTP
router.post("/verify-reset-otp", async (req, res) => {
    try {
        const { email, otp } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ error: "User not found" });
        if (
            !user.resetPasswordOtp ||
            user.resetPasswordOtp !== otp ||
            !user.resetPasswordOtpExpires ||
            user.resetPasswordOtpExpires < new Date()
        ) {
            return res.status(400).json({ error: "Invalid or expired OTP" });
        }
        // Mark OTP as verified for password reset (could set a flag or just allow next step)
        user.resetPasswordOtp = undefined;
        user.resetPasswordOtpExpires = undefined;
        user._canResetPassword = true; // Not persisted, just for this request
        await user.save();
        res.json({ message: "OTP verified. You can now reset your password." });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Forgot Password: Step 3 - Reset Password
router.post("/reset-password", async (req, res) => {
    try {
        const { email, newPassword, otp } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ error: "User not found" });
        // Check OTP again for security
        if (
            !user.resetPasswordOtp ||
            user.resetPasswordOtp !== otp ||
            !user.resetPasswordOtpExpires ||
            user.resetPasswordOtpExpires < new Date()
        ) {
            return res.status(400).json({ error: "Invalid or expired OTP" });
        }
        user.password = newPassword;
        user.resetPasswordOtp = undefined;
        user.resetPasswordOtpExpires = undefined;
        await user.save();
        res.json({ message: "Password reset successful. You can now log in." });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const auth = require("../middleware/auth");
const { generateOtp } = require("../utils/otp");
const { sendOtpEmail } = require("../utils/brevo");

const router = express.Router();

const generateToken = (userId) => {
    return jwt.sign({ userId }, process.env.JWT_SECRET || "secret", {
        expiresIn: "30d",
    });
};

// Register (Step 1: send OTP)
router.post("/register", async (req, res) => {
    try {
        const { name, email, password, rollNumber, branch, regulation } =
            req.body;
        if (!name || !email || !password) {
            return res
                .status(400)
                .json({ error: "Name, email, and password are required" });
        }
        const existingUser = await User.findOne({ email });
        if (existingUser)
            return res.status(400).json({ error: "Email already registered" });

        const otp = generateOtp();
        const otpExpires = new Date(Date.now() + 1 * 60 * 1000); // 1 min
        const user = new User({
            name,
            email,
            password,
            rollNumber,
            branch,
            regulation: regulation || "R20",
            otp,
            otpExpires,
            isVerified: false,
        });
        await user.save();
        await sendOtpEmail(email, otp, "registration");
        res.status(201).json({
            message:
                "OTP sent to email. Please verify to complete registration.",
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Register (Step 2: verify OTP)
router.post("/verify-otp", async (req, res) => {
    try {
        const { email, otp } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ error: "User not found" });
        if (user.isVerified)
            return res.status(400).json({ error: "User already verified" });
        if (
            !user.otp ||
            user.otp !== otp ||
            !user.otpExpires ||
            user.otpExpires < new Date()
        ) {
            return res.status(400).json({ error: "Invalid or expired OTP" });
        }
        user.isVerified = true;
        user.otp = undefined;
        user.otpExpires = undefined;
        await user.save();
        const token = generateToken(user._id);
        res.json({ token, user });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Login
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password)
            return res
                .status(400)
                .json({ error: "Email and password are required" });

        const user = await User.findOne({ email });
        if (!user)
            return res.status(400).json({ error: "Invalid credentials" });

        const isMatch = await user.comparePassword(password);
        if (!isMatch)
            return res.status(400).json({ error: "Invalid credentials" });

        const token = generateToken(user._id);
        res.json({ token, user });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get current user
router.get("/me", auth, async (req, res) => {
    res.json({ user: req.user });
});

// Update profile
router.put("/profile", auth, async (req, res) => {
    try {
        const { name, rollNumber, branch, regulation } = req.body;
        const user = await User.findByIdAndUpdate(
            req.userId,
            { name, rollNumber, branch, regulation },
            { new: true }
        );
        res.json({ user });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
