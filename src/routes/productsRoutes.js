const express = require ("express")
const app = express()

const router = express.Router()

const productsController = require("../controllers/productsController")

router.get("/", productsController.index)
router.get("/productCart", productsController.cart)
router.get("/prodMaster/list", productsController.master)
router.get("/prodMaster/newProduct", productsController.newProduct)
router.get("/prodMaster/:idProd", productsController.editProduct)
router.get("/:idProd", productsController.detalle)

module.exports = router