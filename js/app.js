var React = require('react');
var ReactDOM = require('react-dom');
var molarmass = require('molarmass');

var MolarMassApp = require('./components/MolarMassApp.React');

//InputSection.React.js
var InputSection = React.createClass({
  _onChange: function (event) {
    this.props.handleChange(this.refs.formulaInput.value);
  },

  render: function () {
    return (
      <div id="inputSection">
        <form>
          <input type="text" placeholder="Examples: H20, (NH4)2Cr2O7" ref="formulaInput" onChange={this._onChange}/>
          <button type="submit">-&gt;</button>
        </form>
      </div>
    );
  }
});

//ResultsSection.React.js
var ResultsSection = React.createClass({
  render: function () {
    return (
      <div id="resultsSection">
        <ActiveCompoundSection formula={this.props.formula}/>
        <HistorySection />
      </div>
    );
  }
});

//ActiveCompoundSection.React.js
var ActiveCompoundSection = React.createClass({
  render: function () {
    var mass = 0.0;
    var formulaAsHTML = {
      __html: this.props.formula.replace(/[0-9]+/g, '<sub>$&</sub>')
    };

    try {
      mass = molarmass(this.props.formula);
    }
    catch (e) {

    }

    return (
      <div id="activeCompoundSection">
        <h1 className="chemicalText" dangerouslySetInnerHTML={formulaAsHTML}></h1>
        <p>Molar Mass: {mass}</p>


        <table></table>
      </div>
    );
  }
});

//
var HistorySection = React.createClass({
  render: function () {
    return (
      <table>
      </table>
    );
  }
});

ReactDOM.render(
  <MolarMassApp />,
  document.getElementById('appContainer')
);
