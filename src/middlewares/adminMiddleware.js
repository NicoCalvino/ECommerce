function adminMiddleware (req,res,next){
    if (!req.session.userAdmin){
        console.log(req.session.userAdmin)
        return res.redirect('/user/userProfile')
    }
    next()
}

module.exports=adminMiddleware