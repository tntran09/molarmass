var React = require('react');

var ActiveCompoundSection = React.createClass({
  _buildElementTableRow: function (key, elementItem) {
    var subtotal = elementItem.element.mass * elementItem.quantity;
    subtotal = Math.round(subtotal * 1000000) / 1000000

    return (
      <tr key={key}>
        <td>{elementItem.element.symbol}</td>
        <td>{elementItem.element.mass}</td>
        <td>{elementItem.quantity}</td>
        <td>{subtotal}</td>
      </tr>
    );
  },

  _buildElementTableBody: function (compound) {
    var rows = [];
    var formulaAsHTML = {
      __html: compound.formula.replace(/[0-9]+/g, '<sub>$&</sub>').replace(/[\+\-]+/g, '<sup>$&</sup>')
    };

    var showAllElements = compound.elements.length > 1 || compound.elements.some(function (item) {
      return item.quantity > 1;
    });

    if (showAllElements) {
      for(var key in compound.elements) {
        var item = compound.elements[key];
        rows.push(this._buildElementTableRow(key, item));
      }
    }

    rows.push(
      <tr key={compound.elements.length}>
        <td><b dangerouslySetInnerHTML={formulaAsHTML}></b></td>
        <td>{compound.molarMass}</td>
        <td>1</td>
        <td>{compound.molarMass}</td>
      </tr>
    );

    return rows;
  },

  render: function () {
    var formulaAsHTML = {
      __html: this.props.compound.formula.replace(/[0-9]+/g, '<sub>$&</sub>').replace(/[\+\-]+/g, '<sup>$&</sup>')
    };

    var tbody = this._buildElementTableBody(this.props.compound);

    return (
      <div id="activeCompoundSection" className="pure-u-1-1 pure-u-md-3-5">
        <div className="pure-u-1-24"></div>
        <div className="pure-u-22-24" hidden={this.props.compound.formula.length == 0}>
          <h2 className="chemicalText pure-u-1-1 hidden" style={{height: '1em'}} dangerouslySetInnerHTML={formulaAsHTML}></h2>
          <p className="pure-u-1-1 hidden">Molar Mass: {this.props.compound.molarMass}</p>

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
              {tbody}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
});

module.exports = ActiveCompoundSection;
