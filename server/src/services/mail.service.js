const nodemailer = require('nodemailer')
const {htmlToText} = require("html-to-text");

const {USER_EMAIL, USER_EMAIL_PASS} = require("../../config/env");

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: USER_EMAIL,
        pass: USER_EMAIL_PASS
    }
})

async function sendMailService({to, from=USER_EMAIL, text, subject, html}) {
    try {

        // const htmlText = htmlToText(html)

        const mailOptions = {
            from: from,
            to: to,
            subject: subject,
            text: text,
            html: html
        }
        const info = await transporter.sendMail(mailOptions);
        console.log(info, "mailinfo")
        return {success: true, info}
    } catch (e) {
        console.error(e)
        return {success: false, error: e}
    }
}

module.exports = {sendMailService}