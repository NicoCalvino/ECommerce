const path = require ("path")
const fs = require("fs")

const {validationResult}=require('express-validator')

let rutaBase = "user"

const dbProductos = path.join(__dirname, "../database/productos.json")
const dbUsuarios = path.join(__dirname, "../database/usuarios.json")
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

function Usuario(id, nombre, apellido, fechaDeNacimiento, email, intereses, password, categoria, imagen){
    this.id=id
    this.nombre=nombre
    this.apellido=apellido
    this.fechaDeNacimiento=fechaDeNacimiento
    this.email=email
    this.intereses=intereses
    this.password=password
    this.categoria=categoria
    this.imagen=imagen
}

function ProductoEnCarrito(nombre,imagen,categoria,subCategoria,precio,descuento,color,tamano,codigo,cantidad){
    this.nombre=nombre
    this.imagen=imagen
    this.categoria=categoria
    this.subcategoria=subCategoria
    this.precio=precio
    this.descuento=descuento
    this.color=color
    this.tamano=tamano
    this.cantidad=cantidad
    this.id=codigo
}

const controller = {
    login:(req,res) => {
        res.render(rutaBase + "/login")
    },
    register:(req,res) => {
        res.render(rutaBase + "/register")
    },
    newUser:(req,res) =>{
        let erroresRegistro=validationResult(req)

        if (erroresRegistro.isEmpty()){

            const name = req.body.nombre
            const lastName = req.body.apellido
            const birthDate = req.body.fechaDeNacimiento
            const email = req.body.email
            const interests = req.body.intereses
            const password = req.body.contrasena
            const categoria = "NUEVO"
            const imagen = req.file?.filename || "Anonimo.png"

            const baseUsuarios = readJsonFile(dbUsuarios) 

            //Asignacion de Codigo
            let ultimoCodigo = 0
            baseUsuarios.forEach( user =>{
                codigoUsuario = user.id
                if (codigoUsuario > ultimoCodigo){
                    ultimoCodigo = codigoUsuario
                }
            })
            let nuevoCodigo = ultimoCodigo +1

            let usuarioNuevo = new Usuario(nuevoCodigo,name,lastName,birthDate,email,interests,password,categoria,imagen)

            //Agregar el Nuevo Producto al Rango Json
            baseUsuarios.push(usuarioNuevo)

            //Guardado de Archivo
            writeJsonFile(dbUsuarios, baseUsuarios)

            //Redirigir al Maestro de Productos
            res.redirect("../")
        }else{
            return res.render(rutaBase + "/register",{mensajesError:erroresRegistro.mapped(), oldInfo:req.body})
            //res.send(erroresRegistro.mapped())
        }
    },
    cart:(req,res) => {
        const carrito = readJsonFile(dbCarrito)
        res.render(rutaBase + "/productCart",{carrito:carrito})
    },
    addToCart:(req,res)=>{
        idProd = req.params.idProd
        
        const catalogo = readJsonFile(dbProductos)
        const carrito  = readJsonFile(dbCarrito)

        const color = req.body.color
        const tamano = req.body.tamano
        const cantidad = req.body.cantidad

        producto = catalogo.filter(prod => {
            return prod.id == idProd
        })

        console.log(producto)

        let productoAgregado = new ProductoEnCarrito(producto[0].nombre,producto[0].imagenes[0],producto[0].categoria,producto[0].subCategoria,producto[0].precio,producto[0].descuento,color,tamano,producto[0].id,cantidad)

        carrito.push(productoAgregado)
        
        //Guardado de Archivo
        writeJsonFile(dbCarrito, carrito)

        //Redirigir al Maestro de Productos
        res.redirect("/user/productCart")
    }
}

module.exports = controller