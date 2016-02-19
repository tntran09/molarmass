var React = require('react');
var MolarMassActions = require('../actions/MolarMassActions');

var InputSection = React.createClass({
  _onSubmit: function (event) {
    MolarMassActions.addCurrentCompoundToHistory();
    event.preventDefault();
  },

  _onFormulaChange: function (event) {
    MolarMassActions.update(this.refs.formulaInput.value);
  },

  render: function () {
    return (
      <div id="inputSection" className="pure-g">
        <div className="pure-u-1-24"></div>
        <div className="pure-u-22-24">
          <div className="pure-u-1-1 pure-u-sm-4-5">
            <form className="pure-form" onSubmit={this._onSubmit}>
              <fieldset>
                <input type="text" name="formulaInput" className="pure-u-1-1 pure-u-sm-20-24" placeholder="Enter a chemical formula..."
                  value={this.props.formula} ref="formulaInput" onChange={this._onFormulaChange} />
                <span> </span>
                <input type="submit" className="pure-button pure-u-1-1 pure-u-sm-2-24" value="+" />
              </fieldset>
            </form>
          </div>

          <div className="pure-u-1-1">
            <p className="formulaError" style={{color: 'red', height: '1em'}}>{this.props.errorMessage}</p>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = InputSection;
