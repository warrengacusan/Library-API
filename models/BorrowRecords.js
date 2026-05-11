const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const BorrowRecord = sequelize.define('BorrowRecord', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },

    bookId:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Books',
            key: 'id'
            
        }
    },

    memberId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Members',
            key: 'id'
        }
    },

    borrowDate: {
        type: DataTypes.DATE
    },

    returnDate: {
        type: DataTypes.DATE
    }
});

module.exports = BorrowRecord