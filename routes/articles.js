const express = require('express');
const bodyParser = require('body-parser');
const model = require('../db/articlesModel');
const midware = require('../lib/middleware');
const Router = express.Router();


/*==========================
==========MIDDLEWARE========*/
Router.use(bodyParser.json());
Router.use(bodyParser.urlencoded({ extended: true }));

Router.route('/')
  .post( midware.payloadCheck(['title', 'body', 'author'])), (req, res) => {

  }


module.exports = Router;