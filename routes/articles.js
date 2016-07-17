const express = require('express');
const bodyParser = require('body-parser');
const model = require('../db/articlesModel');
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
  .post( midware.payloadCheck(['title', 'body', 'author']), (req, res) => {
    model.addItem(req.body);
    res.send( {success: true} );
  })
  .get( (req, res) => {
    res.render('./articleTemplates/index', {
      articles: model.getAll()
    });
  });

Router.route('/:title')
  .put( (req, res) => {
    model.editArti(req);
    res.send( {success: true} );
  })
  .delete( (req, res) => {
    model.deleteArti(req);
    res.send( {success: true} );
  });

Router.route('/new')
  .get( (req, res) => {
    res.render('./articleTemplates/new');
  });

Router.route('/:title/edit')

  .get( (req, res) => {
    const modelItem = model.getIdItem(req)[0];
    res.render('./articleTemplates/edit', {
      editTitle: modelItem.title,
      editAuthor: modelItem.author,
      editBody: modelItem.body,
      editTitleEncoded: encodeURI(modelItem.title)
    });
  });



module.exports = Router;