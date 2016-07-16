const express = require('express');
const bodyParser = require('body-parser');
const model = require('../db/productsModel');
const midware = require('../lib/middleware');
const Router = express.Router();


/*==========================
==========MIDDLEWARE========*/
Router.use(bodyParser.json());
Router.use(bodyParser.urlencoded({ extended: true }));
/*==========================*/

Router.route('/')
  .post( midware.payloadCheck(['name','price','inventory']), (req, res) => {
    req.body.id = model.invNum();
    model.addItem(req.body);
    res.json( {success: true} );
  })
  .get( (req, res) => {
    res.send(model.getAll());
  });

Router.route('/:id')
  .put( midware.idCheck(), (req, res) => {
    model.editInv(req);
    res.json( {success: true} );
  })
  .delete( midware.idCheck(), (req, res) => {
    model.deleteInv(req);
    res.json( {success: true} );
  });

module.exports = Router;