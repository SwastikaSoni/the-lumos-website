const express = require('express')
const cors = require('cors');
const app = express()
const mongoDB = require("./db")

const bodyParser = require('body-parser');
const port = 5000
mongoDB();
app.use(cors());
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set('view engine', 'ejs');
app.use('/api', require("./routes/Createuser"))
app.use('/api', require("./routes/DisplayData"))
app.use('/api', require("./routes/OrderData"))
app.use('/api', require("./routes/SendMail"))

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})