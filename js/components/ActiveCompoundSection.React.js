var React = require('react');
var molarmass = require('molarmass');

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
      // leave mass as 0, display error
    }

    return (
      <div id="activeCompoundSection" className="pure-u-1-2">
        <div className="pure-u-1-24"></div>
        <div className="pure-u-23-24">
          <h1 className="chemicalText" dangerouslySetInnerHTML={formulaAsHTML}></h1>
          <p>Molar Mass: {mass}</p>

          <table className="pure-table">
            <thead>
              <tr>
                <th>Element</th>
                <th>Molar Mass</th>
                <th>Quantity</th>
                <th>Total Mass</th>
              </tr>
            </thead>
            <tbody>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
});

module.exports = ActiveCompoundSection;
