var React = require('react');

var HeaderSection = React.createClass({
  render: function () {
    return (
      <div id="headerSection" className="pure-g">
        <div className="pure-u-1-12"></div>
        <div className="pure-u-11-12">
          <h1>Molar Mass</h1>
        </div>
      </div>
    );
  }
});

module.exports = HeaderSection;
