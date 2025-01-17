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
                detail: req.protocol + "://" + req.get("host") + "/api/users/" + usuario.id,
                picture: req.protocol + '://' + req.get("host") + '/images/usuarios/' + usuario.imagen
            }
           
        })

        let ultimoUsuario = usuariosApi[usuariosApi.length - 1]

        let usuariosGold = usuarios.filter(user =>{
            return user.categoria_de_usuario_id == 1 
        })

        let usuariosSilver = usuarios.filter(user =>{
            return user.categoria_de_usuario_id == 3 
        })

        let usuariosBronze = usuarios.filter(user =>{
            return user.categoria_de_usuario_id == 4 
        })

        let usuariosNew = usuarios.filter(user =>{
            return user.categoria_de_usuario_id == 2 
        })

        resultadoApi = {
            meta:{
                status:200,
                total:usuarios.length,
                goldUsers:usuariosGold.length,
                silverUsers:usuariosSilver.length,
                bronzeUsers:usuariosBronze.length,
                newUsers:usuariosNew.length,
            },
            ultimoUsuario:ultimoUsuario,
            data:usuariosApi
        } 

        res.json(resultadoApi)
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
            eliminar:req.protocol + '://' + req.get("host") + "/user/delete/" + usuario.id + "?_method=DELETE",
            imagen:req.protocol + '://' + req.get("host") + '/images/usuarios/' + usuario.imagen,
            edicionBicipal:req.protocol + '://' + req.get("host") + "/user/usersMaster/edit/" + usuario.id,
            categoria:usuario.categoriasUsuarios.categoria_de_usuario,
            created_at:usuario.created_at,
            intereses:intereses
        }

        res.json(userApi)
    },
    productsApi:async (req, res) =>{
        
        const catalogoCompleto = await db.Producto.findAll({
            include:['imagenes','categorias'],
        })

        let totalProd = catalogoCompleto.length - 1

        let ultimoProd = {
            id:catalogoCompleto[totalProd].id,
            name:catalogoCompleto[totalProd].nombre,
            description:catalogoCompleto[totalProd].caracteristicas,
            
            detail: req.protocol + '://' + req.get("host") + '/api/products/' + catalogoCompleto[totalProd].id,
            picture: req.protocol + '://' + req.get("host") + '/images/productos/' + catalogoCompleto[totalProd].imagenes[0].imagen

        }

        let prodNorm = catalogoCompleto.filter(prod =>{
            return prod.estado_id == 1
        })

        let prodOferta = catalogoCompleto.filter(prod =>{
            return prod.estado_id == 2
        })

        let prodNovedad = catalogoCompleto.filter(prod =>{
            return prod.estado_id == 3
        })

        const categorias = await db.Categoria.findAll()

        let categoriasApi =[]

        categorias.forEach(categoria => {
            let rango = catalogoCompleto.filter(prod => {
                return prod.categorias.id == categoria.id
            })
            categoriasApi.push({
                categoria:categoria.categoria,
                total:rango.length
            })    
        } )

        let pageNum = Number(req.query.pageNum)
        let totalPaginas = Math.ceil(catalogoCompleto.length/10)

        if (!pageNum){
            pageNum = 1
        }
        
        const productos = await db.Producto.findAll({
            include:['imagenes','estados','colores','categorias','subcategorias','marcas','tamanos'],
            limit:10,
            offset:(pageNum-1)*10
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

                detail: req.protocol + '://' + req.get("host") + '/api/products/' + producto.id,
                picture: req.protocol + '://' + req.get("host") + '/images/productos/' + producto.imagenes[0].imagen
            }
           
        })

        resultadoApi = {
            meta:{
                status:200,
                total:productosApi.length,
                prodNorm:prodNorm.length,
                prodOferta:prodOferta.length,
                prodNovedad:prodNovedad.length,
                paginas:totalPaginas
            },
            categorias:categoriasApi,
            ultimoProd:ultimoProd,
            data:productosApi,
        } 
        res.json(resultadoApi)
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
            detalleBicipal: req.protocol + '://' + req.get("host") + '/products/' + producto.id,
            edicionBicipal: req.protocol + '://' + req.get("host") + '/products/prodMaster/edit/' + producto.id,
            eliminar:req.protocol + '://' + req.get("host") + "/products/delete/" + producto.id + "?_method=DELETE",
            imagen:req.protocol + '://' + req.get("host") + '/images/productos/' + producto.imagenes[0].imagen
        }
           
        res.json(productoApi)       
    }
}

module.exports = controller