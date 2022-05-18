const express = require('express');
const { body } = require('express-validator');

const router = express.Router();

const authController = require('../controllers/auth');
const User = require('../models/user');

router.get('/login', authController.getLogin);

router.get('/signup', authController.getSignup);

router.post(
    '/login',
    [
        body('email')
        .isEmail()
        .withMessage('Enter a valid email')
        .normalizeEmail(),
        body('password', 'enter a valid password')
        .isLength({ min: 5 })
        .isAlphanumeric()
        .trim()
    ], 
    authController.postLogin);

router.post(
    '/signup',
    [ 
        body('email')
        .isEmail()
        .withMessage('Please enter a valid email!')
        .custom((value, { req }) => {
            /* To Check if a particular email exists */
            // if (value === 'test@test.com') {
            //     throw new Error('This is not a valid email.');
            // }
            // return true;
            return User.findOne({email: value})
            .then(userDoc => {
                if(userDoc) {
                    return Promise.reject('Email exists already');
                }
            });
        }),
        body(
            'password',
            'Please enter alphanumeric password at least 5 characters long')
            .isLength({ min: 5 })
            .isAlphanumeric(),
        body('confirmPassword').custom((value, { req }) => {
            if (value !== req.body.password) {
                throw new Error('Password did not match!')
            }
            return true;
        })
    ],
    authController.postSignup
);

router.get('/reset-password', authController.getResetPassword);

router.post('/reset-password', authController.postResetPassword);

router.get('/reset-password/:token', authController.getNewPassword);

router.post('/update-password', authController.postNewPassword);

router.post('/logout', authController.postLogout);

module.exports = router;