const path = require("path")
const fs = require("fs")
const ProductosModel = require("../models/productosModel")

const {validationResult} = require('express-validator')

let rutaBase = "product"

const controller={
    index:(req,res) => {
        let criterio = req.params.criterio
        let valor = req.query.valor
        let resultado = []
        if(criterio == "todo"){
            resultado = ProductosModel.filterMultiple(valor)
        }else{
            resultado = ProductosModel.filterByField(criterio,valor,1)
        }

        res.render(rutaBase + "/productSearch", {resultado:resultado, tituloBusqueda:valor})
    },
    detalle:(req,res) => {
        const idProd = req.params.idProd;
        const producto = ProductosModel.findbyPK(idProd)

        const catalogoCategoria = ProductosModel.filterPKFromArray(idProd, "categoria", producto.categoria)
        const categoria = ProductosModel.randomReduce(catalogoCategoria)

        const catalogoResto = ProductosModel.filterByField("categoria", producto.categoria, 2)
        const otrosProd = ProductosModel.randomReduce(catalogoResto)

        const resumenCalificacion = ProductosModel.reviewDetail(idProd)
        const opinionesProd = resumenCalificacion[0]
        const califProm = resumenCalificacion[1]
        
        res.render(rutaBase + "/productDetail", {
            producto,
            categoria,
            otrosProd,
            opinionesProd,
            califProm
        })
    },
    editProduct:(req,res)=>{
        const idProd = req.params.idProd;
        const producto = ProductosModel.findbyPK(idProd);
        res.render(rutaBase + "/productData",{producto:producto})
    },
    newProduct:(req,res)=>{
        res.render(rutaBase + "/productNew")
    },
    createProduct:(req,res)=>{
        let erroresProducto = validationResult(req)
        if (erroresProducto.isEmpty()){
            ProductosModel.newProduct(req.body, req.file?.filename || "SinImagen.png")
            
            //Redirigir al Maestro de Productos
            res.redirect("/products/prodMaster/list")
        }else{
            return res.render(rutaBase + '/productNew',{mensajesError:erroresProducto.mapped(),oldInfo:req.body})
        }
    },
    master:(req,res)=>{
        const catalogo = ProductosModel.getAll()
        res.render(rutaBase + "/prodMaster",{catalogo:catalogo})
    },
    update:(req,res)=>{
        let erroresProducto = validationResult(req)
        if (erroresProducto.isEmpty()){
            const idProd = req.params.idProd
            ProductosModel.editProd(idProd, req.body)
            
            //Redirigir al Maestro de Productos
            res.redirect("/products/prodMaster/list")
        }else{
            return res.render(rutaBase + '/productData',{mensajesError:erroresProducto.mapped(),oldInfo:req.body})
        }

        //Redirigir al Maestro de Productos
        res.redirect("/products/prodMaster/list")
    },
    delete:(req,res)=>{
        const idProd = req.params.idProd
        ProductosModel.delete(idProd)

        //Redirigir al Maestro de Productos
        res.redirect("/products/prodMaster/list")
    }

}

module.exports=controller