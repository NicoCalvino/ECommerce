//const UserModel = require("../models/userModel")
const db = require('../database/models')
const sequelize = db.sequelize

async function userLoggedMiddleware (req,res,next){
    res.locals.isLogged=false
    res.locals.userAdmin=false

    let emailInCookie = req.cookies.emailLogged
    
    if(emailInCookie){
        req.session.userLogged=emailInCookie
    }
    
    if(req.session.userLogged){
        
        let userFromSession = await db.Usuario.findAll({
            where:{
                email:req.session.userLogged
            }
        })
        
        if(userFromSession.length>0){
            let userRole = userFromSession[0].rol_id
            let userPk = userFromSession[0].id
            let userName = userFromSession[0].nombre
    
            res.locals.isLogged = true
            res.locals.userLogged = req.session.userLogged
            res.locals.userId = userPk
            res.locals.userName = userName
            if (userRole == 2){
                
                req.session.userAdmin=true
                res.locals.userAdmin=true
            }
        }
    }
    next()
}

module.exports = userLoggedMiddleware