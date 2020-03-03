class ComponentsService {
  constructor() {
    this.components = {};

    this.addComponent = this.addComponent.bind(this);
    this.delComponent = this.delComponent.bind(this);
    this.destroyAll = this.destroyAll.bind(this);
  }

  addComponent(component) {
    if (!this.component) {
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
    if (!this.component) {
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
      components[pin]._destroy();
    }
  }
}

module.exports = new ComponentsService();
