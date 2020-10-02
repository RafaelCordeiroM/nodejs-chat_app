const {transporter,mailOptions} = require('../../config/nodemailer')
require('dotenv').config()
module.exports = {
    /**
     * SEND INVITATION
     */
    sendEmail: async(req,res) =>{
        try {
            //destruct request body
            const {to,text} = req.body
            
            //send email
            transporter.sendMail(mailOptions(to,text), (error, info) => {
                if(error) return res.redirect('/chat?error=An error occurred while sending the email')
                return res.redirect('/chat?message=Email Sent')
            })
        } catch (error) {
            return res.redirect('/chat?error=An error occurred while sending the email')
        }
    }
}