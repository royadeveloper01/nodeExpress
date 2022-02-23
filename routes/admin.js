const express = require('express');

const adminController = require('../controllers/admin');

const router = express.Router();

// Admin/add-product => GET
router.get('/add-product', adminController.getAddProduct);

// Admin/products => GET
router.get('/products', adminController.getProducts);

// Admin/add-product => POST
router.post('/add-product', adminController.postAddProduct);

module.exports = router;