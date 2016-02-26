var AppDispatcher = require('../dispatchers/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var Constants = require('../constants/Constants');
var assign = require('object-assign');
var molarmass = require('molarmass');

var CHANGE_EVENT = 'change';
var EMPTY_COMPOUND = molarmass('', { returnCompound: true });

var _formulaInput = '';
var _activeCompound = EMPTY_COMPOUND;
var _compoundHistory = [];
var _errorMessage = '';

function addToHistory () {
  if (_activeCompound.molarMass > 0) {
    _compoundHistory.push({
      formula: _activeCompound.formula,
      mass: _activeCompound.molarMass
    });

    _formulaInput = '';
    _activeCompound = EMPTY_COMPOUND;
    _errorMessage = '';
  }
}

function update (formula) {
  _activeCompound = EMPTY_COMPOUND
  _formulaInput = formula;

  try {
    _activeCompound = molarmass(formula, { returnCompound: true });
    _errorMessage = '';
  }
  catch (e) {
    _errorMessage = e.message;
  }
}

var MolarMassStore = assign({}, EventEmitter.prototype, {
  getFormulaInputValue: function () {
    return _formulaInput;
  },

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
      addToHistory();
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
