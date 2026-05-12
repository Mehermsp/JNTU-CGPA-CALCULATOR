const BREVO_API_KEY = process.env.BREVO_API_KEY;
const BREVO_SENDER = process.env.BREVO_SENDER_EMAIL || "no-reply@example.com";

async function sendOtpEmail(to, otp, purpose = "verification") {
    const subject =
        purpose === "reset" ? "Password Reset OTP" : "Email Verification OTP";
    const text = `Your OTP for ${
        purpose === "reset" ? "password reset" : "registration"
    } is: ${otp}`;
    const html = `
        <div style="font-family: Arial, sans-serif; max-width: 480px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 8px; box-shadow: 0 2px 8px #f0f0f0;">
            <div style="background: #4f46e5; color: #fff; padding: 20px 24px; border-radius: 8px 8px 0 0;">
                <h2 style="margin: 0; font-size: 1.5em;">JNTU CGPA</h2>
            </div>
            <div style="padding: 24px;">
                <h3 style="margin-top: 0; color: #4f46e5;">${subject}</h3>
                <p style="font-size: 1.1em; color: #333;">Dear User,</p>
                <p style="font-size: 1.1em; color: #333;">Your OTP for <b>${
                    purpose === "reset" ? "password reset" : "registration"
                }</b> is:</p>
                <div style="font-size: 2em; font-weight: bold; letter-spacing: 4px; color: #4f46e5; margin: 16px 0;">${otp}</div>
                <p style="color: #555;">This OTP is valid for <b>1 minute</b>. Please do not share it with anyone.</p>
                <p style="color: #888; font-size: 0.95em; margin-top: 32px;">If you did not request this, you can safely ignore this email.</p>
            </div>
            <div style="background: #f5f5f5; color: #888; padding: 12px 24px; border-radius: 0 0 8px 8px; font-size: 0.95em; text-align: center;">
                &copy; ${new Date().getFullYear()} JNTU CGPA. All rights reserved.
            </div>
        </div>
    `;

    const response = await fetch("https://api.brevo.com/v3/smtp/email", {
        method: "POST",
        headers: {
            "api-key": BREVO_API_KEY,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            sender: { email: BREVO_SENDER, name: "JNTU CGPA" },
            to: [{ email: to }],
            subject,
            textContent: text,
            htmlContent: html,
        }),
    });

    if (!response.ok) {
        const details = await response.text();
        throw new Error(`Brevo API error (${response.status}): ${details}`);
    }

    return response.json();
}

module.exports = { sendOtpEmail };
