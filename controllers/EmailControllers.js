import nodemailer from 'nodemailer';
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const smtpTransport = require('nodemailer-smtp-transport');
import dotenv from 'dotenv';
import HTML_TEMPLATE from './template.js';
console.log('🚀--** ~ file: EmailControllers.js:7 ~ HTML_TEMPLATE:', HTML_TEMPLATE)

dotenv.config();
let transporter = nodemailer.createTransport(smtpTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    auth: {
        user: 'gaetanbassetgaetan@gmail.com',
        pass: process.env.MAIL
    }
}));

export const postEmail = async (req, res) => {
    const to = req.body.to;
    const subject = req.body.subject;
    const message = req.body.message;
    const from = req.body.from;

    const mailOptions = {
        from: from,
        to: 'gaetanbassetgaetan@gmail.com',
        subject: subject,
        html: HTML_TEMPLATE(message, from, subject)
    };
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log('🚀--** ~ file: EmailControllers.js:36 ~ error:', error)
            res.status(500).send(error);
        } else {
            res.status(200).send('Le message a été envoyé avec succès !');
        }
    });
}