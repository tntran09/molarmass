var React = require('react');
var ActiveCompoundSection = require('./ActiveCompoundSection.React');
var HistorySection = require('./HistorySection.React');

var ResultsSection = React.createClass({
  render: function () {
    return (
      <div id="resultsSection" className="pure-g">
        <ActiveCompoundSection formula={this.props.formula} mass={this.props.mass} />
        <HistorySection history={this.props.history} />
      </div>
    );
  }
});

module.exports = ResultsSection;
