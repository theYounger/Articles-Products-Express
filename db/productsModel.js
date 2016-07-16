
function productsModel() {

  const memory = [];

  function _editInv(req) {
    memory.forEach(function(ele, indie) {
      if(ele.id == req.params.id) {
        for (var key in ele) {
          ele[key] = req.body[key];
        }
      }
    });
  }

  function _deleteInv(req) {
    memory.forEach(function(ele, indie, arrie) {
      if(ele.id == req.params.id) {
        arrie.splice(indie, 1);
      }
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
    editInv: _editInv,
    deleteInv: _deleteInv
  };
}

module.exports = productsModel();