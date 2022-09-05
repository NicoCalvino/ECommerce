const path = require ("path")
const fs = require("fs")
const db = require('../database/models')
const sequelize = db.sequelize
const { Op } = require("sequelize");

const controller = {
    userApi: async (req,res) =>{
        const usuarios = await db.Usuario.findAll()

        let usuariosApi = usuarios.map(usuario => {
            return {
                id:usuario.id,
                name:usuario.nombre,
                lastName:usuario.apellido,
                email:usuario.email,
                detail: req.protocol + "://" + req.get("host") + "/usersMaster/edit/" + usuario.id
            }
           
        })

        res.json(usuariosApi)
    },
    userDataApi: async (req,res)=>{
        const idUser = req.params.idUser
        let usuario = await db.Usuario.findByPk(idUser,{
            include:['intereses','roles','categoriasUsuarios']
        })

        let intereses = []

        usuario.intereses.forEach(int =>{
            intereses.push(int.interes)
        })

        let userApi = {
            id:usuario.id,
            nombre:usuario.nombre,
            apellido:usuario.apellido,
            fechaDeNacimientp:usuario.fechaDeNacimientp,
            email:usuario.email,
            imagen:usuario.imagen,
            categoria:usuario.categoriasUsuarios.categoria_de_usuario,
            created_at:usuario.created_at,
            intereses:intereses

        }

        res.json(userApi)
    },
    productsApi:async (req, res) =>{
        const productos = await db.Producto.findAll({
            include:['imagenes','estados','colores','categorias','subcategorias','marcas','tamanos']
        })

        let productosApi = productos.map(producto => {
            let colores = []
            producto.colores.forEach(color =>{
                colores.push(color.color)
            })

            let tamanos = []
            producto.tamanos.forEach(tamano =>{
                tamanos.push(tamano.tamano)
            })
            return {
                id:producto.id,
                name:producto.nombre,
                categoria:producto.categoria,
                subcategoria:producto.subcategoria,
                marca:producto.marcas.marca,
                description:producto.caracteristicas,
                colores:colores,
                tamanos:tamanos,
                estado:producto.estados.estado,
                
                detail: req.protocol + "://" + req.get("host") + "/prodMaster/edit/" + producto.id
            }
           
        })

        res.json(productosApi)
    },
    prodApi:async(req, res) =>{
        const idProd = req.params.idProd
        let producto = await db.Producto.findByPk(idProd,{
            include:['imagenes','estados','colores','categorias','subcategorias','marcas','tamanos']
        })

        let colores = []
        producto.colores.forEach(color =>{
            colores.push(color.color)
        })

        let tamanos = []
        producto.tamanos.forEach(tamano =>{
            tamanos.push(tamano.tamano)
        })
        let productoApi = {
            id:producto.id,
            name:producto.nombre,
            categoria:producto.categoria,
            subcategoria:producto.subcategoria,
            marca:producto.marcas.marca,
            description:producto.caracteristicas,
            colores:colores,
            tamanos:tamanos,
            estado:producto.estados.estado,
            imagen:producto.imagenes[0]
        }
           
        res.json(productoApi)       
    }
}

module.exports = controller