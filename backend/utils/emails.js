import dotenv from "dotenv";
dotenv.config({});

import { PASSWORD_RESET_REQUEST_TEMPLATE, PASSWORD_RESET_SUCCESS_TEMPLATE, VERIFICATION_EMAIL_TEMPLATE } from "../assets/emailTemplates.js";
import transporter from "../config/nodemailer.js";

const sendVerificationEmail = async (res, email, verificationToken) => {
    try {
        const mailOptions = {
            from: process.env.SMTP_SENDER_EMAIL,
            to: email,
            subject: 'Verify Your Email',
            html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationToken),
        }

        const response = await transporter.sendMail(mailOptions);
        // console.log("Verify email sent successfully", response);

    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}

const sendPasswordResetEmail = async (res, email, resetURL) => {
    try {
        const mailOptions = {
            from: process.env.SMTP_SENDER_EMAIL,
            to: email,
            subject: 'Reset your password',
            html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetURL),
        }

        const response = await transporter.sendMail(mailOptions);
        // console.log("Password reset email sent successfully", response);

    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}

const sendPasswordResetSuccessEmail = async (res, email) => {
    try {
        const mailOptions = {
            from: process.env.SMTP_SENDER_EMAIL,
            to: email,
            subject: 'Password Reset Successful',
            html: PASSWORD_RESET_SUCCESS_TEMPLATE,
        }

        const response = await transporter.sendMail(mailOptions);
        // console.log("Password reset success email sent successfully", response);

    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}


export { sendVerificationEmail, sendPasswordResetEmail, sendPasswordResetSuccessEmail };