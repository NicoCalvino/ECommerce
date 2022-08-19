module.exports=function(sequelize, dataTypes){
    const ProductoTamano = sequelize.define("ProductoTamano",{
        id:{
            type:dataTypes.INTEGER.UNSIGNED,
            autoIncrement:true,
            primaryKey:true,
            allowNull:false
        },
        producto_id:{
            type:dataTypes.INTEGER.UNSIGNED,
            allowNull:false,
            foreignKey:true
        },
        tamano_id:{
            type:dataTypes.INTEGER.UNSIGNED,
            allowNull:false,
            foreignKey:true
        }
    },{
        timestamps:false,
        tableName:"producto_tamano"
    })

    return ProductoTamano
}