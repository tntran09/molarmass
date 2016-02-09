var React = require('react');
var InputSection = require('./InputSection.React');
var ResultsSection = require('./ResultsSection.React');

var MolarMassApp = React.createClass({
  getInitialState: function () {
    return {
      formula: '',
      history: []
    }
  },

  _handleChange: function (formula) {
    this.setState({
      formula: formula
    });
  },

  render: function () {
    return (
      <div id="molarMassApp" className="pure-u">
        <InputSection formula={this.state.formula} handleChange={this._handleChange} />
        <ResultsSection formula={this.state.formula} />
      </div>
    );
  }
});

module.exports = MolarMassApp;
