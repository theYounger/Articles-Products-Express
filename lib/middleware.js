'use strict';

const model = require('../db/productsModel');
const fs = require('fs');

function middleware () {

  function _payloadCheck(keys) {
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

  function _idCheck() {
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

  function _analyticsTrack() {
    return (req, res, next) => {
      const date = new Date();
      const filename = `${date.getFullYear()}.${date.getMonth()}-${date.getDate()}.log`;
      const logline = `${req.method} -- ${req.path} -- ${date} \n`;

      fs.appendFile(`./logs/${filename}`, logline);
      return next();
    };
  }

  return {
    payloadCheck: _payloadCheck,
    idCheck: _idCheck,
    analyticsTrack: _analyticsTrack
  };

}

module.exports = middleware();