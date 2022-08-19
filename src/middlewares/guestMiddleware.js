const db = require('../database/models')
const sequelize = db.sequelize

async function guestMiddleware (req,res,next){
    if (req.session.userLogged){
        let userFromSession = await db.Usuario.findAll({
            where:{
                email:req.session.userLogged
            }
        })

        if(userFromSession.length>0){
            return res.redirect('/user/userProfile')
        }
    }
    next()
}

module.exports=guestMiddleware