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
  .post( midware.payloadCheck(['title', 'body', 'author']), (req, res) => {
    model.addItem(req.body);
    res.send( {success: true} );
  })
  .get( (req, res) => {
    res.send(model.getAll());
  });

Router.route('/:title')
  .put( (req, res) => {
    model.editArti(req);
    res.send( {success: true} );
  });



module.exports = Router;