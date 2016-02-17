var React = require('react');
var molarmass = require('molarmass');
var HeaderSection = require('./HeaderSection.React');
var InputSection = require('./InputSection.React');
var ResultsSection = require('./ResultsSection.React');

var MolarMassApp = React.createClass({
  getInitialState: function () {
    return {
      formula: '',
      history: [],
      mass: 0.0
    }
  },

  _handleChange: function (formula) {
    var mass = this._parse(formula);

    this.setState({
      formula: formula,
      mass: mass
    });
  },

  _parse: function (formula) {
    var mass = 0.0;

    try {
      mass = molarmass(formula);
      this.setState({
        errorMessage: ''
      });
    }
    catch (e) {
      this.setState({
        errorMessage: e.message
      });
    }

    return mass;
  },

  render: function () {
    return (
      <div id="molarMassApp">
        <HeaderSection />
        <InputSection formula={this.state.formula} errorMessage={this.state.errorMessage} handleChange={this._handleChange} />
        <ResultsSection formula={this.state.formula} mass={this.state.mass} />
      </div>
    );
  }
});

module.exports = MolarMassApp;
