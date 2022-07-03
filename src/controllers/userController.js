const path = require ("path")
const fs = require("fs")
const UserModel = require("../models/userModel")

const {validationResult}=require('express-validator')

let rutaBase = "user"

const controller = {
    login:(req,res) => {
        res.render(rutaBase + "/login")
    },
    register:(req,res) => {
        res.render(rutaBase + "/register")
    },
    newUser:(req,res) =>{
        let erroresRegistro=validationResult(req)

        if (erroresRegistro.isEmpty()){

            UserModel.newUser(req.body,req.file?.filename || "Anonimo.png")

            //Redirigir al Maestro de Productos
            res.redirect("/user/usersMaster/list")
        }else{
            return res.render(rutaBase + "/register",{mensajesError:erroresRegistro.mapped(), oldInfo:req.body})
            //res.send(erroresRegistro.mapped())
        }
    },
    cart:(req,res) => {
        const carrito = UserModel.getCart()
        res.render(rutaBase + "/productCart",{carrito:carrito})
    },
    addToCart:(req,res)=>{
        idProd = req.params.idProd
        
        UserModel.addToCart(idProd, req.body)
        
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