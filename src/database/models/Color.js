module.exports=function(sequelize, dataTypes){
    const Color = sequelize.define("Color",{
        id:{
            type:dataTypes.INTEGER.UNSIGNED,
            autoIncrement:true,
            primaryKey:true,
            allowNull:false
        },
        color:{
            type:dataTypes.STRING(100),
            allowNull:false
        }
    },{
        timestamps:false,
        tableName:"colores"
    })

    Color.associate = function(models){
        Color.belongsToMany(models.Producto,{
            as:"productos",
            through:"producto_color",
            foreignKey:"color_id",
            otherKey:"producto_id",
            timestamps:false
        })
        Color.hasMany(models.Carrito,{
            as:"carritos",
            foreignKey:"color_id",
        })
        
    }
    
    return Color
}