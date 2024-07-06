const nodemailer = require("nodemailer");
const Mailgen = require('mailgen')
const sendMail = (req, res) => {
    const { feedback } = req.body;
    let config = {
        service: 'gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASS
        }
    }
    let transporter = nodemailer.createTransport(config);
    let MailGenerator = new Mailgen({
        theme: 'default',
        product: {
            name: 'Mailgen',
            link: 'https://mailgen.js/'
        }
    })
    let response = {
        body: {
            intro: feedback
        }
    };
    let mail = MailGenerator.generate(response)
    let message = {
        from: process.env.EMAIL,
        to: "thelumoswebsite@gmail.com",
        subject: "Feedback from website",
        html: mail
    }

    transporter.sendMail(message).then(() => { return res.status(201).json({ msg: "Feedback received" }) }).catch(error => { res.status(500).json({ error }) })
};

module.exports = sendMail;