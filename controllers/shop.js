const Product = require('../models/product');

exports.getProducts = (req, res, next) => {
    Product.fecthAll(products => {
        res.render('shop/product-list', {
            prods: products, 
            pageTitle: 'Pablo Bay', 
            path: '/products'
        });
    });
};

exports.getIndex = (req, res, next) => {
    Product.fecthAll(products => {
        res.render('shop/index', {
            prods: products, 
            pageTitle: 'Pablo Bay', 
            path: '/'
        });
    });
};

exports.getCart = (req, res, next) => {
    res.render('shop/cart', {
        path: '/cart',
        pageTitle: 'You Cart'
    });
}

exports.getCheckout = (req, res, next) => {
    res.render('shop/checkout', {
        path: '/checkout',
        pageTitle: 'Checkout'
    });
}