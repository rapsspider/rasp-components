import AbstractComponent from './AbstractComponent';
const Gpio = require('onoff').Gpio;

enum STATUS {
  ON,
  OFF,
};

enum FRONT {
  HIGH = 1,
  LOW = 0
};

interface InterruptorSettings {
  status?: STATUS,
  front?: FRONT
}

const DEFAULT_SETTINGS: InterruptorSettings = {
  status: STATUS.OFF,
  front: FRONT.HIGH
};

enum EVENTS {
  ON = "on",
  OFF = "off",
  CHANGE = "change",
};

export default class Interruptor extends AbstractComponent {
  
  private status: STATUS;
  private front: FRONT;
  private gpio: any;

  constructor(pinCode: number, config?: InterruptorSettings) {
    super(pinCode);
    const settings = Object.assign({}, config, DEFAULT_SETTINGS);

    this.gpio = new Gpio(pinCode, 'in', 'both');
    
    this.status = settings.status!;
    this.front = settings.front!;

    this.init = this.init.bind(this);
    this.getStatut = this.getStatut.bind(this);
    this._destroy = this._destroy.bind(this);

    this.init();
  }

  private init() {
    this.gpio.watch((err: any, value: number) => {
      if (err) { //if an error
        console.error('There was an error', err);
        return;
      }

      if (value === this.front) {
        this.status = STATUS.ON;
        this.emit(EVENTS.ON);
      } else {
        this.status = STATUS.OFF;
        this.emit(EVENTS.OFF);
      }

      this.emit(EVENTS.CHANGE, { status: this.status });
    })
  }

  getStatut() {
    return this.status;
  }

  _destroy() {
   this.gpio.unexport();
  }
}
