var React = require('react');
var MolarMassActions = require('../actions/MolarMassActions');

var InputSection = React.createClass({
  // TODO: change name
  _handleSubmitButtonClick: function() {
    MolarMassActions.addToHistory(this.state.formula, this.state.mass);
  },

  _onSubmit: function (event) {
    event.preventDefault();
  },

  _onFormulaChange: function (event) {
    MolarMassActions.update(this.refs.formulaInput.value);
  },

  render: function () {
    return (
      <div id="inputSection" className="pure-g">
        <div className="pure-u-1-1 pure-u-sm-1-12"></div>
        <div className="pure-u-1-1 pure-u-sm-20-24">

          <div className="pure-u-1-1 pure-u-sm-3-4">
            <form className="pure-form" onSubmit={this._onSubmit}>
              <fieldset>
                <input type="text" name="formulaInput" className="pure-u-1-1 pure-u-sm-20-24" placeholder="Enter a chemical formula..." ref="formulaInput" onChange={this._onFormulaChange} />
                <span> </span>
                <input type="submit" className="pure-button pure-u-1-1 pure-u-sm-2-24" value="+" onClick={this._handleSubmitButtonClick} />
              </fieldset>
            </form>
          </div>

          <div className="pure-u-1-1 pure-u-sm-1-4">
            <p className="formulaError" style={{color: 'red'}}>{this.props.errorMessage}</p>
          </div>
        </div>

      </div>
    );
  }
});

module.exports = InputSection;
