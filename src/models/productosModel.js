const path = require ("path")
const fs = require("fs")
const EdicionArchivosModel = require("./edicionArchivoModel")

const model = {
    dbProductos: path.join(__dirname, "../database/productos.json"),
    dbCalif: path.join(__dirname, "../database/calificaciones.json"),        
    getAll:function(){
        return EdicionArchivosModel.readData(this.dbProductos)
    },
    
    findbyPK:function(pk){
        let allProducts = this.getAll()
        let productFound = allProducts.find(oneProduct => oneProduct.id == pk)
        return productFound
    },

    findByField:function(field,info){
        let allProducts = this.getAll()
        let productFound = allProducts.find(oneProduct => oneProduct[field] == info)
        return productFound
    },

    filterByField:function(field, dato, filtro){
        let allProducts = this.getAll()
        let newArray
        if (filtro = 1){
            newArray = allProducts.filter(oneProduct => oneProduct[field] == dato)
        }else if(filtro = 2){
            newArray = allProducts.filter(oneProduct => oneProduct[field] != dato)
        }
        return newArray
    },

    filterPKFromArray:function(pk, field, dato){
        let allProducts = this.filterByField(field, dato, 1)
        let newArray = allProducts.filter(oneProduct => oneProduct.id != pk)
        return newArray
    },

    reviewDetail:function(idProd){
        let calificaciones = EdicionArchivosModel.readData(this.dbCalif)
        let califFiltradas = calificaciones.filter(review => review.producto == idProd)
        let califTotal = 0
        for (let i = 0 ; i < califFiltradas; i++){
            califTotal = califTotal + califFiltradas[i].calificacion
        }
        let califProm = califTotal/(opinionesProd.length)

        let resumenCalificacion = [califFiltradas, califProm]
        return resumenCalificacion
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
    }

}

module.exports = model