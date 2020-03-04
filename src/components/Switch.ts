import AbstractComponent from './AbstractComponent';
const Gpio = require('onoff').Gpio;

enum FRONT {
  HIGH = 1,
  LOW = 0
};

interface SwitchSettings {
  status?: FRONT,
  front?: FRONT
}

const DEFAULT_SETTINGS: SwitchSettings = {
  status: FRONT.LOW,
  front: FRONT.HIGH
};

enum EVENTS {
  ON = "on",
  OFF = "off",
  CHANGE = "change",
};

export default class Switch extends AbstractComponent {
  private status: FRONT;
  private front: FRONT;
  private gpio: any;

  constructor(pinCode: number, config?: SwitchSettings) {
    super(pinCode);

    const settings = Object.assign({}, config, DEFAULT_SETTINGS);

    this.gpio = new Gpio(pinCode, 'out');
    
    this.status = settings.status!;
    this.front = settings.front!;

    this.switchOn = this.switchOn.bind(this);
    this.switchOff = this.switchOff.bind(this);
    this._destroy = this._destroy.bind(this);
  }

  switchOn() {
    this.status = this.front === FRONT.HIGH ? FRONT.HIGH : FRONT.LOW;
    this.gpio.writeSync(this.status);
    this.emit(EVENTS.ON);
    this.emit(EVENTS.CHANGE, { status: this.status });
  }

  switchOff() {
    this.status = this.front === FRONT.HIGH ? FRONT.LOW : FRONT.HIGH;
    this.gpio.writeSync(this.status);
    this.emit(EVENTS.OFF);
    this.emit(EVENTS.CHANGE, { status: this.status });
  }

  _destroy() {
    this.gpio.writeSync(this.front);
    this.gpio.unexport();
  }
}

