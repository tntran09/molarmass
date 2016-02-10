var React = require('react');

var HeaderSection = React.createClass({
  render: function () {
    return (
      <div id="headerSection" className="pure-g">
        <div className="pure-u-1-24"></div>
        <div className="pure-u-23-24">
          <h1>Molar Mass</h1>
        </div>
      </div>
    );
  }
});

module.exports = HeaderSection;
