const path = require ("path")
const fs = require("fs")
const bcryptjs = require("bcryptjs")
const db = require('../database/models')
const sequelize = db.sequelize
const { Op } = require("sequelize");
const {validationResult}=require('express-validator')

let rutaBase = "user"

const controller = {
    login:(req,res) => {
        res.render(rutaBase + "/login")
    },
    loginProcess: async (req,res)=>{
        let emailUser = req.body.email
        let passUser = req.body.contrasena
        let usuarios = await db.Usuario.findAll()
        
        let check = false
        usuarios.forEach(user =>{
            if(user.email == emailUser && bcryptjs.compareSync(passUser, user.password)){
                check = true
            }
        })

        if (check){
            req.session.userLogged = req.body.email
            if (req.body.recordar == "on"){
                res.cookie("emailLogged", req.body.email,{maxAge: 50000 * 60})
            }
            res.redirect("/user/userProfile")
        }else{
            res.render(rutaBase + "/login",{error:"Los datos igresados son incorrectos", email:req.body.email})
        }
    },
    logoutProcess:(req,res)=>{
        res.clearCookie("emailLogged")
        req.session.destroy()

        res.redirect("/")
    },
    register:async (req,res) => {
        const intereses = await db.Interes.findAll()
        res.render(rutaBase + "/register",{intereses})
    },
    profile:async(req,res)=>{
        let emailLogged = req.session.userLogged
        let usuario = await db.Usuario.findAll({
            include:['categoriasUsuarios', 'intereses'],
            where:{
                email:emailLogged
            }
        })
        
        res.render(rutaBase + "/userProfile",{usuario:usuario[0]})
    },
    newUser:async (req,res) =>{
        const intereses = await db.Interes.findAll()
        let erroresRegistro=validationResult(req)

        if (erroresRegistro.isEmpty()){
            let imagenUser = req.file?.filename || "Anonimo.png"
            await db.Usuario.create({
                nombre:req.body.nombre,
                apellido:req.body.apellido,
                fechaDeNacimiento:req.body.fechaDeNacimiento,
                email:req.body.email,
                password:bcryptjs.hashSync(req.body.contrasena,10),
                imagen:imagenUser,
                rol_id:1,
                categoria_de_usuario_id:2
            }).then(resultado => {

                if (Array.isArray(req.body.intereses)){
                    req.body.intereses.forEach(elemento =>{
                        db.UsuarioInteres.create({
                            usuario_id:resultado.id,
                            interes_id:elemento
                        })
                    })}else{
                        db.UsuarioInteres.create({
                            usuario_id:resultado.id,
                            interes_id:req.body.intereses
                        })
                    }
            })
            
            //Redirigir al Maestro de Productos
            req.session.userLogged = req.body.email
            res.redirect("/user/userProfile")
        }else{
            return res.render(rutaBase + "/register",{intereses,mensajesError:erroresRegistro.mapped(), oldInfo:req.body})
            //res.send(erroresRegistro.mapped())
        }
    },
    cart: async (req,res) => {
        let emailLogged = req.session.userLogged
        
        let usuario = await db.Usuario.findAll({
            where:{
                email:emailLogged
            }
        })

        const idUser = usuario[0].id

        const carrito = await db.Carrito.findAll({
            include:['productos','colores','tamanos'],
            where:{
                usuario_id:idUser
            }
        })
        
        res.render(rutaBase + "/productCart",{carrito:carrito})
    },
    addToCart: async (req,res)=>{
        const idProd = req.params.idProd
        let emailLogged = req.session.userLogged

        let usuario = await db.Usuario.findAll({
            where:{
                email:emailLogged
            }
        })

        let infoProd = await db.Producto.findByPk(idProd,{
            include:['imagenes']
        })

        const idUser = usuario[0].id

        await db.Carrito.create({
            cantidad:req.body.cantidad,
            imagen:infoProd.imagenes[0].imagen,
            usuario_id:idUser,
            producto_id:idProd,
            tamano_id:req.body.tamano,
            color_id:req.body.color
        })
        
        res.redirect("/user/productCart")
        
        //Redirigir al Maestro de Productos
        
    },

    editCart: async (req,res)=>{
        idCart = req.params.idCart
        let emailLogged = req.session.userLogged

        let producto = await db.Carrito.findByPk(idCart,{
            include:['productos','colores','tamanos']
        })

        let infoProd = await db.Producto.findByPk(idCart,{
            include:['colores', 'tamanos']
        })

        const tamanos = await db.Tamano.findAll()
        const colores = await db.Color.findAll()

        res.render(rutaBase + "/productCartEdit",{idCart, infoProd, producto, tamanos, colores})
    }, 

    processEditCart:async(req,res)=>{
        idCart = req.params.idCart

        await db.Carrito.update({
            cantidad:req.body.cantidad,
            tamano_id:req.body.tamano,
            color_id:req.body.color
        },{where:{
            id:idCart
            }
        })

        //Redirigir al Maestro de Productos
        res.redirect("/user/productCart")
    },

    processDeleteCart: async (req,res)=>{
        idCart = req.params.idCart

        await db.Carrito.destroy({
            where:{
                id:idCart
            }
        })

        //Redirigir al Maestro de Productos
        res.redirect("/user/productCart")
    },

    userMaster: async (req,res) =>{
        const usuarios = await db.Usuario.findAll({
            include:['roles','categoriasUsuarios',]
        })
        res.render(rutaBase + "/usersMaster",{usuarios})
    },
    userData: async (req,res)=>{
        const idUser =req.params.idUser
        let usuario = await db.Usuario.findByPk(idUser,{
            include:['intereses','roles','categoriasUsuarios']
        })

        let intereses = await db.Interes.findAll()
        let roles = await db.Rol.findAll()
        let categoriasUsuario = await db.CategoriaDeUsuario.findAll()

        res.render(rutaBase + "/userData",{usuario, intereses, roles, categoriasUsuario})
    },
    userEdit: async (req,res)=>{ 
        const idUser =req.params.idUser

        let erroresUsuario = validationResult(req)
        if (erroresUsuario.isEmpty()){
            await db.Usuario.update({
                nombre:req.body.nombreUsuario,
                apellido:req.body.apellidoUsuario,
                fechaDeNacimiento:req.body.fechaNacimiento,
                email:req.body.mailUsuario,
                rol_id:req.body.rol,
                categoria_de_usuario_id:req.body.categoria
            },{where:{
                id:idUser
            }})

            await db.UsuarioInteres.destroy({
                where:{
                    usuario_id:idUser
                }
            })
            if (Array.isArray(req.body.intereses)){
                req.body.intereses.forEach(elemento =>{
                    db.UsuarioInteres.create({
                        usuario_id:idUser,
                        interes_id:elemento
                    })
                })}else{
                    db.UsuarioInteres.create({
                        usuario_id:idUser,
                        interes_id:req.body.intereses
                    })
                }

            res.redirect("/user/usersMaster/list")
        }else{
            let usuarioAEditar = await db.Usuario.findByPk(idUser)

            return res.render(rutaBase + "/userData",{mensajesError:erroresUsuario.mapped(), usuario:usuarioAEditar})
            //res.send(erroresRegistro.mapped())
        }
    },
    delete: async (req,res)=>{
        const idUser =req.params.idUser
        await db.UsuarioInteres.destroy({
            where:{
                usuario_id:idUser
            }
        })

        await db.Calificacion.destroy({
            where:{
                usuario_id:idUser
            }
        })

        await db.Carrito.destroy({
            where:{
                usuario_id:idUser
            }
        })

        await db.Favorito.destroy({
            where:{
                usuario_id:idUser
            }
        })

        await db.Usuario.destroy({
            where:{
                id:idUser
            }
        })

        //Redirigir al Maestro de Productos
        res.redirect("/user/usersMaster/list")
    }

}

module.exports = controller