const express = require ("express")
const app = express()
const path = require("path")
const fileUpload = require("../middlewares/multerProductsMiddleware")
const adminMiddleware= require("../middlewares/adminMiddleware")
const {body} = require('express-validator')

const newProdValidations=[
  body('nombreProducto').notEmpty().withMessage('Debe Indicar un nombre para el Producto'),
  body('categoria').notEmpty().withMessage('Debe Indicar la categoría'),
  body('subcategoria').notEmpty().withMessage('Debe Indicar la subcategoría'),
  body('precio').notEmpty().withMessage('Debe Indicar el precio del producto').isInt().withMessage('Debe ser un valor numérico'),
  body('precioAnt').isInt().withMessage('Debe ser un valor numérico'),
  body('marca').notEmpty().withMessage('Debe indicar la Marca'),
  body('stock').notEmpty().withMessage('Debe Indicar el stock').isInt().withMessage('Debe ser un valor numérico'),
  body('estado').notEmpty().withMessage('Debe Indicar un estado para el producto'),
  body('colores').notEmpty().withMessage('Debe Indicar al menos un color'),
  body('tamanos').notEmpty().withMessage('Debe Indicar al menos un tamaño'),
  body('caracteristicas').notEmpty().withMessage('Debe Indicar una característica'),
  body('nuevasImagenes').custom((value,{req})=>{
    if(!req.files || req.files.length <2){
      throw new Error('Debe cargar al menos dos imagenes')
    }

    let formatos = ['.JPG','.jpg','.JPEG','.jpeg','.PNG','.png','.GIF','.gif']

    req.files.forEach(imagen =>{
      if(!formatos.includes(path.extname(imagen.originalname))){
        throw new Error('Las imagenes deben ser jpg, jpeg, png, o gif')
      }
    })

    return true
  })
]

const editProdValidations=[
  body('nombreProducto').notEmpty().withMessage('Debe Indicar un nombre para el Producto'),
  body('categoria').notEmpty().withMessage('Debe Indicar la categoría'),
  body('subcategoria').notEmpty().withMessage('Debe Indicar la subcategoría'),
  body('precio').notEmpty().withMessage('Debe Indicar el precio del producto'),
  body('precioAnt').isInt().withMessage('Debe ser un valor numérico'),
  body('marca').notEmpty().withMessage('Debe indicar la Marca'),
  body('stock').notEmpty().withMessage('Debe Indicar el stock').isInt().withMessage('Debe ser un valor numérico'),
  body('estado').notEmpty().withMessage('Debe Indicar un estado para el producto'),
  body('colores').notEmpty().withMessage('Debe Indicar al menos un color'),
  body('tamanos').notEmpty().withMessage('Debe Indicar al menos un tamaño'),
]

const nuevasImagenes=[
  body('nuevasImagenes').custom((value,{req})=>{
    if(!req.files || req.files.length <2){
      throw new Error('Debe cargar al menos dos imagenes')
    }

    let formatos = ['.JPG','.jpg','.JPEG','.jpeg','.PNG','.png','.GIF','.gif']

    req.files.forEach(imagen =>{
      if(!formatos.includes(path.extname(imagen.originalname))){
        throw new Error('Las imagenes deben ser jpg, jpeg, png, o gif')
      }
    })

    return true
  })
]

const router = express.Router()

const productsController = require("../controllers/productsController")

/*** BUSCAR PRODUCTOS ***/ 
router.get("/search/:criterio", productsController.index)

/*** MAESTRO DE PRODUCTOS ***/ 
router.get("/prodMaster/list", adminMiddleware, productsController.master)

/*** EDITAR PRODUCTO ***/ 
router.get("/prodMaster/edit/:idProd", adminMiddleware,productsController.editProduct)
router.put("/prodMaster/edit/:idProd", fileUpload.array("nuevasImagenes"),editProdValidations, adminMiddleware, productsController.update); 
router.post("/prodMaster/edit/:idProd/img", fileUpload.array("nuevasImagenes"), nuevasImagenes, adminMiddleware, productsController.addImg); 
router.delete("/prodMaster/edit/:idProd/img/:idImg", adminMiddleware, productsController.deleteImg); 

/*** CREAR PRODUCTO ***/
//router.get("/prodMaster/newProduct", adminMiddleware, productsController.newProduct)
router.get("/prodMaster/newProduct", productsController.newProduct)
router.post("/prodMaster/newProduct", fileUpload.array("nuevasImagenes"), newProdValidations, adminMiddleware, productsController.createProduct)

/*** INGRESAR A UN PRODUCTO ***/ 
router.get("/:idProd", productsController.detalle)

/*** ELIMINAR PRODUCTO ***/ 
router.delete('/delete/:idProd', adminMiddleware, productsController.delete); 


module.exports = router