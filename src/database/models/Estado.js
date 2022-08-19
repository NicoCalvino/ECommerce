module.exports=function(sequelize, dataTypes){
    const Estado = sequelize.define("Estado",{
        id:{
            type:dataTypes.INTEGER.UNSIGNED,
            autoIncrement:true,
            primaryKey:true,
            allowNull:false
        },
        estado:{
            type:dataTypes.STRING(100),
            allowNull:false
        }
    },{
        timestamps:false,
        tableName:"estados"
    })
    
    Estado.associate = function(models){
        Estado.hasMany(models.Producto,{
            as:"productos",
            foreignKey:"estado_id"
        })
    }

    return Estado
}