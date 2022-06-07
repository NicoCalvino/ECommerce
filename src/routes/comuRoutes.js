const express = require ("express")
const app = express()

const router = express.Router()

const comuController = require("../controllers/comuController")

router.get("/", comuController.index)
router.get("/aventuraMontana", comuController.avntMont)
router.get("/paseosNocturnos", comuController.paseoNoct)
router.get("/bicikids", comuController.biciKids)

module.exports = router