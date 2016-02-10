var React = require('react');
var ActiveCompoundSection = require('./ActiveCompoundSection.React');
var HistorySection = require('./HistorySection.React');

var ResultsSection = React.createClass({
  render: function () {
    return (
      <div id="resultsSection" className="pure-g">
        <ActiveCompoundSection formula={this.props.formula}/>
        <HistorySection />
      </div>
    );
  }
});

module.exports = ResultsSection;
