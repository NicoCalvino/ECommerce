const path = require ("path")
const fs = require("fs")
const UserModel = require("../models/userModel")
const ProductosModel = require("../models/productosModel")

const {validationResult}=require('express-validator')

let rutaBase = "user"

const controller = {
    login:(req,res) => {
        res.render(rutaBase + "/login")
    },
    loginProcess:(req,res)=>{
        let check = UserModel.processLogin(req.body)
        if (check){
            req.session.userLogged = req.body.email
            if (req.body.recordar == "on"){
                res.cookie("emailLogged", req.body.email,{maxAge: 50000 * 60})
            }
            res.redirect("/user/userProfile")
        }
        res.render(rutaBase + "/login",{error:"Los datos igresados son incorrectos", email:req.body.email})
    },
    logoutProcess:(req,res)=>{
        req.session.destroy()
        res.clearCookie("emailLoged")
        res.redirect("/")
    },
    register:(req,res) => {
        res.render(rutaBase + "/register")
    },
    profile:(req,res)=>{
        let emailLogged = req.session.userLogged
        let usuario = UserModel.findByField("email",emailLogged)
        res.render(rutaBase + "/userProfile",{usuario:usuario})

    },
    newUser:(req,res) =>{
        let erroresRegistro=validationResult(req)

        if (erroresRegistro.isEmpty()){

            UserModel.newUser(req.body,req.file?.filename || "Anonimo.png")

            //Redirigir al Maestro de Productos
            req.session.userLogged=req.body.email
            res.redirect("/user/userProfile")
        }else{
            return res.render(rutaBase + "/register",{mensajesError:erroresRegistro.mapped(), oldInfo:req.body})
            //res.send(erroresRegistro.mapped())
        }
    },
    cart:(req,res) => {
        const idUser = UserModel.getOneField(req.session.userLogged, "id")
        const carrito = UserModel.getUserCart(idUser)
        res.render(rutaBase + "/productCart",{carrito:carrito})
    },
    addToCart:(req,res)=>{
        idProd = req.params.idProd

        idUser = UserModel.getOneField(req.session.userLogged, "id")
        UserModel.addToCart(idUser, idProd, req.body)
        
        //Redirigir al Maestro de Productos
        res.redirect("/user/productCart")
    },

    editCart:(req,res)=>{
        idProd = req.params.idProd
        idUser = UserModel.getOneField(req.session.userLogged, "id")

        let producto = UserModel.getOneCartProd(idUser,idProd)
        let infoProd = ProductosModel.findbyPK(idProd)

        res.render(rutaBase + "/productCartEdit",{producto:producto,infoProd:infoProd})
    }, 

    processEditCart:(req,res)=>{
        idProd = req.params.idProd
        idUser = UserModel.getOneField(req.session.userLogged, "id")
        UserModel.editCart(idUser,idProd,req.body)

        //Redirigir al Maestro de Productos
        res.redirect("/user/productCart")
    },

    processDeleteCart:(req,res)=>{
        idProd = req.params.idProd
        idUser = UserModel.getOneField(req.session.userLogged, "id")
        UserModel.deleteFromCart(idUser,idProd,req.body)

        //Redirigir al Maestro de Productos
        res.redirect("/user/productCart")
    },

    userMaster:(req,res) =>{
        const baseUsuarios = UserModel.getAll()
        res.render(rutaBase + "/usersMaster",{usuarios:baseUsuarios})
    },
    userData:(req,res)=>{
        const idUser =req.params.idUser
        let usuarioAEditar = UserModel.findbyPK(idUser)

        res.render(rutaBase + "/userData",{usuario:usuarioAEditar})
    },
    userEdit:(req,res)=>{ 
        const idUser =req.params.idUser

        let erroresUsuario=validationResult(req)
        if (erroresUsuario.isEmpty()){

            UserModel.edit(idUser, req.body)
            
            res.redirect("/user/usersMaster/list")
        }else{
            let usuarioAEditar = UserModel.findbyPK(idUser)

            return res.render(rutaBase + "/userData",{mensajesError:erroresUsuario.mapped(), usuario:usuarioAEditar})
            //res.send(erroresRegistro.mapped())
        }
    },
    delete:(req,res)=>{
        const idUser =req.params.idUser

        UserModel.delete(idUser)

        //Redirigir al Maestro de Productos
        res.redirect("/user/usersMaster/list")
    }

}

module.exports = controller