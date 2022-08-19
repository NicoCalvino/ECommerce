module.exports=function(sequelize, dataTypes){
    const Interes = sequelize.define("Interes",{
        id:{
            type:dataTypes.INTEGER.UNSIGNED,
            autoIncrement:true,
            primaryKey:true,
            allowNull:false
        },
        interes:{
            type:dataTypes.STRING(100),
            allowNull:false
        }
    },{
        timestamps:false,
        tableName:"intereses"
    })

    Interes.associate = function(models){
        Interes.belongsToMany(models.Usuario,{
            as:"usuarios",
            through:"usuario_interes",
            foreignKey:"interes_id",
            otherKey:"usuario_id",
            timestamps:false
        })
    }
    
    return Interes
}