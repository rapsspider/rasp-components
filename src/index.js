const ComponentsService = require('./services/ComponentsService');

process.on("SIGINT", () => {
  ComponentsService.destroy();
});

module.exports = {
  AbstractComponent: require('./components/AbstractComponent'),
  Button: require('./components/Button.js'),
  Switch: require('./components/Switch.js'),
  SwitchUpDown: require('./components/SwitchUpDown'),
};

