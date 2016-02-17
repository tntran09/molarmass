var React = require('react');

var InputSection = React.createClass({
  _onChange: function (event) {
    this.props.handleChange(this.refs.formulaInput.value);
  },

  render: function () {
    return (
      <div id="inputSection" className="pure-g">
        <div className="pure-u-1-1 pure-u-sm-1-12"></div>
        <div className="pure-u-1-1 pure-u-sm-20-24">

          <div className="pure-u-1-1 pure-u-sm-3-4">
            <form className="pure-form">
              <fieldset>
                <input type="text" name="formulaInput" className="pure-u-1-1 pure-u-sm-20-24" placeholder="Enter a chemical formula..." ref="formulaInput" onChange={this._onChange} />
                <span> </span>
                <input type="submit" className="pure-button pure-u-1-1 pure-u-sm-2-24" value="+" />
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
