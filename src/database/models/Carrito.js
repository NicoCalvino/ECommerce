module.exports=function(sequelize, dataTypes){
    const Carrito = sequelize.define("Carrito",{
        id:{
            type:dataTypes.INTEGER.UNSIGNED,
            autoIncrement:true,
            primaryKey:true,
            allowNull:false
        },
        cantidad:{
            type:dataTypes.BIGINT(10).UNSIGNED,
            default:null
        },
        imagen:{
            type:dataTypes.STRING(100),
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
        },
        tamano_id:{
            type:dataTypes.INTEGER.UNSIGNED,
            allowNull:false,
            foreignKey:true
        },
        color_id:{
            type:dataTypes.INTEGER.UNSIGNED,
            allowNull:false,
            foreignKey:true
        }
    },{
        timestamps:false,
        tableName:"carrito_de_compras"
    })

    Carrito.associate= function(models){
        Carrito.belongsTo(models.Color,{
            as:"colores",
            foreignKey:"color_id",
        })
        Carrito.belongsTo(models.Tamano,{
            as:"tamanos",
            foreignKey:"tamano_id",
        })
        Carrito.belongsTo(models.Usuario,{
            as:"usuarios",
            foreignKey:"usuario_id",
        })
        Carrito.belongsTo(models.Producto,{
            as:"productos",
            foreignKey:"producto_id",
        })
    }
    

    return Carrito
}