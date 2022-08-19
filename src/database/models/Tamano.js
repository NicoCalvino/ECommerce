module.exports=function(sequelize, dataTypes){
    const Tamano = sequelize.define("Tamano",{
        id:{
            type:dataTypes.INTEGER.UNSIGNED,
            autoIncrement:true,
            primaryKey:true,
            allowNull:false
        },
        tamano:{
            type:dataTypes.STRING(100),
            allowNull:false
        }
    },{
        timestamps:false,
        tableName:"tamanos"
    })

    Tamano.associate = function(models){
        Tamano.belongsToMany(models.Producto,{
            as:"productos",
            through:"producto_tamano",
            foreignKey:"tamano_id",
            otherKey:"producto_id",
            timestamps:false
        })
        Tamano.hasMany(models.Carrito,{
            as:"carritos",
            foreignKey:"tamano_id",
        })
    }

    return Tamano
}