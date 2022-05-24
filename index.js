const path = require("path");
const express =require("express");
const app = express();
const PORT = process.env.PORT || 4000;
const archHome= path.join(__dirname,"/views/home.html")
const archProd= path.join(__dirname,"/views/productDetail.html")
const archReg= path.join(__dirname,"/views/register.html")
const archLogin= path.join(__dirname,"/views/login.html")
const archCart= path.join(__dirname,"/views/productCart.html")


app.use(express.static("public"));

app.get("/", function (req,res) {
    res.sendFile(path.join(archHome))
});

app.get("/register", function (req,res) {
    res.sendFile(path.join(archReg))
});

app.get("/login", function (req,res) {
    res.sendFile(path.join(archLogin))
});

app.get("/productDetail", function (req,res) {
    res.sendFile(path.join(archProd))
});

app.get("/productCart", function (req,res) {
    res.sendFile(path.join(archCart))
});

app.listen(PORT, function(){console.log("Servidor corriendo 4000")});