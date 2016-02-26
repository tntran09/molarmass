var React = require('react');
var MolarMassStore = require('../stores/MolarMassStore');
var HeaderSection = require('./HeaderSection.React');
var InputSection = require('./InputSection.React');
var ResultsSection = require('./ResultsSection.React');

function getAppState() {
  return {
    formula: MolarMassStore.getFormulaInputValue(),
    compound: MolarMassStore.getActiveCompound(),
    history: MolarMassStore.getHistory(),
    errorMessage: MolarMassStore.getError()
  };
}

var MolarMassApp = React.createClass({
  getInitialState: function () {
    return getAppState();
  },

  componentDidMount: function() {
    MolarMassStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    MolarMassStore.removeChangeListener(this._onChange);
  },

  _onChange: function() {
    this.setState(getAppState());
  },

  render: function () {
    return (
      <div id="molarMassApp">
        <HeaderSection />
        <InputSection formula={this.state.formula} errorMessage={this.state.errorMessage} />
        <ResultsSection compound={this.state.compound} history={this.state.history} />
      </div>
    );
  }
});

module.exports = MolarMassApp;
