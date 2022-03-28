const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const errorPageController = require('./controllers/404');

app.set('view engine', 'ejs');
// app.set('views', 'views'); // A default setting for the templating engine, you do not need it, if you already have a views folder.

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const sequelize = require('./util/database');
const Product = require('./models/product');
const User = require('./models/user');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public/assets')));

app.use((req, res, next) => {
    User.findByPk(1)
    .then(user => {
        req.user = user;
        next();
    })
    .catch(err => console.log(err));
})

app.use('/admin', adminRoutes);
app.use(shopRoutes); 

app.use(errorPageController.getErrorPage);

Product.belongsTo(User, {constraints: true, onDelete: 'CASCADE'});
User.hasMany(Product);

sequelize
// .sync({force: true}) // To overwrite your table
.sync()
.then(result => {
    return User.findByPk(1);
    // console.log(result);
})
.then(user => {
    if (!user) {
        return User.create({ name: 'Max', email: 'test@test.com' });
    }
    return user;
})
.then(user => {
    // console.log(user);
    app.listen(3000);
})
.catch(err => {
    console.log(err)
});