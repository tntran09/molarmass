var React = require('react');
var ActiveCompoundSection = require('./ActiveCompoundSection.React');
var ExampleSection = require('./ExampleSection.React');
var HistorySection = require('./HistorySection.React');

var ResultsSection = React.createClass({
  render: function () {
    return (
      <div id="resultsSection">
        <ActiveCompoundSection compound={this.props.compound} />
        <ExampleSection hideSection={this.props.compound.formula.length > 0 || this.props.history.length > 0}/>
        <HistorySection history={this.props.history} />
      </div>
    );
  }
});

module.exports = ResultsSection;
