module.exports=function(sequelize, dataTypes){
    const Marca = sequelize.define("Marca",{
        id:{
            type:dataTypes.INTEGER.UNSIGNED,
            autoIncrement:true,
            primaryKey:true,
            allowNull:false
        },
        marca:{
            type:dataTypes.STRING(100),
            allowNull:false
        }
    },{
        timestamps:false,
        tableName:"marcas"
    })
    
    Marca.associate = function(models){
        Marca.hasMany(models.Producto,{
            as:"productos",
            foreignKey:"marca_id"
        })
    }

    return Marca
}