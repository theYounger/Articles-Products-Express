'use strict';

const model = require('../db/productsModel');
const fs = require('fs');
const methodOverride = require('method-override');

function middleware () {

  function payloadCheck(keys) {
    return (req, res, next) => {
      const payloadValid = keys.every((ele) => {
        return req.body.hasOwnProperty(ele);
      });
      if(Object.keys(req.body).length !== keys.length || !payloadValid) {
        return res.status(400).json( {success: false} );
      }
      return next();
    };
  }

  function idCheck() {
    return (req, res, next) => {
      const idClear = model.getInv().some((ele) => {
        return ele.id == req.body.id;
      });
      if(!idClear) {
        return res.status(400).json( {success: false} );
      }
      return next();
    };
  }

  function analyticsTrack() {
    return (req, res, next) => {
      const date = new Date();
      const filename = `${date.getFullYear()}.${date.getMonth()}-${date.getDate()}.log`;
      const logline = `${req.method} -- ${req.path} -- ${date} \n`;

      fs.appendFile(`./logs/${filename}`, logline);
      return next();
    };
  }

  function postToPut() {
    return (req, res, next) => {
      if(req.body && typeof req.body === 'object' && '_method' in req.body) {
        const method = req.body._method;
        delete req.body_method;
        return method;
      }
      return next();
    };
  }
  return {
    payloadCheck,
    idCheck,
    analyticsTrack,
    postToPut
  };
}

module.exports = middleware();