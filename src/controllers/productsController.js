const path = require("path")
const fs = require("fs")

let rutaBase = "product"

const dbProductos = path.join(__dirname, "../database/productos.json")
const dbCalif = path.join(__dirname, "../database/calificaciones.json")
const dbCarrito = path.join(__dirname, "../database/carrito.json")

const readJsonFile = (rutaArchivo) => {
    const data = fs.readFileSync(rutaArchivo,"utf-8")
    const dataParsed = JSON.parse(data)
    return dataParsed
}

const writeJsonFile = (rutaArchivo, contenido) => {
    const dataStringified = JSON.stringify(contenido, null, 2)
    fs.writeFileSync(rutaArchivo, dataStringified)
}

function Producto(nombre,imagen,categoria,subCategoria,precio,descuento,colores,tamanos,caract,codigo,stock,estado){
    this.id=codigo
    this.nombre=nombre
    this.imagenes=imagen
    this.categoria=categoria
    this.subcategoria=subCategoria
    this.precio=precio
    this.descuento=descuento
    this.colores=colores
    this.tamanos=tamanos
    this.caracteristicas=caract
    this.stock=stock
    this.estado=estado
}

function ProductoEnCarrito(nombre,imagen,categoria,subCategoria,precio,descuento,color,tamano,codigo,cantidad){
    this.nombre=nombre
    this.imagenes=imagen
    this.categoria=categoria
    this.subcategoria=subCategoria
    this.precio=precio
    this.descuento=descuento
    this.color=color
    this.tamano=tamano
    this.cantidad=cantidad
    this.id=codigo
}


const controller={
    index:(req,res) => {
        const catalogo = readJsonFile(dbProductos)
        res.render(rutaBase + "/catalogo", {catalogo:catalogo})
    },
    detalle:(req,res) => {
        const idProd = req.params.idProd;
        const catalogo = readJsonFile(dbProductos)
        producto = catalogo.find((prod) => prod.id == idProd)

        const catalogoCategoria=catalogo.filter(prod =>{
            return prod.id != producto.id && prod.categoria == producto.categoria
        })
        const otrosProd=catalogo.filter(prod =>{
            return prod.id != "newProd" && prod.categoria != producto.categoria 
        })

        const calificaciones = readJsonFile(dbCalif)

        const opinionesProd = calificaciones.filter(opinion =>{
            return opinion.producto == idProd
        })
        
        let califTotal = 0
        for (let i=0; i<opinionesProd.length;i++){
            califTotal = califTotal + opinionesProd[i].calificacion
        }

        let califProm = califTotal/(opinionesProd.length)
        
        res.render(rutaBase + "/productDetail", {
            producto,
            catalogoCategoria,
            otrosProd,
            opinionesProd,
            califProm
        })
    },
    editProduct:(req,res)=>{
        const idProd = req.params.idProd;
        const catalogo = readJsonFile(dbProductos)
        producto = catalogo.find((prod) => prod.id == idProd);
        res.render(rutaBase + "/productData",{producto:producto})
    },
    newProduct:(req,res)=>{
        const catalogo = readJsonFile(dbProductos)
        producto = catalogo.find((prod) => prod.id == "newProd");
        res.render(rutaBase + "/productData",{producto:producto})
    },
    createProduct:(req,res)=>{
        const nombreProd = req.body.nombreProducto
        const categoria = req.body.categoria
        const subcategoria = req.body.subcategoria
        const precio = req.body.precio
        const descuento = req.body.precioAnt
        const colores = req.body.colores
        const tamanos = req.body.tamanos
        const caracteristicas = req.body.caracteristicas
        const stock = req.body.stock
        const estado = req.body.estado
        const imagen = req.file?.filename || "SinImagen.png"
        
        const catalogo = readJsonFile(dbProductos)
        const catalogoCategoria = catalogo.filter(prod =>{
            return prod.categoria == categoria
        })

        //Conversiones a Array
        let arrayImagenes = []
        arrayImagenes.push(imagen)
        let arrayColores = colores.split(",")
        let arrayTamanos = tamanos.split(",")
        let arrayCaract = caracteristicas.split(",")


        //Asignacion de Codigo
        let ultimoCodigo = 0
        catalogoCategoria.forEach( prod =>{
            codigoProducto = prod.id
            letraCodigo = codigoProducto.slice(0,1)
            nroCodigo = Number(codigoProducto.slice(1,codigoProducto.length))
            if (nroCodigo > ultimoCodigo){
                ultimoCodigo = nroCodigo
            }
        })

        let nuevoCodigo = ultimoCodigo +1

        nuevoCodigo = letraCodigo + nuevoCodigo

        //Creacion de Objeto Literal
        let productoNuevo = new Producto(nombreProd,arrayImagenes,categoria,subcategoria,precio,descuento,arrayColores,arrayTamanos,arrayCaract,nuevoCodigo,stock,estado)
        
        //Agregar el Nuevo Producto al Rango Json
        catalogo.push(productoNuevo)

        //Guardado de Archivo
        writeJsonFile(dbProductos, catalogo)

        //Redirigir al Maestro de Productos
        res.redirect("/products/prodMaster/list")
    },
    master:(req,res)=>{
        const catalogo = readJsonFile(dbProductos)
        res.render(rutaBase + "/prodMaster",{catalogo:catalogo})
    },
    update:(req,res)=>{
        const idProd = req.params.idProd
        const nombreProd = req.body.nombreProducto
        const categoria = req.body.categoria
        const subcategoria = req.body.subcategoria
        const precio = req.body.precio
        const descuento = req.body.precioAnt
        const colores = req.body.colores
        const tamanos = req.body.tamanos
        const caracteristicas = req.body.caracteristicas
        const stock = req.body.stock
        const estado = req.body.estado
        
        //Conversiones a Array
        let arrayColores = colores.split(",")
        let arrayTamanos = tamanos.split(",")
        let arrayCaract = caracteristicas.split(",")
        
        const catalogo = readJsonFile(dbProductos)
        //Asignacion de Codigo
        catalogo.forEach( prod =>{
            if (prod.id == idProd){
                prod.nombre=nombreProd
                prod.categoria=categoria
                prod.subcategoria=subcategoria
                prod.precio=precio
                prod.descuento=descuento
                prod.colores=arrayColores
                prod.tamanos=arrayTamanos
                prod.caracteristicas=arrayCaract
                prod.stock=stock
                prod.estado=estado
            }
        })

        //Guardado de Archivo
        writeJsonFile(dbProductos, catalogo)

        //Redirigir al Maestro de Productos
        res.redirect("/products/prodMaster/list")
    },
    delete:(req,res)=>{
        const catalogo = readJsonFile(dbProductos)
        const idProd = req.params.idProd

        const nuevoCatalogo = catalogo.filter(prod => {
            return prod.id !=idProd
        })

        //Guardado de Archivo
        writeJsonFile(dbProductos, nuevoCatalogo)

        //Redirigir al Maestro de Productos
        res.redirect("/products/prodMaster/list")
    }

}

module.exports=controller