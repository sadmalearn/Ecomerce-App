// const express = require('express');
const nodemailer = require('nodemailer');
// const app = express();
const port = 3000;

// app.use(express.json());

const sendEmail = async (req, res) => {
    let config = {
        service: 'gmail',
        auth: {
            user: 'datalearn188@gmail.com',
            pass: 'Learn@1234'
        }
    };

    let transporter = nodemailer.createTransport(config);

    let message = {
        from: 'datalearn188@gmail.com',
        to: 'sadmalearn2310@gmail.com',
        subject: 'Welcome to ABC Website!',
        html: "<b>Hello world?</b>",
        attachments: [
            {
                filename: 'receipt_test.pdf',
                path: 'receipt_test.pdf',
                cid: 'uniqreceipt_test.pdf'
            }
        ]
    };

    try {
        const info = await transporter.sendMail(message);
        res.status(201).json({
            msg: "Email sent",
            info: info.messageId,
            preview: nodemailer.getTestMessageUrl(info)
        });
    } catch (err) {
        res.status(500).json({ msg: err });
    }
};

module.exports = ({sendEmail})
// app.post('/send-email', sendEmail);

