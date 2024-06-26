const express = require('express')

const cors = require('cors');
const app = express()
const mongoDB = require("./db")
const port = 5000
mongoDB();

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
})
app.use(cors());
app.use(express.json())
app.use('/api', require("./routes/Createuser"))


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})