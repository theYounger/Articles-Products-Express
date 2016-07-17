const express = require('express');
const bodyParser = require('body-parser');
const model = require('../db/productsModel');
const midware = require('../lib/middleware');
const Router = express.Router();
const methodOverride = require('method-override');

/*==========================
==========MIDDLEWARE========*/
Router.use(bodyParser.json());
Router.use(bodyParser.urlencoded({ extended: true }));
Router.use(methodOverride(midware.postToPut));
/*==========================*/

Router.route('/')
  .post( midware.payloadCheck(['name','price','inventory']), (req, res) => {
    req.body.id = model.invNum();
    model.addItem(req.body);
    res.json( {success: true} );
  })
  .get( (req, res) => {
    res.render('./productTemplates/index', {
      products: model.getAll()
    });
  });

Router.route('/:id')
  /*----------  Find a way to make midware.idCheck work ----------*/
  .put( /*midware.idCheck(),*/ (req, res) => {
    model.editInv(req);
    res.json( {success: true} );
  })
  .delete( /*midware.idCheck(),*/ (req, res) => {
    model.deleteInv(req);
    res.json( {success: true} );
  });

Router.route('/new')
  .get( (req, res) => {
    res.render('./productTemplates/new');
  });

Router.route('/:id/edit')
  .get( (req, res) => {
    const modelItem = model.getIdItem(req)[0];
    res.render('./productTemplates/edit', {
      editName: modelItem.name,
      editPrice: modelItem.price,
      editInventory: modelItem.inventory,
      editId: modelItem.id
    });
  });

module.exports = Router;