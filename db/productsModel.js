
function productsModel() {

  const memory = [];

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
    getAll: () => {
      return memory;
    },
    addItem: (item) => {
      memory.push(item);
    },
    invNum: () => {
      return memory.length;
    },
    editInv,
    deleteInv,
    getIdItem
  };
}

module.exports = productsModel();