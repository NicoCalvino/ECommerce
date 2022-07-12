const path = require("path")
const fs = require("fs")
const ProductosModel = require("../models/productosModel")

let rutaBase = "main"

const controller = {
    index:(req, res) => {
        const catalogoOfertas = ProductosModel.filterByField("estado","OFERTA",1)
        const catalogoNovedades = ProductosModel.filterByField("estado","NOVEDAD",1)

        const ofertas = ProductosModel.randomReduce(catalogoOfertas)
        const novedades = ProductosModel.randomReduce(catalogoNovedades)
        
        res.render(rutaBase + "/home", {ofertas:ofertas,novedades:novedades})
    }
}

module.exports = controller