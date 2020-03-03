const ComponentsService = require('../services/ComponentsService');
const EventEmitter = require('events');

class AbstractComponent extends EventEmitter {
  constructor(pin) {
    super();

    this.getPin = this.getPin.bind(this);
    this._destroy = this._destroy.bind(this);

    if (Number.isInteger(pin)) {
      this.pin = pin;
      ComponentsService.addComponent(pin);
    }
  }

  getPin() {
    return this.pin || null;
  }

  _destroy() {
    throw new Error("Not implemented");
  }
}

module.exports = AbstractComponent;
