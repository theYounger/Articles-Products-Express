'use strict';

const express = require('express');
const app = express();
const articlesModel = require('./db/articlesModel');
const productsModel = require('./db/productsModel');

/*==========================
==========JADE SET==========*/
app.set('view engine', 'jade');
app.set('views', './templates');
/*============================*/

/*==========================
===========ROUTES===========*/
const articles = require('./routes/articles');
const products = require('./routes/products');
/*==========================*/

/*==========================
==========MIDDLEWARE=========*/
app.use('/articles', articles);
app.use('/products', products);
/*==========================*/

//APP WIDE MIDDLEWARE THAT PERFORMS LOG
///////////////////////////////////////

var server = app.listen(3000, () => {
  var host = 'localhost';
  var port = server.address().port;

  console.log(`Articles-Product server listening at http://${host}:`,`${port}`);
});