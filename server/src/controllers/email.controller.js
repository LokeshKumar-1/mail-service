const {sendMailService} = require("../services/mail.service");



exports.sendMail = async(req, res) => {
    try {
        const { from, to, subject, message } = req.body;
        const mailResult = await sendMailService({from, to, subject, text: message});
        res.status(200).json({message: "Reached api", ...mailResult})
    } catch (e) {
        res.status(500).json({message: 'Something went wrong', error: e})
    }
}