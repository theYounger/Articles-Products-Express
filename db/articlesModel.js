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

  return {
    getAll: () => {
      return memory;
    },
    addItem: _addItem,
    editArti: _editArti
  };

}

module.exports = articlesModel();