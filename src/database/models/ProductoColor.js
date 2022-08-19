module.exports=function(sequelize, dataTypes){
    const ProductoColor = sequelize.define("ProductoColor",{
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
        color_id:{
            type:dataTypes.INTEGER.UNSIGNED,
            allowNull:false,
            foreignKey:true
        }
    },{
        timestamps:false,
        tableName:"producto_color"
    })

    return ProductoColor
}