var AppDispatcher = require('../dispatcher/AppDispatcher');
// var TodoConstants = require('../constants/TodoConstants');

var MolarMassActions = {
  addToHistory: function (formula, mass) {
    AppDispatcher.dispatch({
      actionType: Constants.ADD_TO_HISTORY,
      formula: formula,
      mass: mass
    })
  }
};

module.exports = MolarMassActions;
