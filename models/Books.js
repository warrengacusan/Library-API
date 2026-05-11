const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Book = sequelize.define('Book', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },

    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    
    genre: {
        type: DataTypes.STRING,
        allowNull: false
    },

    publicationYear: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    availabilityStatus: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
    authorId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Authors',
            key: 'id'
        }
    }

});
    
module.exports = Book;