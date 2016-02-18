var AppDispatcher = require('../dispatchers/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var Constants = require('../constants/Constants');
var assign = require('object-assign');
var molarmass = require('molarmass');

var CHANGE_EVENT = 'change';

var _activeCompound = {};
var _compoundHistory = [];
var _errorMessage = '';

// ...private functions...
function addToHistory (formula, mass) {
  _compoundHistory.push({
    formula: formula,
    mass: mass
  });

  _activeCompound = {
    formula: '',
    mass: 0.0
  };
  _errorMessage = '';
}

function update (formula) {
  _activeCompound.formula = formula;
  _activeCompound.mass = 0.0;

  try {
    _activeCompound.mass = molarmass(formula);
    _errorMessage = '';
  }
  catch (e) {
    _errorMessage = e.message;
  }
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
  },

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
      addToHistory(action.formula, action.mass)
      MolarMassStore.emitChange();
      break;
    case Constants.UPDATE_FORMULA:
      update(action.formula);
      MolarMassStore.emitChange();
      break;
    default: // noop
  }
});

module.exports = MolarMassStore;
