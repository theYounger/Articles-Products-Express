const express = require('express');
const bodyParser = require('body-parser');
const model = require('../db/productsModel');
const Router = express.Router();


/*==========================
==========MIDDLEWARE========*/
Router.use(bodyParser.json());
Router.use(bodyParser.urlencoded({ extended: true }));
/*==========================*/

Router.route('/')
  .post((req, res) => {

  });

module.exports = Router;