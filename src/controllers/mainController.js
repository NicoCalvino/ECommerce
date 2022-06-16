const path = require("path")
const fs = require("fs")

let rutaBase = "main"

const dbProductos = path.join(__dirname, "../database/productos.json")

const readJsonFile = (rutaArchivo) => {
    const data = fs.readFileSync(rutaArchivo,"utf-8")
    const dataParsed = JSON.parse(data)
    return dataParsed
}

const controller = {
    index:(req, res) => {
        const catalogo = readJsonFile(dbProductos)
        const ofertas = catalogo.filter(function(producto){
            return producto.estado == "OFERTA"
        })
        const novedades = catalogo.filter(function(producto){
            return producto.estado == "NOVEDAD"
        })
        res.render(rutaBase + "/home", {ofertas:ofertas,novedades:novedades})
    }
}

module.exports = controller