var AppDispatcher = require('../dispatchers/AppDispatcher');
var Constants = require('../constants/Constants');

var MolarMassActions = {
  addToHistory: function (formula, mass) {
    AppDispatcher.dispatch({
      actionType: Constants.ADD_TO_HISTORY,
      formula: formula,
      mass: mass
    })
  },

  update: function (formula) {
    AppDispatcher.dispatch({
      actionType: Constants.UPDATE_FORMULA,
      formula: formula
    });
  }
};

module.exports = MolarMassActions;
