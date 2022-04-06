const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const errorPageController = require('./controllers/404');
const mongoConnect = require('./util/database').mongoConnect;

app.set('view engine', 'ejs');
// app.set('views', 'views'); // A default setting for the template engine, you do not need it, if you already have a views folder.

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
// const MongoClient = require('./util/database');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public/assets')));

app.use((req, res, next) => {
    // User.findByPk(1)
    // .then(user => {
    //     req.user = user;
    //     next();
    // })
    // .catch(err => console.log(err));
    next();
});

app.use('/admin', adminRoutes);
app.use(shopRoutes); 

app.use(errorPageController.getErrorPage);

// mongoConnect(() => {
//     console.log(client);
//     app.listen(3000);
// });

mongoConnect(() => {
    app.listen(3000);
})