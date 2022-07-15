const UserModel = require("../models/userModel")

function userLoggedMiddleware (req,res,next){
    res.locals.isLogged=false
    res.locals.userAdmin=false

    let emailInCookie = req.cookies.emailLogged
    let userFromCookie = UserModel.findByField("email",emailInCookie)

    if(userFromCookie){
        req.session.userLogged=emailInCookie
    }
    if(req.session.userLogged){
        let userRole = UserModel.getOneField(req.session.userLogged, "rol")
        let userPk = UserModel.getOneField(req.session.userLogged, "id")
        let userName = UserModel.getOneField(req.session.userLogged, "nombre")
        
        res.locals.isLogged = true
        res.locals.userLogged = req.session.userLogged
        res.locals.userId = userPk
        res.locals.userName = userName
        if (userRole == "ADMINISTRADOR"){
            req.session.userAdmin=true
            res.locals.userAdmin=true
        }
    }
    next()
}

module.exports = userLoggedMiddleware