'use strict';

const express = require('express');
const app = express();
const articlesModel = require('./db/articlesModel');
const productsModel = require('./db/productsModel');
const midware = require('./lib/middleware')

/*================
======ROUTES======*/
const articles = require('./routes/articles');
const products = require('./routes/products');
/*================*/

/*====================
======MIDDLEWARE======*/
app.use('/articles', articles);
app.use('/products', products);
/*====================*/

app.put('/products/:id', midware.idCheck(), (req, res) => {
  productsModel.getInv().forEach(function(ele, indie) {
    if(ele.id == req.params.id) {
      productsModel.editInv(indie, function(arg) {
        for (var key in arg) {
          arg[key] = req.body[key];
        }
      });
    }
  });
  res.json( {success: true} );
});

var server = app.listen(3000, () => {
  var host = 'localhost';
  var port = server.address().port;

  console.log(`Articles-Product server listening at http://${host}:`,`${port}`);
});