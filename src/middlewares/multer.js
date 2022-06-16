const multer = require("multer")
const path = require("path")

const storage = multer.diskStorage({ 
    destination: function (req, file, cb) {
      let folder = path.join(__dirname, "../public/images")
       cb(null, folder ); 
    }, 
    filename: function (req, file, cb) { 
      let nombreArchivo = Date.now() + "_img_" + path.extname(file.originalname)
       cb(null,nombreArchivo )
    } 
  })


module.exports=multer