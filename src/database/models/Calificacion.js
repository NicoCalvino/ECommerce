module.exports=function(sequelize, dataTypes){
    const Calificacion = sequelize.define("Calificacion",{
        id:{
            type:dataTypes.INTEGER.UNSIGNED,
            autoIncrement:true,
            primaryKey:true,
            allowNull:false
        },
        nota:{
            type:dataTypes.DECIMAL(10,2).UNSIGNED,
            allowNull:false
        },
        titulo:{
            type:dataTypes.STRING(100),
            allowNull:false
        },
        detalle:{
            type:dataTypes.TEXT,
            allowNull:false
        },
        producto_id:{
            type:dataTypes.INTEGER.UNSIGNED,
            allowNull:false,
            foreignkey:true,
        },
        usuario_id:{
            type:dataTypes.INTEGER.UNSIGNED,
            allowNull:false,
            foreignKey:true,
        } 
    },{
        createdAt:"created_at",
        updatedAt:"updated_at",
        deletedAt:"deleted_at",
        tableName:"calificaciones"
    })

    Calificacion.associate = function(models){
        Calificacion.belongsTo(models.Producto,{
            as:"productos",
            foreignKey:"producto_id"
        })
        Calificacion.belongsTo(models.Usuario,{
            as:"usuarios",
            foreignKey:"usuario_id"
        })
    }

    return Calificacion
}