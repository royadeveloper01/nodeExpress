// const path = require('path');

const express = require('express');

const productsController = require('../controllers/products');

const router = express.Router();

// Admin/add-product => GET
router.get('/add-product', productsController.getAddProduct);

// Admin/add-product => POST
router.post('/add-product', productsController.postAddProduct);

module.exports = router;