module.exports=function(sequelize, dataTypes){
    const Imagen = sequelize.define("Imagen",{
        id:{
            type:dataTypes.INTEGER.UNSIGNED,
            autoIncrement:true,
            primaryKey:true,
            allowNull:false
        },
        imagen:{
            type:dataTypes.STRING(100),
            allowNull:false
        },
        producto_id:{
            type:dataTypes.BIGINT(10).UNSIGNED,
            allowNull:false,
            foreignKey:true,
        }
    },{
        timestamps:false,
        tableName:"imagenes"
    })

    Imagen.associate = function(models){
        Imagen.belongsTo(models.Producto,{
            as:"productos",
            foreignKey:"producto_id"
        })   
    }
    
    return Imagen
}