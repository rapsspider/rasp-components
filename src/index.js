const ComponentsService = require('./components/AbstractComponent').ComponentsService;

process.on("SIGINT", () => {
  ComponentsService.destroyAll();
});

module.exports = {
  AbstractComponent: require('./components/AbstractComponent').default,
  Button: require('./components/Button.js'),
  Switch: require('./components/Switch.js'),
  SwitchUpDown: require('./components/SwitchUpDown'),
};

