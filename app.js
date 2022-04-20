const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);

const app = express();

const errorPageController = require('./controllers/404');
const User = require('./models/user');

app.set('view engine', 'ejs');
// app.set('views', 'views'); // A default setting for the template engine, you do not need it, if you already have a views folder.

const MONGODB_URI = "mongodb+srv://prince:node1234@cluster0.nihym.mongodb.net/shop?retryWrites=true&w=majority";

const store = new MongoDBStore({
    uri: MONGODB_URI,
    collection: 'mySessions'
});

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const authRoutes = require('./routes/auth');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public/assets')));
app.use(
    session({
        secret: 'my secret', 
        resave: false, 
        saveUninitialized: false,
        store: store
    })
);

app.use((req, res, next) => {
    User.findById('6258ca7b0fc7a1a12bcbeb6c')
    .then(user => {
        req.user = user;
        next();
    })
    .catch(err => console.log(err));
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);

app.use(errorPageController.getErrorPage);

mongoose
.connect(MONGODB_URI)
.then(result => {
    User.findOne().then(user => {
        if (!user) {
            const user = new User({
                name: 'Pablo',
                email: 'test@test.com',
                cart: {
                    items: []
                }
            });
            user.save();
        }
    })
    app.listen(3000)
})
.catch(err => {
    console.log(err);
})