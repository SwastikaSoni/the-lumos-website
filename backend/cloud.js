const express = require('express');
require('dotenv').config();
const uploadRoute = require('./controller/routeUpload');
const app = express();
const PORT = 5000;

app.use(express.json());

// The route 
app.use("/api/users", uploadRoute);

// Port connection 
app.listen(PORT, () => {
    console.log(`listening at http://localhost:${PORT}`);
});
