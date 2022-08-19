module.exports=function(sequelize, dataTypes){
    const Categoria = sequelize.define("Categoria",{
        id:{
            type:dataTypes.INTEGER.UNSIGNED,
            autoIncrement:true,
            primaryKey:true,
            allowNull:false
        },
        categoria:{
            type:dataTypes.STRING(100),
            allowNull:false
        }
    },{
        timestamps:false,
        tableName:"categorias"
    })

    Categoria.associate = function(models){
        Categoria.hasMany(models.Producto,{
            as:"productos",
            foreignKey:"categoria_id"
        })
    }

    return Categoria
}