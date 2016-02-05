var React = require('react');

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

module.exports = ActiveCompoundSection;
