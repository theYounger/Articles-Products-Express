'use strict';

const model = require('../db/productsModel');

function middleware () {

  function __payloadCheck(keys) {
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

  function __idCheck() {
    return (req, res, next) => {
      const idClear = model.getInv().some((ele) => {
        return ele.id == req.body.id;
      });
      console.log('idClear ' , idClear);
      if(!idClear) {
        return res.status(400).json( {success: false} );
      }
      return next();
    };
  }

  return {
    payloadCheck: __payloadCheck,
    idCheck: __idCheck
  };

}

module.exports = middleware();