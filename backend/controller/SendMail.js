const nodemailer = require("nodemailer");
const Mailgen = require('mailgen')
const sendMail = (req, res) => {
    const { userEmail } = req.body;
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
            intro: 'Your mail has arrived',
            table: {
                data: [{
                    item: "Nodemailer Stack Book",
                    frgrance: "A backend application",
                    price: "Rs 10"
                }
                ]
            },
            outro: "Looking forward to meet"
        }
    }
    let mail = MailGenerator.generate(response)
    let message = {
        from: process.env.EMAIL,
        to: userEmail,
        subject: "Order Placed",
        html: mail
    }

    transporter.sendMail(message).then(() => { return res.status(201).json({ msg: "You recieved an email" }) }).catch(error => { res.status(500).json({ error }) })
};

module.exports = sendMail;