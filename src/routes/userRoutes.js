const express = require("express")
const app = express()
const multer = require("multer")
const path = require("path")

const {body} = require('express-validator')
const formValidations = [
  body('nombre').notEmpty().withMessage('Debe Indicar su nombre'),
  body('apellido').notEmpty().withMessage('Debe Indicar su apellido'),
  body('fechaDeNacimiento').notEmpty().withMessage('Debe Indicar su fecha De Nacimiento'),
  body('email').isEmail().withMessage('El correo Ingresado no es válido'),
  body('intereses').notEmpty().withMessage('Debe Indicar al menos un interes'),
  body('contrasena').notEmpty().withMessage('La contraseña no es válida'),
  body('termCond').notEmpty().withMessage('Debe aceptar os términos y condiciones'),
  body('captcha').custom((value, {req}) => {
    let respuesta = req.body.captcha
    if (respuesta != 'mwxe2'){
      throw new Error('El codigo ingresado es incorrecto')
    }
    return true
  }),
  body('confContrasena').custom((value, {req}) =>{
    let password = req.body.contrasena
    let confPassword = req.body.confContrasena
    if (password != confPassword){
      throw new Error('Las Contraseñas no cohinciden')
    }
    return true
  }),
  body('avatar').custom((value, { req }) => {
    let file = req.file;
    let acceptedExtensions = ['.jpg','.png','.jpeg']
    if (!file){
      throw new Error('Tenes que agregar tu avatar')
    }
    if (!acceptedExtensions.includes(path.extname(file.originalname))){
      throw new Error('Las imagenes tienen que ser ' + acceptedExtensions)
    }
    return true
  })
]

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
router.post("/register", fileUpload.single("avatar"),formValidations, userController.newUser)

/** CARRITO DEL USUARIO **/
router.get("/productCart", userController.cart)

/*** AGREGAR AL CARRITO ***/
router.post("/productCart/:idProd", userController.addToCart)


module.exports = router