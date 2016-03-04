var React = require('react');
var ActiveCompoundSection = require('./ActiveCompoundSection.React');
var HistorySection = require('./HistorySection.React');

var ResultsSection = React.createClass({
  render: function () {
    return (
      <div id="resultsSection">
        <ActiveCompoundSection compound={this.props.compound} />
        <HistorySection history={this.props.history} />
      </div>
    );
  }
});

module.exports = ResultsSection;
