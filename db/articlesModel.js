function articlesModel() {

  const memory = [];

  function _addItem(item) {
    item.urlTitle = encodeURI(item.title);

  }
  return{
    getAll: () => {
      return memory;
    },
    addItem:
  }

}

module.exports = articlesModel();