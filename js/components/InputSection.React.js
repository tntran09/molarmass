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

  _clear: function (event) {
    MolarMassActions.update('');
  },

  render: function () {
    return (
      <div id="inputSection">
          <div className="pure-u-1-1">
            <form className="pure-form" onSubmit={this._onSubmit}>
              <fieldset>
                <div className="pure-u-1-1">
                  <input type="text" name="formulaInput" className="pure-u-1-1" placeholder="Enter a chemical formula..."
                    value={this.props.formula} ref="formulaInput" onChange={this._onFormulaChange} />
                </div>

                <div className="pure-u-1-1" style={{height: '.5em'}}></div>

                <div className="buttonRow pure-u-1-1" style={{fontSize: '80%'}}>
                  <button type="button" className="pure-button pure-u-1-1 pure-u-sm-7-24" onClick={this._clear}>Clear</button>
                  <div className="pure-u-10-24"></div>

                  <input type="submit" className="pure-button pure-u-1-1 pure-u-sm-7-24" disabled={this.props.disableAdd} value="Save" />
                </div>
              </fieldset>
            </form>
          </div>

          <div className="pure-u-1-1">
            <p className="formulaError" style={{color: 'red', height: '1em'}}>{this.props.errorMessage}</p>
          </div>

      </div>
    );
  }
});

module.exports = InputSection;
