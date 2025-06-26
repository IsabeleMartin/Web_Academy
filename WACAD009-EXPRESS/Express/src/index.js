const express = require("express");
const dotenv = require("dotenv");

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3333;

app.get("/", (req, res) => {
    res.send("Hello World atual!");
});

app.listen(PORT, () =>{
    console.log(`Express app rodando na porta ${PORT}`);
});