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
        if (filtro == 1){
            newArray = allProducts.filter(oneProduct => oneProduct[field] == dato)
        }else if(filtro == 2){
            newArray = allProducts.filter(oneProduct => oneProduct[field] != dato)
        }
        return newArray
    },

    filterPKFromArray:function(pk, field, dato){
        let allProducts = this.filterByField(field, dato, 1)
        let newArray = allProducts.filter(oneProduct => oneProduct.id != pk)
        return newArray
    },

    randomReduce:function(array){
        let newArray = []
        for (let x = 1; x < 6 ; x++){
            let buscador = Math.round(Math.random()*1000)
            console.log(buscador)
            let indiceRandom = 0
            for (let i = 1; i <=buscador ; i++){
                indiceRandom++
                if(indiceRandom >= array.length){
                    indiceRandom = 0
                }
            }
            console.log(array[indiceRandom])
            if(!newArray.includes(array[indiceRandom])){
                newArray.push(array[indiceRandom])
            }else{x--}
        }
        return newArray
    },

    reviewDetail:function(idProd){
        let calificaciones = EdicionArchivosModel.readData(this.dbCalif)
        let califFiltradas = calificaciones.filter(review => review.producto == idProd)
        let califTotal = 0
        for (let i = 0 ; i < califFiltradas.length; i++){
            califTotal = califTotal + califFiltradas[i].calificacion
        }
        let califProm = califTotal/(califFiltradas.length)

        let resumenCalificacion = [califFiltradas, califProm]
        return resumenCalificacion
    },
    
    generateId:function(newCat){
        let catalogoCategoria = this.filterByField("categoria", newCat, 1)
        letraCodigo = newCat.slice(0,1)
        let lastProd = catalogoCategoria.pop()
        if(lastProd){
            nroCodigo = Number(lastProd.id.slice(1,lastProd.id.length))
            return letraCodigo + (nroCodigo +1)
        }
        return letraCodigo + 1
    },

    newProduct:function(prodInfo, imagen){
        let allProducts = this.getAll()
        let categoria = prodInfo.categoria
        let newProd ={
            id:this.generateId(categoria),
            nombre: prodInfo.nombreProducto,
            imagenes: imagen.split(","),    
            categoria:  prodInfo.categoria,
            subcategoria:  prodInfo.subcategoria,
            precio:  prodInfo.precio,
            descuento:  prodInfo.precioAnt,
            colores:  prodInfo.colores.split(","),
            tamanos: prodInfo.tamanos.split(","),
            caracteristicas:  prodInfo.caracteristicas.split(","),
            stock:  prodInfo.stock,
            estado:  prodInfo.estado
        }
        allProducts.push(newProd)
        EdicionArchivosModel.saveData(this.dbProductos, allProducts)
        return newProd
    },

    delete: function(pk){
        let allProducts = this.getAll()
        let updatedProducts = allProducts.filter(oneProduct => oneProduct.id != pk)
        let deletedProduct = allProducts.find(oneProduct => oneProduct.id == pk)
        EdicionArchivosModel.saveData(this.dbProductos, updatedProducts)
        return deletedProduct
    },

    editProd: function(pk, prodInfo){
        let allProducts = this.getAll()
        for (let i = 0; i < allProducts.length; i++){
            if (allProducts[i].id == pk){
                let imagenes = allProducts[i].imagenes
                allProducts[i] ={
                    id:pk,
                    nombre: prodInfo.nombreProducto,
                    imagenes: imagenes,    
                    categoria:  prodInfo.categoria,
                    subcategoria:  prodInfo.subcategoria,
                    precio:  prodInfo.precio,
                    descuento:  prodInfo.precioAnt,
                    colores:  prodInfo.colores.split(","),
                    tamanos: prodInfo.tamanos.split(","),
                    caracteristicas:  prodInfo.caracteristicas.split(","),
                    stock:  prodInfo.stock,
                    estado:  prodInfo.estado
                }
                break
            }
        }
        EdicionArchivosModel.saveData(this.dbProductos, allProducts)
    }

}

module.exports = model