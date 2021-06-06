import nodemailer from 'nodemailer';
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const smtpTransport = require('nodemailer-smtp-transport');
import dotenv from 'dotenv';


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
        to: to,
        subject: subject,
        html: `
        <h1> Vous avez reçu un mail de ${from} </h1>
        <h3> Sujet : ${subject}</h3>
        <div> " ${message} " <div> 
        `
    };
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            res.status(500).send(error);
        } else {
            res.status(200).send('Le message a été envoyé avec succès !');
        }
    });
}