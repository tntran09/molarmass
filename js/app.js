var React = require('react');
var ReactDOM = require('react-dom');
var molarmass = require('molarmass');

var MolarMassApp = require('./components/MolarMassApp.React');

ReactDOM.render(
  <MolarMassApp />,
  document.getElementById('appContainer')
);
