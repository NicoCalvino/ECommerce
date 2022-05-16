const path = require("path");
const express =require("express");
const app = express();
const PORT = process.env.PORT || 4000;
const archHome= path.join(__dirname,"/views/productCart.html")

app.use(express.static("public"));

app.get("/", function (req,res) {
    res.sendFile(path.join(archHome))
});

app.listen(PORT, function(){console.log(" Servidor corriendo 4000")});