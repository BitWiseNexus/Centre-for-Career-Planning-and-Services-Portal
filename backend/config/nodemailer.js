import dotenv from "dotenv";
dotenv.config({});

import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",//"smtp-relay.brevo.com"
    port: 587,
    secure: false, // true for port 465, false for other ports
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
    },
});

transporter.verify(function (error, success) {
    if (error) {
        console.error("SMTP connection failed:", error);
    } else {
        console.log("SMTP server is ready to take our messages");
    }
});


export default transporter;