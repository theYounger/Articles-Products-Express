'use strict';

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

  return {
    payloadCheck: payloadCheck,
  };

}

module.exports = middleware();