module.exports=function(sequelize, dataTypes){
    const CategoriaDeUsuario = sequelize.define("CategoriaDeUsuario",{
        id:{
            type:dataTypes.INTEGER.UNSIGNED,
            autoIncrement:true,
            primaryKey:true,
            allowNull:false
        },
        categoria_de_usuario:{
            type:dataTypes.STRING(100),
            allowNull:false
        }
    },{
        timestamps:false,
        tableName:"categorias_de_usuarios"
    })
    
    CategoriaDeUsuario.associate = function(models){  
        CategoriaDeUsuario.hasMany(models.Usuario,{
            as:"usuarios",
            foreignKey:"categoria_de_usuario_id"
        })
    }

    return CategoriaDeUsuario
}