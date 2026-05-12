// utils/otp.js
const crypto = require("crypto");

function generateOtp(length = 6) {
    return crypto.randomInt(10 ** (length - 1), 10 ** length).toString();
}

module.exports = { generateOtp };
