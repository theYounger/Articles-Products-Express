
function productsModel() {
  const db = require('./dbindex');
  const memory = [];

  function addItem(req, res) {
   db.query("insert into products(name, price, inventory) values($1, $2, $3)", [req.body.name, req.body.price, req.body.inventory])
    .then(console.log)
    .catch(console.log);
  }

  function getAll() {
    return db.query("select * from products") /* where active=$1", [true]) */
    .then(function (data) {
      return data;
    })
    .catch(function (error) {
        // error;
    });
  }

  function editInv(req) {
    memory.forEach(function(ele, indie) {
      if(ele.id == req.params.id) {
        for (var key in ele) {
          ele[key] = req.body[key];
        }
      }
    });
  }

  function deleteInv(req) {
    memory.forEach(function(ele, indie, arrie) {
      if(ele.id == req.params.id) {
        arrie.splice(indie, 1);
      }
    });
  }

  function getIdItem(req) {
    return memory.filter(function(ele) {
      return ele.id == req.params.id;
    });
  }

  return {
    getAll,
    addItem,
    // (item) => {
    //   memory.push(item);
    // },
    invNum: () => {
      return memory.length;
    },
    editInv,
    deleteInv,
    getIdItem
  };
}

module.exports = productsModel();