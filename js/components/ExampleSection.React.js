var React = require('react');
var MolarMassActions = require('../actions/MolarMassActions');

var ExampleSection = React.createClass({
  getInitialState: function () {
    return {
      examples: [
        'NH4[Cr(SCN)4(NH3)2]',
        '(CH_3)_2CHOH',
        'Na+',
        'Cl-',
        'CH3(CH2)10C(=O)NH(CH2)3[N+](CH3)(CH3)CH2C([O-])=O',
        'C12H22O11',
        'H(CO)(CHOH)5H',
        'Cr2O7',
        'Ca(OH)2',
        'Mg3(PO4)2',
        'CH3CH2C(=O)OH',
        'AlAsO4.(H2O)8'
      ]
    };
  },

  componentWillReceiveProps: function (nextProps) {
    if (this.props.hideSection && !nextProps.hideSection) {
      var a = this.state.examples;
      var b = [];
      while(a.length > 0) {
        b.push(a.splice(Math.floor(Math.random() * a.length), 1));
      }
      
      this.setState({
        examples: b
      });
    }
  },

  _autoFillInput: function (event) {
    MolarMassActions.update(event.target.innerText);
  },

  _buildTableRow: function (index, formula) {
    return (
      <tr key={index}><td onClick={this._autoFillInput}>{formula}</td></tr>
    );
  },

  _buildTableBody: function () {
    var top3 = this.state.examples.slice(0, 3);
    var rows = [];
    for(var i = 0; i < 3; i++) {
      rows.push(this._buildTableRow(i, top3[i]));
    }
    return rows;
  },

  render: function () {
    var tbody = this._buildTableBody();

    return (
      <div id="exampleSection" className="pure-u-1-1" hidden={this.props.hideSection} style={{textAlign: 'center'}}>
        <div className="pure-u-1-8"></div>
        <table className="pure-table pure-table-horizontal pure-u-18-24" style={{textAlign: 'center'}}>
          <thead>
            <tr>
              <th style={{textAlign: 'center'}}>Try an example!</th>
            </tr>
          </thead>
          <tbody>
            {tbody}
          </tbody>
        </table>
        <div className="pure-u-1-8"></div>
      </div>
    );
  }
});

module.exports = ExampleSection;
