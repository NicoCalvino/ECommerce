const path = require ("path")
const fs = require("fs")

const model = {
    randomReduce:function(array){
        let newArray = []
        for (let x = 1; x < 6 ; x++){
            let buscador = Math.round(Math.random()*1000)
            let indiceRandom = 0
            for (let i = 1; i <=buscador ; i++){
                indiceRandom++
                if(indiceRandom >= array.length){
                    indiceRandom = 0
                }
            }
            if(!newArray.includes(array[indiceRandom])){
                newArray.push(array[indiceRandom])
            }else{x--}
        }
        return newArray
    },

    selectorFoto:()=>{
        let arrayFotos = ["mountainbikebanner1.jpg","mountainb_dusk.jpg","kidscyclingbanner.jpg","citybikebanner.jpg","rueda_tierra.jpg","mountain_willy.jpg"]

        let buscador = Math.round(Math.random()*100)
        let indiceRandom = 0
        for (let i = 1; i <=buscador ; i++){
            indiceRandom++
            if(indiceRandom >= arrayFotos.length){
                indiceRandom = 0
            }
        }

        return arrayFotos[indiceRandom]
    }
}

module.exports = model