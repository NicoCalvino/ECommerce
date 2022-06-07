const path = require ("path")

let rutaBase = "user"

const controller = {
    login:(req,res) => {
        res.render(rutaBase + "/login")
    },
    register:(req,res) => {
        res.render(rutaBase + "/register")
    }
}

module.exports = controller