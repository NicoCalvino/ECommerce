const path = require("path")
const fs = require("fs")
const ProductosModel = require("../models/productosModel")
const MainModel = require("../models/mainModel")

let rutaBase = "main"

const controller = {
    index:(req, res) => {
        const banner = MainModel.selectorFoto()

        const catalogoOfertas = ProductosModel.filterByField("estado","OFERTA",1)
        const catalogoNovedades = ProductosModel.filterByField("estado","NOVEDAD",1)

        const ofertas = ProductosModel.randomReduce(catalogoOfertas)
        const novedades = ProductosModel.randomReduce(catalogoNovedades)

        res.render(rutaBase + "/home", {banner:banner, ofertas:ofertas,novedades:novedades})
    }
}

module.exports = controller