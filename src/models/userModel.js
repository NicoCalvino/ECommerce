const path = require ("path")
const fs = require("fs")
const bcryptjs = require("bcryptjs")
const EdicionArchivosModel = require("./edicionArchivoModel")
const ProductosModel = require("./productosModel")

const model = {
    dbUsuarios: path.join(__dirname, "../database/usuarios.json"),
    dbCarrito: path.join(__dirname, "../database/carrito.json"),
    
    getAll:function(){
        return EdicionArchivosModel.readData(this.dbUsuarios)
    },
    
    findbyPK:function(pk){
        let allUsers = this.getAll()
        let userFound = allUsers.find(oneUser => oneUser.id == pk)
        return userFound
    },

    findByField:function(field,info){
        let allUsers = this.getAll()
        let userFound = allUsers.find(oneUser => oneUser[field] == info)
        return userFound
    },
    
    generateId:function(){
        let allUsers = this.getAll()
        let lastUser = allUsers.pop()
        if(lastUser){
            return lastUser.id +1
        }
        return 1
    },

    newUser:function(userInfo, imagen){
        let allUsers = this.getAll()

        let newUser ={
            id:this.generateId(),
            rol:"USUARIO",
            fechaAlta: new Date(),
            nombre : userInfo.nombre,
            apellido : userInfo.apellido,
            fechaDeNacimiento : userInfo.fechaDeNacimiento,
            email : userInfo.email,
            intereses : userInfo.intereses,
            password : bcryptjs.hashSync(userInfo.contrasena,10),
            categoria : "NUEVO",
            imagen : imagen
        }
        allUsers.push(newUser)
        EdicionArchivosModel.saveData(this.dbUsuarios, allUsers)
        return newUser
    },

    delete: function(pk){
        let allUsers = this.getAll()
        let updatedUsers = allUsers.filter(oneUser => oneUser.id != pk)
        let deletedUser = allUsers.find(oneUser => oneUser.id == pk)
        EdicionArchivosModel.saveData(this.dbUsuarios, updatedUsers)
        return deletedUser
    },

    edit: function(pk, userInfo){
        let allUsers = this.getAll()
        for (let i = 0; i < allUsers.length; i++){
            if (allUsers[i].id == pk){
                let imagen = allUsers[i].imagen
                let fechaAlta = allUsers[i].fechaAlta
                let password = allUsers[i].password
                allUsers[i] ={
                    id : Number(pk),
                    imagen: imagen,
                    fechaAlta: fechaAlta,
                    password: password,
                    rol: userInfo.rol,
                    nombre: userInfo.nombreUsuario,
                    apellido: userInfo.apellidoUsuario,
                    fechaDeNacimiento: userInfo.fechaNacimiento,
                    email: userInfo.mailUsuario,
                    intereses: userInfo.intereses,
                    categoria: userInfo.categoria,
                }
                break
            }
        }
        EdicionArchivosModel.saveData(this.dbUsuarios, allUsers)
    },

    getCart:function(){
        return EdicionArchivosModel.readData(this.dbCarrito)
    },

    addToCart: function(idProd, infoProd){
        let carrito = this.getCart()

        productoElegido = ProductosModel.findbyPK(idProd)

        productoAgregado = {
            nombre:productoElegido.nombre,
            imagen:productoElegido.imagenes[0],
            categoria:productoElegido.categoria,
            precio:productoElegido.precio,
            descuento:productoElegido.descuento,
            color:infoProd.color,
            tamano:infoProd.tamano,
            id:productoElegido.id,
            cantidad:infoProd.cantidad
        }

        carrito.push(productoAgregado)
        EdicionArchivosModel.saveData(this.dbCarrito, carrito)
        return productoAgregado
    }
}


module.exports = model