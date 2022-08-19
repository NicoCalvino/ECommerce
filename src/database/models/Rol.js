module.exports=function(sequelize, dataTypes){
    const Rol = sequelize.define("Rol",{
        id:{
            type:dataTypes.INTEGER.UNSIGNED,
            autoIncrement:true,
            primaryKey:true,
            allowNull:false
        },
        rol:{
            type:dataTypes.STRING(100),
            allowNull:false
        }
    },{
        timestamps:false,
        tableName:"roles"
    })

    Rol.associate = function(models){
        Rol.hasMany(models.Usuario,{
            as:"usuarios",
            foreignKey:"rol_id"
        })
    }
    
    return Rol
}