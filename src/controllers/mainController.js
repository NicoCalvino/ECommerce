const path = require("path")
const fs = require("fs")

const dbPath = path.join(__dirname, "../database/bicicletasMontana.json")

let rutaBase = "main"

const dbBicicletasMontana = path.join(__dirname, "../database/bicicletasMontana.json")
const dbAccesorios = path.join(__dirname, "../database/accesorios.json")

const readJsonFile = (rutaArchivo) => {
    const data = fs.readFileSync(rutaArchivo,"utf-8")
    const dataParsed = JSON.parse(data)
    return dataParsed
}

const controller = {
    index:(req, res) => {
        const bicicletas = readJsonFile(dbBicicletasMontana)
        const accesorios = readJsonFile(dbAccesorios)
        const catalogo = [...bicicletas,...accesorios]
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