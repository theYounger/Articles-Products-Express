function articlesModel() {

  const memory = [];

  function addItem(item) {
    item.urlTitle = encodeURI(item.title);
    memory.push(item);
  }

  function editArti(req) {
    memory.forEach(function(ele) {
      if(ele.title == req.params.title) {
        for (var key in ele) {
          ele[key] = req.body[key];
        }
      }
    });
  }

  function deleteArti(req) {
    memory.forEach(function(ele, indie, arrie) {
      if(ele.title == req.params.title) {
        arrie.splice(indie, 1);
      }
    });
  }

  function getIdItem(req) {
    return memory.filter(function(ele) {
      return ele.title == req.params.title;
    });
  }

  return {
    getAll: () => {
      return memory;
    },
    addItem,
    editArti,
    deleteArti,
    getIdItem
  };

}

module.exports = articlesModel();