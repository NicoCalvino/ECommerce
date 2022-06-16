const path = require ("path")
const fs = require("fs")

let rutaBase = "user"

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

const controller = {
    login:(req,res) => {
        res.render(rutaBase + "/login")
    },
    register:(req,res) => {
        res.render(rutaBase + "/register")
    },
    newUser:(req,res) =>{
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
    },
    cart:(req,res) => {
        const carrito = readJsonFile(dbCarrito)
        res.render(rutaBase + "/productCart",{carrito:carrito})
    }
}

module.exports = controller