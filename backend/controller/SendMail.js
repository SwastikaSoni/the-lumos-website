const nodemailer = require("nodemailer");
const Mailgen = require('mailgen')
const sendMail = (req, res) => {
    const { userEmail, orderData } = req.body;
    if (!Array.isArray(orderData)) {
        return res.status(400).json({ error: "Invalid order data format" });
    }
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
    let items = orderData.map(order => ({
        item: order.name,
        quantity: order.qty,
        price: `₹${order.price.toFixed(2)}`,
        fragrance: order.fragrance ? order.fragrance : "None"
    }));
    let response = {
        body: {
            intro: 'Your order has been placed successfully!',
            table: {
                data: items.map(item => ({
                    item: item.item,
                    quantity: item.quantity,
                    price: item.price,
                    fragrance: item.fragrance
                }))
            },
            outro: 'Looking forward to serving you again!'
        }
    };
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