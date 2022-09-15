const path = require("path");
const express =require("express");
const cors = require("cors")
const app = express();

const PORT = process.env.PORT || 4000;
const methodOverride = require("method-override")
const cookieParser=require('cookie-parser')
const session=require('express-session')
const userLoggedMiddleware = require("./middlewares/userLoggedMiddleware")

const productsRoutes = require("./routes/productsRoutes")
const userRoutes = require("./routes/userRoutes")
const mainRoutes = require("./routes/mainRoutes")
const comuRoutes = require("./routes/comuRoutes")
const apiRoutes = require("./routes/apiRoutes")

app.set("view engine","ejs")
app.set("views", path.join(__dirname,"views"))

app.use(cors())
app.use(methodOverride("_method")) 
app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.use(cookieParser())
app.use(session({secret:'Esto Es Secreto',resave:false, saveUninitialized:false}))
app.use(userLoggedMiddleware)


app.use("/user", userRoutes)
app.use("/products", productsRoutes)
app.use("/comunidad", comuRoutes)
app.use("/api", apiRoutes)
app.use("/", mainRoutes)

app.listen(PORT, function(){console.log("Servidor corriendo 4000")});