var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
// var TodoConstants = require('../constants/TodoConstants');
var assign = require('object-assign');

var _activeCompound = {};
var _compoundHistory = [];
var _errorMessage = '';

// ...private functions...
function addToHistory (formula, mass) {
  _compoundHistory.push({
    formula: formula,
    mass: mass
  });
}

var MolarMassStore = assign({}, EventEmitter.prototype, {
  getActiveCompound: function () {
    return _activeCompound;
  },

  getHistory: function () {
    return _compoundHistory;
  },

  getError: function () {
    return _errorMessage;
  }

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },
  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },
  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
});

AppDispatcher.register(function (action) {
  switch(action.actionType) {
    case Constants.ADD_TO_HISTORY:
    // case Constants.xxx: ... MolarMassStore.emitChange; break;
    default: // noop
  }
});
