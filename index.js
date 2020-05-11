const express = require('express');
const router = require("./router")
const cors = require("cors");

const app = express();
const port = process.env.PORT || 8000;

app.use(cors())

router(app);

console.log("server started");

app.listen(port);
console.log(`listening at http://localhost:${port}`);