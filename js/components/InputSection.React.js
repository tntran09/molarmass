var React = require('react');

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

module.exports = InputSection
