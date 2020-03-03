const EventEmitter = require('events');

let singletonCS;

class AbstractComponent extends EventEmitter {
  constructor(pin) {
    super();

    this.getPin = this.getPin.bind(this);
    this._destroy = this._destroy.bind(this);

    if (Number.isInteger(pin)) {
      this.pin = pin;
      singletonCS.addComponent(this);
    }
  }

  getPin() {
    return this.pin || null;
  }

  _destroy() {
    throw new Error("Not implemented");
  }
}

class ComponentsService {
  constructor() {
    this.components = {};

    this.addComponent = this.addComponent.bind(this);
    this.delComponent = this.delComponent.bind(this);
    this.destroyAll = this.destroyAll.bind(this);
  }

  addComponent(component) {
    if (!component) {
      throw new Error('Arg cannot be null');
    }
    if (!(component instanceof AbstractComponent)) {
      throw new Error('Arg must be an instance of AbstractComponent');
    }
    if(component.getPin() == null) {
      throw new Error('Component must have a pin number');
    }
    this.components[component.getPin()] = component;
  }

  delComponent(component) {
    if (!component) {
      throw new Error('Arg cannot be null');
    }
    if (!(component instanceof AbstractComponent)) {
      throw new Error('Arg must be an instance of AbstractComponent');
    }
    if (!component.getPin()) {
      throw new Error('Component must have a pin number');
    }
    if (!this.components[component.getPin()]) {
      console.error(`Component with the pin ${component.getPin()} is not in the list`, component);
    } else {
      delete this.components[component.getPin()];
    }
  }

  destroyAll() {
    const compToDelete = this.components;
    this.components = {};

    for (var pin in compToDelete) {
      compToDelete[pin]._destroy();
    }
  }
}

singletonCS = new ComponentsService();

module.exports = {
  default: AbstractComponent,
  ComponentsService: singletonCS
}
