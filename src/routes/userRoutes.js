const express = require("express")
const app = express()
const multer = require("multer")
const path = require("path")

const storage = multer.diskStorage({ 
    destination: function (req, file, cb) {
      let folder = path.join(__dirname, "../public/images/usuarios")
       cb(null, folder ); 
    }, 
    filename: function (req, file, cb) { 
      let nombreArchivo = Date.now() + "_img_" + path.extname(file.originalname)
       cb(null,nombreArchivo )
    } 
})

let fileUpload = multer({storage: storage })

const router = express.Router()

const userController = require("../controllers/userController")

/** LOGEO DE USUARIO **/
router.get("/login", userController.login)
router.post("/login", userController.login)

/** REGISTRO DE USUARIO **/
router.get("/register", userController.register)
router.post("/register", fileUpload.single("avatar"),userController.newUser)

/** CARRITO DEL USUARIO **/
router.get("/productCart", userController.cart)


module.exports = router