function articlesModel() {

  const memory = [];

  function _addItem(item) {
    item.urlTitle = encodeURI(item.title);
    memory.push(item);
  }

  function _editArti(req) {
    memory.forEach(function(ele) {
      if(ele.title == req.params.title) {
        for (var key in ele) {
          ele[key] = req.body[key];
        }
      }
    });
  }

  function _deleteArti(req) {
    memory.forEach(function(ele, indie, arrie) {
      if(ele.title == req.params.title) {
        arrie.splice(indie, 1);
      }
    });
  }

  return {
    getAll: () => {
      return memory;
    },
    addItem: _addItem,
    editArti: _editArti,
    deleteArti: _deleteArti
  };

}

module.exports = articlesModel();