var React = require('react');

var HeaderSection = React.createClass({
  render: function () {
    return (
      <div id="headerSection" className="pure-g">
        <div className="pure-u-1-1">
          <h2>Molar Mass</h2>
          <h5>Calculate molar mass of a compound from its chemical formula</h5>
        </div>
      </div>
    );
  }
});

module.exports = HeaderSection;
