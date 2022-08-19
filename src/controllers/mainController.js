const path = require("path")
const fs = require("fs")
//const ProductosModel = require("../models/productosModel")
//const MainModel = require("../models/mainModel")
const funciones = require("../models/funciones")
const db = require('../database/models')
const sequelize = db.sequelize
const { Op } = require("sequelize");

let rutaBase = "main"

const controller = {
    index: async (req, res) => {
        const banner = await funciones.selectorFoto()

        //const catalogoOfertas = await ProductosModel.filterByField("estado","OFERTA",1)
        const catalogoOfertas = await db.Producto.findAll({
            include:['estados','imagenes'],
            where:{
                estado_id:2
            }
        })

        //const catalogoNovedades = await ProductosModel.filterByField("estado","NOVEDAD",1)
        const catalogoNovedades = await db.Producto.findAll({
            include:['estados','imagenes'],
            where:{
                estado_id:3
            }
        })
        
        const ofertas = funciones.randomReduce(catalogoOfertas)
        const novedades = funciones.randomReduce(catalogoNovedades)

        res.render(rutaBase + "/home", {banner:banner, ofertas:ofertas,novedades:novedades})
    }
}

module.exports = controller