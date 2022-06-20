const express = require ("express")
const app = express()
const multer = require("multer")
const path = require("path")

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
router.put("/prodMaster/edit/:idProd", fileUpload.single("nuevaImagen"),productsController.update); 

/*** CREAR PRODUCTO ***/
router.get("/prodMaster/newProduct", productsController.newProduct)
router.post("/prodMaster/newProduct", fileUpload.single("nuevaImagen"),productsController.createProduct)

/*** INGRESAR A UN PRODUCTO ***/ 
router.get("/:idProd", productsController.detalle)

/*** ELIMINAR PRODUCTO ***/ 
router.delete('/delete/:idProd', productsController.delete); 


module.exports = router