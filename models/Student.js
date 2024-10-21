const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Student extends Model { }

Student.init(
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: 2
            }
        },
        birth_date: {
            type: DataTypes.DATE,
            allowNull: true
        },
        grade: {
            type: DataTypes.STRING,
            allowNull: false
        },
        bus_number: {
            type: DataTypes.STRING
        },
        notes: {
            type: DataTypes.TEXT
        },
        special_ed_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'special_ed',
                key: 'id'
            },
            allowNull: true,
        }
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'student'
    }

)


module.exports = Student;