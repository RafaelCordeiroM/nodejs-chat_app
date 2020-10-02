var nodemailer = require('nodemailer')
require('dotenv').config()

module.exports = {
    transporter: nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.NODEMAILER_EMAIL,
            pass: process.env.NODEMAILER_PASSWORD
        }
    }),

    mailOptions: (to,text ) => {
        return {
            from: process.env.NODEMAILER_EMAIL,
            to,
            text,
            subject: 'INVITATION!!'
        }
    }
} 