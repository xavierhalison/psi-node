const express = require('express');
const router = require("./router")

const app = express();
const port = process.env.PORT || 3000;

router(app);

console.log("server started");

app.listen(port);
console.log(`listening at http://localhost:${port}`);