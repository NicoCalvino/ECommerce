const path = require ("path")
const fs = require("fs")

const model = {    
    readData: function (archivo){
        return JSON.parse(fs.readFileSync(archivo,"utf-8"))
    },
    
    saveData: function(archivo, contenido){
        fs.writeFileSync(archivo, JSON.stringify(contenido, null, 2))    
    }
}

module.exports=model