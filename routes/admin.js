const express = require('express');
const { body } = require('express-validator');
 
const adminController = require('../controllers/admin');
const isAuth = require('../middleware/is-auth');

const router = express.Router();

// Admin/add-product => GET
router.get('/add-product', isAuth, adminController.getAddProduct);

// Admin/products => GET
router.get('/products', isAuth, adminController.getProducts);

// Admin/add-product => POST
router.post('/add-product', [
    body('title', 'product title is required')
        .isString()
        .isLength({ min: 3 })
        .trim(),
    body('imageUrl', 'image URL is required').isURL(),
    body('description', 'product description is required')
        .isString()
        .isLength({ min: 8, max: 400 })
        .trim(),
    body('price', 'price is required').isFloat()
], isAuth, adminController.postAddProduct);

router.get('/edit-product/:productId', isAuth, adminController.getEditProduct);

router.post('/edit-product', [
    body('title', 'product title is required')
        .isString()
        .isLength({ min: 3 })
        .trim(),
    body('imageUrl', 'image URL is required').isURL(),
    body('description', 'product description is required')
        .isString()
        .isLength({ min: 8, max: 400 })
        .trim(),
    body('price', 'price is required').isFloat()
], isAuth, adminController.postEditProduct);

router.post('/delete-product', isAuth, adminController.postDeleteProduct);

module.exports = router;