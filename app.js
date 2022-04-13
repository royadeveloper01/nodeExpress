const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const errorPageController = require('./controllers/404');
const mongoConnect = require('./util/database').mongoConnect;
const User = require('./models/user');

app.set('view engine', 'ejs');
// app.set('views', 'views'); // A default setting for the template engine, you do not need it, if you already have a views folder.

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public/assets')));

app.use((req, res, next) => {
    User.findById('624f4f420b0c36391f6add0e')
    .then(user => {
        req.user = new User(user.name, user.email, user.cart, user._id);
        next();
    })
    .catch(err => console.log(err));
});

app.use('/admin', adminRoutes);
app.use(shopRoutes); 

app.use(errorPageController.getErrorPage);

mongoConnect(() => {
    app.listen(3000);
})