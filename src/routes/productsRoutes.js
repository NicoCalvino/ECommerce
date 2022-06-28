const express = require ("express")
const app = express()
const multer = require("multer")
const path = require("path")
const {body} = require('express-validator')

const prodValidations=[
  body('nombreProducto').notEmpty().withMessage('Debe Indicar un nombre para el Producto'),
  body('categoria').notEmpty().withMessage('Debe Indicar la categoría'),
  body('subcategoria').notEmpty().withMessage('Debe Indicar la subcategoría'),
  body('precio').notEmpty().withMessage('Debe Indicar el precio del producto').isInt().withMessage('Debe ser un valor numérico'),
  body('precioAnt').isInt().withMessage('Debe ser un valor numérico'),
  body('colores').notEmpty().withMessage('Debe Indicar al menos un color'),
  body('tamanos').notEmpty().withMessage('Debe Indicar al menos un tamaño'),
  body('caracteristicas').notEmpty().withMessage('Debe Indicar una característica'),
  body('stock').notEmpty().withMessage('Debe Indicar el stock').isInt().withMessage('Debe ser un valor numérico'),
  body('estado').notEmpty().withMessage('Debe Indicar un estado para el producto')
]

const storage = multer.diskStorage({ 
    destination: function (req, file, cb) {
      let folder = path.join(__dirname, "../public/images/productos")
       cb(null, folder ); 
    }, 
    filename: function (req, file, cb) { 
      let nombreArchivo = Date.now() + "_img_" + path.extname(file.originalname)
       cb(null,nombreArchivo )
    } 
})

let fileUpload = multer({storage: storage })

const router = express.Router()

const productsController = require("../controllers/productsController")

/*** BUSCAR PRODUCTOS ***/ 
router.get("/search", productsController.index)

/*** MAESTRO DE PRODUCTOS ***/ 
router.get("/prodMaster/list", productsController.master)

/*** EDITAR PRODUCTO ***/ 
router.get("/prodMaster/edit/:idProd", productsController.editProduct)
router.put("/prodMaster/edit/:idProd", fileUpload.single("nuevaImagen"),prodValidations, productsController.update); 

/*** CREAR PRODUCTO ***/
router.get("/prodMaster/newProduct", productsController.newProduct)
router.post("/prodMaster/newProduct", fileUpload.single("nuevaImagen"), prodValidations, productsController.createProduct)

/*** INGRESAR A UN PRODUCTO ***/ 
router.get("/:idProd", productsController.detalle)

/*** ELIMINAR PRODUCTO ***/ 
router.delete('/delete/:idProd', productsController.delete); 


module.exports = router