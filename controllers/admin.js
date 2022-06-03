const { validationResult } = require('express-validator');
const { file } = require('pdfkit');

const Product = require('../models/product');

const fileHelper = require('../util/file');

exports.getAddProduct = (req, res, next) => {
    res.render('admin/edit-product', {
        pageTitle: 'Add Product', 
        path: '/admin/add-product',
        editing: false,
        hasError: false,
        errorMessage: null,
        validationErrors: []
    });
};

exports.postAddProduct = (req, res, next) => {
    const title = req.body.title;
    const image = req.file;
    const description = req.body.description;
    const price = req.body.price;
    if (!image) {
        return res.status(422).render('admin/edit-product', {
            pageTitle: 'Add Product', 
            path: '/admin/edit-product',
            editing: false,
            hasError: true,
            product: {
                title: title,
                description: description,
                price: price
            },
            errorMessage: 'image is not attached',
            validationErrors: []
        });
    }
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).render('admin/edit-product', {
            pageTitle: 'Add Product', 
            path: '/admin/edit-product',
            editing: false,
            hasError: true,
            product: {
                title: title,
                description: description,
                price: price
            },
            errorMessage: errors.array()[0].msg,
            validationErrors: errors.array()
        });
    }

    const imageUrl = image.path;

    const product = new Product({
        title: title, 
        imageUrl: imageUrl, 
        description: description,
        price: price,
        userId: req.user
    });
    product
    .save()
    .then(() => {
        req.flash('success', 'New Product Added!!!');
        res.redirect('/admin/products');
    }).catch(err => {
        console.log(err)
    });
};

exports.getEditProduct = (req, res, next) => {
    const editMode = req.query.edit;
    if (!editMode) {
        return res.redirect('/');
    }
    const prodId = req.params.productId;
    Product.findById(prodId)
    .then(product => {
        if (!product) {
            return res.redirect('/');
        }
        res.render('admin/edit-product', {
            pageTitle: 'Edit Product', 
            path: '/admin/edit-product',
            editing: editMode,
            product: product,
            hasError: false,
            errorMessage: null,
            validationErrors: []
        });
    }).catch(err => console.log(err));
}

exports.postEditProduct = (req, res, next) => {
    const prodId = req.body.productId;
    const updatedTitle = req.body.title;
    const image = req.file;
    const updatedDescription = req.body.description;
    const updatedPrice = req.body.price;
    const updatedDate = Date.now();
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).render('admin/edit-product', {
            pageTitle: 'Edit Product', 
            path: '/admin/edit-product',
            editing: true,
            hasError: true,
            product: {
                _id: prodId,
                title: updatedTitle,
                description: updatedDescription,
                price: updatedPrice
            },
            errorMessage: errors.array()[0].msg,
            validationErrors: errors.array()
        });
    }

    Product.findById(prodId)
    .then(product => {
        if (product.userId.toString() !== req.user._id.toString()) {
            return res.redirect('/');
        }
        product.title = updatedTitle;
        if (image) {
            fileHelper.deleteFile(product.imageUrl);
            product.imageUrl = image.path;
        } 
        product.description = updatedDescription; 
        product.price = updatedPrice;
        product.date = updatedDate;
        return product.save();
    })
    .then(result => {
        res.redirect('/admin/products');
    })
    .catch(err => console.log(err));
};

exports.getProducts = (req, res, next) => {
    Product.find({ userId: req.user._id }) 
    .then(products => {
        let message = req.flash('success');
        if (message.length > 0) {
            message = message[0];
        } else {
            message = null;
        }
        res.render('admin/products', {
            prods: products, 
            pageTitle: 'Admin Products', 
            path: '/admin/products',
            successMessage: message
        });  
    })
    .catch(err => console.log(err));
}

exports.postDeleteProduct = (req, res, next) => {
    const prodId = req.body.productId;
    Product.findById(prodId)
        .then(product => {
            if (!product) {
                return next(new Error('Product not found.'));
            }
            fileHelper.deleteFile(product.imageUrl);
            return Product.deleteOne({ userId: req.user._id, _id: prodId })
        })
        .then(() => {
            res.redirect('/admin/products');
        }).catch(err => console.log(err));
};