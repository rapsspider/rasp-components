import { EventEmitter } from  'events';

let singletonCS: ComponentsService;

export default class AbstractComponent extends EventEmitter {
  
  private pin?: number = undefined;

  constructor(pin?: number) {
    super();
    this.pin = pin;

    this.getPin = this.getPin.bind(this);
    this._destroy = this._destroy.bind(this);

    if (pin !== undefined) {
      this.pin = pin;
      singletonCS.addComponent(this);
    }
  }

  getPin() : number | undefined {
    return this.pin || undefined;
  }

  _destroy() {
    throw new Error("Not implemented");
  }
}

class ComponentsService {

  private components: Map<number, AbstractComponent> = new Map();

  constructor() {
    this.addComponent = this.addComponent.bind(this);
    this.delComponent = this.delComponent.bind(this);
    this.destroyAll = this.destroyAll.bind(this);
  }

  addComponent(component: AbstractComponent) {
    if (!component) {
      throw new Error('Arg cannot be null');
    }
    if (!(component instanceof AbstractComponent)) {
      throw new Error('Arg must be an instance of AbstractComponent');
    }
    if(component.getPin() == undefined) {
      throw new Error('Component must have a pin number');
    }
    const pin: number = component.getPin()!;
    this.components.set(pin, component);
  }

  delComponent(component: AbstractComponent) {
    if (!component) {
      throw new Error('Arg cannot be null');
    }
    if (!(component instanceof AbstractComponent)) {
      throw new Error('Arg must be an instance of AbstractComponent');
    }
    if (component.getPin() === undefined) {
      throw new Error('Component must have a pin number');
    }
    const pin: number = component.getPin()!;
    if (!this.components.has(pin)) {
      console.error(`Component with the pin ${pin} is not in the list`, component);
    } else {
      this.components.delete(pin);
    }
  }

  destroyAll() {
    const compToDelete: Map<number, AbstractComponent> = this.components;
    this.components = new Map();

    compToDelete.forEach(c => {
      c._destroy();
    })
  }
}

singletonCS = new ComponentsService();

export const SingletonComponentsService = singletonCS;
