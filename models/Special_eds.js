const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Special_ed extends Model { }

Special_ed.init(
    {
        iep_url: {
            type: DataTypes.STRING
        },
        notes: {
            type: DataTypes.TEXT
        }
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'special_ed'
    }

)


module.exports = Special_ed;