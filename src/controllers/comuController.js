const path = require("path")

let rutaBase = "comunidad"

const controller = {
    index:(req,res) => {
        res.render(rutaBase + "/comunidad")
    },
    avntMont:(req,res)=>{
        res.render(rutaBase + "/aventuraDeMontana")
    },
    paseoNoct:(req,res)=>{
        res.render(rutaBase + "/paseosNocturnos")
    },
    biciKids:(req,res)=>{
        res.render(rutaBase + "/biciKids")
    },
}

module.exports = controller