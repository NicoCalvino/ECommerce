const express = require("express")
const app = express()
const fileUpload = require("../middlewares/multerUsersMiddleware")
const path = require("path")
const guestMiddleware= require("../middlewares/guestMiddleware")
const authMiddleware= require("../middlewares/authMiddleware")
const adminMiddleware= require("../middlewares/adminMiddleware")
const db = require('../database/models')
const sequelize = db.sequelize

const {body} = require('express-validator')
const formValidations = [
  body('nombre').notEmpty().withMessage('Debe Indicar su nombre'),
  body('apellido').notEmpty().withMessage('Debe Indicar su apellido'),
  body('fechaDeNacimiento').notEmpty().withMessage('Debe Indicar su fecha De Nacimiento'),
  body('email').isEmail().withMessage('El correo Ingresado no es válido').custom( async (value, {req}) => {
      let resultado = await db.Usuario.findAll({
        where:{
          email:req.body.email
      }})
      
      if (resultado.length > 0){
        throw new Error('El mail ingresado ya existe')
      }
      return true
  }),
  body('intereses').notEmpty().withMessage('Debe Indicar al menos un interes'),
  body('imagen').custom((value,{req})=>{
    let formatos = ['.JPG','.jpg','.JPEG','.jpeg','.PNG','.png','.GIF','.gif']
    if(req.file){
      if(!formatos.includes(path.extname(req.file.originalname))){
        throw new Error('Las imagenes deben ser jpg, jpeg, png, o gif')
      }
    }
    return true
  }),
  body('contrasena').notEmpty().withMessage('La contraseña no es válida'),
  body('termCond').notEmpty().withMessage('Debe aceptar los términos y condiciones'),
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
      throw new Error('Las Contraseñas no coinciden')
    }
    return true
  })
]

const userDataValidations = [
  body('nombreUsuario').notEmpty().withMessage('Este campo no puede estar en Blanco'),
  body('apellidoUsuario').notEmpty().withMessage('Este campo no puede estar en Blanco'),
  body('mailUsuario').notEmpty().withMessage('Este campo no puede estar en Blanco'),
  body('fechaNacimiento').notEmpty().withMessage('Este campo no puede estar en Blanco'),
  body('rol').notEmpty().withMessage('Este campo no puede estar en Blanco'),
  body('categoria').notEmpty().withMessage('Este campo no puede estar en Blanco'),
  body('intereses').notEmpty().withMessage('Este campo no puede estar en Blanco')
]

const router = express.Router()

const userController = require("../controllers/userController")

/** LOGEO DE USUARIO **/
router.get("/login", guestMiddleware, userController.login)
router.post("/login", userController.loginProcess)
router.get("/logout", userController.logoutProcess)

/** REGISTRO DE USUARIO **/
router.get("/register", guestMiddleware, userController.register)
router.post("/register", fileUpload.single("avatar"),formValidations, userController.newUser)

/** PERFIL DEL USUARIO **/
router.get("/userProfile", authMiddleware, userController.profile)

/** CARRITO DEL USUARIO **/
router.get("/productCart", authMiddleware, userController.cart)
router.post("/productCart/:idProd", authMiddleware, userController.addToCart)
router.put("/productCart/:idCart", authMiddleware, userController.processEditCart)
router.delete("/productCart/:idCart", authMiddleware, userController.processDeleteCart)
router.get("/productCart/:idCart", userController.editCart)

/** MAESTRO DE USUARIOS **/
router.get("/usersMaster/list", authMiddleware, adminMiddleware,userController.userMaster)
router.get("/usersMaster/edit/:idUser", authMiddleware, adminMiddleware,userController.userData)
router.put("/usersMaster/edit/:idUser", userDataValidations, authMiddleware, adminMiddleware,userController.userEdit)
router.delete("/delete/:idUser", authMiddleware, adminMiddleware, userController.delete)


module.exports = router