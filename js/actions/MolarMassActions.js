var AppDispatcher = require('../dispatchers/AppDispatcher');
var Constants = require('../constants/Constants');

var MolarMassActions = {
  addCurrentCompoundToHistory: function () {
    AppDispatcher.dispatch({
      actionType: Constants.ADD_TO_HISTORY
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
