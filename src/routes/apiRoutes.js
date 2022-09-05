const express = require("express")
const app = express()
const path = require("path")
const authMiddleware= require("../middlewares/authMiddleware")
const adminMiddleware= require("../middlewares/adminMiddleware")
const db = require('../database/models')
const sequelize = db.sequelize

const router = express.Router()

const apiController = require("../controllers/apiController")


router.get("/users", authMiddleware, adminMiddleware, apiController.userApi)
router.get("/users/:idUser", authMiddleware, adminMiddleware, apiController.userDataApi)
router.get("/products", authMiddleware, adminMiddleware, apiController.productsApi)
router.get("/products/:idProd", authMiddleware, adminMiddleware, apiController.prodApi)

module.exports = router