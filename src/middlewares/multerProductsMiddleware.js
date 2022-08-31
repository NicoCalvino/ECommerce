const multer = require("multer")
const path = require("path")

let formatos = ['.JPG','.jpg','.JPEG','.jpeg','.PNG','.png','.GIF','.gif']

const storage = multer.diskStorage({ 
    destination: function (req, file, cb) {
      let folder = path.join(__dirname, "../public/images/productos")
       cb(null, folder ); 
    }, 
    filename: function (req, file, cb) { 
      let nombreArchivo = Date.now() + "_img_" + path.extname(file.originalname)
       cb(null,nombreArchivo )
    } 
})

let fileUpload = multer({storage: storage, })

module.exports=fileUpload