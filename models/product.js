const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const Product = sequelize.define('product', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    title: {
        type: Sequelize.STRING,
        allowNUll: false
    },
    imageUrl: {
        type: Sequelize.STRING,
        allowNUll: false
    },
    description: {
        type: Sequelize.STRING,
        allowNUll: false
    },
    price: {
        type: Sequelize.DOUBLE,
        allowNUll: false
    }
});

module.exports = Product;