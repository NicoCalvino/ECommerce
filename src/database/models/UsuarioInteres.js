module.exports=function(sequelize, dataTypes){
    const UsuarioInteres = sequelize.define("UsuarioInteres",{
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
        interes_id:{
            type:dataTypes.INTEGER.UNSIGNED,
            allowNull:false,
            foreignKey:true
        }
    },{
        timestamps:false,
        tableName:"usuario_interes"
    })

    return UsuarioInteres
}