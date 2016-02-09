var React = require('react');

var InputSection = React.createClass({
  _onChange: function (event) {
    this.props.handleChange(this.refs.formulaInput.value);
  },

  render: function () {
    return (
      <div id="inputSection" className="pure-u-1-1">
        <form className="pure-form">
        <fieldset>
          <label htmlFor="formulaInput">Enter a chemical formula:</label>

          <input type="text" name="formulaInput" placeholder="Examples: H20, (NH4)2Cr2O7" ref="formulaInput" onChange={this._onChange}/>

          <button type="submit" className="pure-button"><i className="fa fa-rocket"></i> Sign In</button>
        </fieldset>
        </form>
      </div>
    );
  }
});

module.exports = InputSection
