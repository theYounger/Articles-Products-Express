'use strict';

function productsModel() {

  let inventory = new Array();

  return {
    getInv: () => {
      return inventory;
    },
    addItem: (item) => {
      inventory.push(item);
    },
    invNum: () => {
      return inventory.length;
    }
  };
}

module.exports = productsModel();