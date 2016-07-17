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
Router.use(methodOverride( (req, res) => {
  if(req.body && typeof req.body === 'object' && '_method' in req.body) {
    const method = req.body._method;
    delete req.body_method;
    return method;
  }
}));
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
  .put( /*midware.idCheck(),*/ (req, res) => {
    model.editInv(req);
    res.json( {success: true} );
  })
  .delete( midware.idCheck(), (req, res) => {
    model.deleteInv(req);
    res.json( {success: true} );
  });

Router.route('/new')
  .get( (req, res) => {
    res.render('./productTemplates/new');
  });

Router.route('/:id/edit')
  .get( (req, res) => {
    res.render('./productTemplates/edit', {
      editName: model.getIdItem(req)[0].name,
      editPrice: model.getIdItem(req)[0].price,
      editInventory: model.getIdItem(req)[0].inventory,
      editId: model.getIdItem(req)[0].id
    });
  });

module.exports = Router;