const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Member = sequelize.define('Member', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },

    firstName: {
        type: DataTypes.STRING,
        allowNull: false
    },

    lastName: {
        type: DataTypes.STRING,
        allowNull: false
    },

    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },

    membershipDate: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },

    booksBorrowed: {
        type: DataTypes.INTEGER,
        defaultValue: 0
        
    }
});

module.exports = Member;