module.exports=function(sequelize, dataTypes){
    const Subcategoria = sequelize.define("Subcategoria",{
        id:{
            type:dataTypes.INTEGER.UNSIGNED,
            autoIncrement:true,
            primaryKey:true,
            allowNull:false
        },
        subcategoria:{
            type:dataTypes.STRING(100),
            allowNull:false
        }
    },{
        timestamps:false,
        tableName:"subcategorias"
    })

    Subcategoria.associate = function(models){
        Subcategoria.hasMany(models.Producto,{
            as:"productos",
            foreignKey:"subcategoria_id"
        })
    }

    return Subcategoria
}