module.exports=function(sequelize, dataTypes){
    const Favorito = sequelize.define("Favorito",{
        id:{
            type:dataTypes.INTEGER.UNSIGNED,
            autoIncrement:true,
            primaryKey:true,
            allowNull:false
        },
        usuario_id:{
            type:dataTypes.INTEGER.UNSIGNED,
            allowNull:false,
            foreignKey:true
        },
        producto_id:{
            type:dataTypes.INTEGER.UNSIGNED,
            allowNull:false,
            foreignKey:true
        }
    },{
        timestamps:false,
        tableName:"favoritos_de_usuarios"
    })

    return Favorito
}