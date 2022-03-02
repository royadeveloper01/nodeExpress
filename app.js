const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const errorPageController = require('./controllers/404');

app.set('view engine', 'ejs');
// app.set('views', 'views'); // A default setting for the templating engine, you do not need it, if you already have a views folder.

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public/assets')));
// console.log(path.resolve(__dirname, './'));

app.use('/admin', adminRoutes);
app.use(shopRoutes); 

app.use(errorPageController.getErrorPage);

app.listen(3000);