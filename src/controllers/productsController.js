const path = require("path")
const fs = require("fs")

let rutaBase = "product"

const dbBicicletasMontana = path.join(__dirname, "../database/bicicletasMontana.json")
const dbAccesorios = path.join(__dirname, "../database/accesorios.json")
const dbNuevo = path.join(__dirname, "../database/productoNuevo.json")
const dbCarrito = path.join(__dirname, "../database/carrito.json")


const readJsonFile = (rutaArchivo) => {
    const data = fs.readFileSync(rutaArchivo,"utf-8")
    const dataParsed = JSON.parse(data)
    return dataParsed
}

const controller={
    index:(req,res) => {
        const catalogo = readJsonFile(dbBicicletasMontana)
        res.render(rutaBase + "/catalogo", {catalogo:catalogo})
    },
    detalle:(req,res) => {
        const idProd = req.params.idProd;
        let codCat = idProd.slice(0,2)
        switch(codCat){
            case "bm":
                catalogoCategoria = readJsonFile(dbBicicletasMontana)
                otrosProd = readJsonFile(dbAccesorios)
                producto = catalogoCategoria.find((prod) => prod.codigo == idProd);
                break
            case "ac":
                catalogoCategoria = readJsonFile(dbAccesorios)
                otrosProd = readJsonFile(dbBicicletasMontana)
                producto = catalogoCategoria.find((prod) => prod.codigo == idProd);
                break
        }
        res.render(rutaBase + "/productDetail", {
            producto:producto,
            catalogoCategoria:catalogoCategoria,
            otrosProd:otrosProd
        })
    },
    cart:(req,res) => {
        const carrito = readJsonFile(dbCarrito)
        res.render(rutaBase + "/productCart",{carrito:carrito})
    },
    editProduct:(req,res)=>{
        const idProd = req.params.idProd;
        const bicicletas = readJsonFile(dbBicicletasMontana)
        const accesorios = readJsonFile(dbAccesorios)
        const catalogo = [...bicicletas,...accesorios]
        producto = catalogo.find((prod) => prod.codigo == idProd);
        res.render(rutaBase + "/productData",{producto:producto})
    },
    newProduct:(req,res)=>{
        const producto = readJsonFile(dbNuevo)
        res.render(rutaBase + "/productData",{producto:producto})
    },
    master:(req,res)=>{
        const bicicletas = readJsonFile(dbBicicletasMontana)
        const accesorios = readJsonFile(dbAccesorios)
        const catalogo = [...bicicletas,...accesorios]
        res.render(rutaBase + "/prodMaster",{catalogo:catalogo})
    }

}

module.exports=controller