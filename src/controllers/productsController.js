const path = require("path")
const fs = require("fs")
const funciones = require("../models/funciones")
const db = require('../database/models')
const sequelize = db.sequelize
const { Op } = require("sequelize");

const {validationResult} = require('express-validator')
const Producto = require("../database/models/Producto")

let rutaBase = "product"

const controller={
    index:async (req,res) => {
        let criterio = req.params.criterio
        let valor = req.query.valor
        let pagina = 1
        if (req.query.pag){
            pagina = req.query.pag
        }

        if(criterio == "todo"){
            let pagina = 1
            let cantPorPag = 12

            if (req.query.pag){
                pagina = req.query.pag
            }

            let resultado = await db.Producto.findAll({
                include:['categorias','subcategorias','estados','imagenes','marcas'],
                where:{[Op.or]:[
                    {nombre:{[Op.like]:'%' + valor + '%'}},
                    {caracteristicas:{[Op.like]:'%' + valor + '%'}},
                    {'$marcas.marca$':{[Op.like]:'%' + valor + '%'}},
                    {'$estados.estado$':{[Op.like]:'%' + valor + '%'}},
                    {'$categorias.categoria$':{[Op.like]:'%' + valor + '%'}},
                    {'$subcategorias.subcategoria$':{[Op.like]:'%' + valor + '%'}}
                    ],
                },
            })  

            let totalPaginas = resultado.length/cantPorPag

            let resultadosPagina = resultado.slice((pagina-1)*cantPorPag,(pagina*cantPorPag))

            res.render(rutaBase + "/productSearch", {
                resultado:resultadosPagina,
                tituloBusqueda:"BUSQUEDA " + valor, 
                valor, 
                criterio, 
                pagina,
                totalPaginas
            })
        }else if(criterio == "categoria"){
            let pagina = 1
            let cantPorPag = 12

            let totalPaginas = await db.Producto.count({where:{categoria_id:valor}})/cantPorPag

            if (req.query.pag){
                pagina = req.query.pag
            }

            let resultado = await db.Producto.findAll({
                include:['categorias','imagenes'],
                where:{
                    categoria_id:valor
                },
                limit:cantPorPag,
                offset:cantPorPag*(pagina-1)
            })

            let titulo = await db.Categoria.findByPk(valor)
            
            res.render(rutaBase + "/productSearch", {
                resultado, 
                tituloBusqueda:titulo.categoria, 
                valor, 
                criterio, 
                pagina,
                totalPaginas
            })
        } else if(criterio == "subcategoria"){
            let pagina = 1
            let cantPorPag = 12

            let totalPaginas = await db.Producto.count({where:{subcategoria_id:valor}})/cantPorPag

            if (req.query.pag){
                pagina = req.query.pag
            }

            let resultado = await db.Producto.findAll({
                include:['subcategorias','imagenes'],
                where:{
                    subcategoria_id:valor
                },
                limit:cantPorPag,
                offset:cantPorPag*(pagina-1)
            })

            let titulo = await db.Subcategoria.findByPk(valor)

            res.render(rutaBase + "/productSearch", {
                resultado, 
                tituloBusqueda:titulo.subcategoria, 
                valor, 
                criterio, 
                pagina,
                totalPaginas
            })
        }
    },
    detalle: async (req,res) => {
        const idProd = req.params.idProd;
        const producto = await db.Producto.findByPk(idProd,{
            include:['imagenes', 'colores', 'tamanos']
        })

        const catalogoCategoria = await db.Producto.findAll({
            include:['imagenes'],
            where:{
                categoria_id:producto.categoria_id
            }
        })
        
        const catalogoResto = await db.Producto.findAll({
            include:['imagenes'],
            where:{
                categoria_id:{[Op.ne]:producto.categoria_id}
            }
        })

        const resumenCalificacion = await db.Calificacion.findAll({
            where:{
                producto_id:idProd
            }
        })

        const categoria = funciones.randomReduce(catalogoCategoria)
        const otrosProd = funciones.randomReduce(catalogoResto)

        let total = 0
        let cantCalif = 0
        let califProm = 0

        resumenCalificacion.forEach(elemento =>{
            total +=Number(elemento.nota)
            cantCalif++
            califProm = total/cantCalif 
        })

        let caracteristicas = producto.caracteristicas.split("|")

        res.render(rutaBase + "/productDetail", {
            producto,
            caracteristicas,
            categoria,
            otrosProd,
            resumenCalificacion,
            califProm
        })
    },
    editProduct:async (req,res)=>{
        const idProd = req.params.idProd;
        const producto = await db.Producto.findByPk(idProd,{
            include:['imagenes','estados','colores','categorias','subcategorias','marcas','tamanos']
        });
        const categorias = await db.Categoria.findAll()
        const subcategorias = await db.Subcategoria.findAll()
        const marcas = await db.Marca.findAll()
        const estados = await db.Estado.findAll()
        const tamanos = await db.Tamano.findAll()
        const colores = await db.Color.findAll()
        res.render(rutaBase + "/productData",{producto,categorias,subcategorias,marcas,estados,tamanos,colores})
    },
    newProduct:async (req,res)=>{
        const categorias = await db.Categoria.findAll()
        const subcategorias = await db.Subcategoria.findAll()
        const marcas = await db.Marca.findAll()
        const estados = await db.Estado.findAll()
        const tamanos = await db.Tamano.findAll()
        const colores = await db.Color.findAll()

        res.render(rutaBase + "/productNew", {categorias,subcategorias,marcas,estados,tamanos,colores})
    },
    createProduct: async (req,res)=>{
        const categorias = await db.Categoria.findAll()
        const subcategorias = await db.Subcategoria.findAll()
        const marcas = await db.Marca.findAll()
        const estados = await db.Estado.findAll()
        const tamanos = await db.Tamano.findAll()
        const colores = await db.Color.findAll()

        let erroresProducto = validationResult(req)
        if (erroresProducto.isEmpty()){
            await db.Producto.create({
                nombre:req.body.nombreProducto,
                precio:req.body.precio,
                descuento:req.body.precioAnt,
                stock:req.body.stock,
                estado_id:req.body.estado,
                categoria_id:req.body.categoria,
                subcategoria_id:req.body.subcategoria,
                marca_id:req.body.marca,
                caracteristicas:req.body.caracteristicas                
            }).then(
                result => {
                    if (Array.isArray(req.body.tamanos)){
                        req.body.tamanos.forEach(elemento =>{
                            db.ProductoTamano.create({
                                producto_id:result.id,
                                tamano_id:elemento
                            })
                        })}else{
                            db.ProductoTamano.create({
                                producto_id:result.id,
                                tamano_id:req.body.tamanos
                            })
                        }

                    if (Array.isArray(req.body.colores)){
                        req.body.colores.forEach(elemento =>{
                            db.ProductoColor.create({
                                producto_id:result.id,
                                color_id:elemento
                            })
                        })}else{
                            db.ProductoColor.create({
                                producto_id:result.id,
                                color_id:req.body.colores
                            })
                    }
                    req.files.forEach(elemento =>{
                        db.Imagen.create({
                            imagen:elemento.filename,
                            producto_id:result.id
                        })
                    })
                }
                ).then(
                    //Redirigir al Maestro de Productos
                    res.redirect("/products/prodMaster/list")
                )
        }else{
            return res.render(rutaBase + '/productNew',{categorias,subcategorias,marcas,estados,tamanos,colores,mensajesError:erroresProducto.mapped(),producto:req.body})
        }
    },
    master:async (req,res)=>{
        const catalogo =  await db.Producto.findAll(
            {include:['imagenes','estados']}
        )
        res.render(rutaBase + "/prodMaster",{catalogo:catalogo})
    },
    update: async (req,res)=>{
        const idProd = Number(req.params.idProd);
        let erroresProducto = validationResult(req)
        if (erroresProducto.isEmpty()){

            await db.Producto.update({
                nombre:req.body.nombreProducto,
                precio:req.body.precio,
                descuento:req.body.precioAnt,
                stock:req.body.stock,
                estado_id:req.body.estado,
                categoria_id:req.body.categoria,
                subcategoria_id:req.body.subcategoria,
                marca_id:req.body.marca
            },{
                where:{
                    id:idProd
                }
            })

            await db.ProductoTamano.destroy({
                where:{
                    producto_id:idProd
                }
            }).then(()=>{
                if (Array.isArray(req.body.tamanos)){
                req.body.tamanos.forEach(elemento =>{
                    db.ProductoTamano.create({
                        producto_id:idProd,
                        tamano_id:elemento
                    })
                })}else{
                    db.ProductoTamano.create({
                        producto_id:idProd,
                        tamano_id:req.body.tamanos
                    })
                }})
                
            await db.ProductoColor.destroy({
                where:{
                    producto_id:idProd
                }
            }).then(() =>{
                if (Array.isArray(req.body.colores)){
                req.body.colores.forEach(elemento =>{
                    db.ProductoColor.create({
                        producto_id:idProd,
                        color_id:elemento
                    })
                })}else{
                    db.ProductoColor.create({
                        producto_id:idProd,
                        color_id:req.body.colores
                    })
                }})

            //Redirigir al Maestro de Productos
            res.redirect("/products/prodMaster/list")
        }else{
            const producto = await db.Producto.findByPk(idProd,{
                include:['imagenes','estados','colores','categorias','subcategorias','caracteristicas','marcas','tamanos']
            });
            const categorias = await db.Categoria.findAll()
            const subcategorias = await db.Subcategoria.findAll()
            const marcas = await db.Marca.findAll()
            const estados = await db.Estado.findAll()
            const tamanos = await db.Tamano.findAll()
            const colores = await db.Color.findAll()

            return res.render(rutaBase + '/productData',{mensajesError:erroresProducto.mapped(),producto,categorias,subcategorias,marcas,estados,tamanos,colores})
        }
    },
    deleteImg: async(req,res)=>{
        const idProd = req.params.idProd
        const idImg = req.params.idImg

        await db.Imagen.destroy({
            where:{
                id:idImg
            }
        })

        res.redirect("/products/prodMaster/edit/" + idProd)
    },
    addImg: async(req,res)=>{
        const idProd = req.params.idProd
        
        await req.files.forEach(elemento =>{
             db.Imagen.create({
                imagen:elemento.filename,
                producto_id:idProd
            })
        })

        res.redirect("/products/prodMaster/edit/" + idProd)
    },
    delete:async (req,res)=>{
        const idProd = req.params.idProd
        await db.ProductoColor.destroy({
            where:{
                producto_id:idProd
            }
        })
        await db.ProductoTamano.destroy({
            where:{
                producto_id:idProd
            }
        })
        await db.Calificacion.destroy({
            where:{
                producto_id:idProd
            }
        })
        await db.Carrito.destroy({
            where:{
                producto_id:idProd
            }
        })
        await db.Favorito.destroy({
            where:{
                producto_id:idProd
            }
        })
        await db.Imagen.destroy({
            where:{
                producto_id:idProd
            }
        })
        await db.Producto.destroy({
            where:{
                id:idProd
            }
        })
        
        //Redirigir al Maestro de Productos
        res.redirect("/products/prodMaster/list")
    }

}

module.exports=controller