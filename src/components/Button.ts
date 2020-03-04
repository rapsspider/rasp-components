import AbstractComponent from './AbstractComponent';
const Gpio = require('onoff').Gpio;

enum STATUS {
  PRESS,
  UNPRESS
};

enum FRONT {
  HIGH = 1,
  LOW = 0
};

interface ButtonSettings {
  waitTimeMS?: number,
  waitIntervalTimeMS?: number,
  status?: STATUS,
  front?: FRONT
}

const DEFAULT_SETTINGS: ButtonSettings = {
  waitTimeMS: 150,
  waitIntervalTimeMS: 5000,
  status: STATUS.UNPRESS,
  front: FRONT.HIGH
};

enum EVENTS {
  PRESS = "press",
  UNPRESS = "unpress",
  CHANGE = "change",
  CLICK = "click"
};

export default class Button extends AbstractComponent {

  private count: number = 0;
  private lastChange?: number = undefined;
  private delai: number = 0;
  private timeout?: NodeJS.Timeout = undefined;
  private interval?: NodeJS.Timeout = undefined;
  private intervalCount: number = 0;
  private gpio: any;
  
  private status: STATUS;
  private front: FRONT;
  private waitTimeMS: number;
  private waitIntervalTimeMS: number;

  constructor(pinCode: number, config?: ButtonSettings) {
    super(pinCode);
    const settings = Object.assign({}, config, DEFAULT_SETTINGS);

    this.count = 0;
    this.lastChange = 0;
    this.timeout = undefined;
    this.interval = undefined;
    this.intervalCount = 0;
    this.gpio = new Gpio(pinCode, 'in', 'both');
    
    this.status = settings.status!;
    this.front = settings.front!;
    this.waitTimeMS = settings.waitTimeMS!;
    this.waitIntervalTimeMS = settings.waitIntervalTimeMS!;

    this.init = this.init.bind(this);
    this.timeoutFct = this.timeoutFct.bind(this);
    this.intervalFct = this.intervalFct.bind(this);
    this.isPressed = this.isPressed.bind(this);
    this._emitPress = this._emitPress.bind(this);
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
        if (this.timeout) {
          clearTimeout(this.timeout!);
          this.timeout = undefined;
        }
        this.status = STATUS.PRESS;

        this._emitPress(true);
        this.interval = setInterval(this.intervalFct, this.waitIntervalTimeMS);

        this.lastChange = (new Date()).getTime();
      } else {
        this.status = STATUS.UNPRESS;

        this._emitPress(false);
        clearInterval(this.interval!);
        this.interval = undefined;
        this.intervalCount = 0;

        this.delai = (new Date()).getTime() - this.lastChange!;
        this.lastChange = undefined;

        setTimeout(this.timeoutFct, this.waitTimeMS);
        this.count++;
      }

      this.emit(EVENTS.CHANGE, { status: this.status });
    })
  }

  private timeoutFct() {
    clearTimeout(this.timeout!);
    this.timeout = undefined;
    this.emit(EVENTS.CLICK, {delai: this.delai, count: this.count});
    this.delai = 0;
    this.count = 0;
  }

  private intervalFct() {
    this.intervalCount++;
    this._emitPress(true);
  }

  private _emitPress(press: boolean) {
    this.emit(press ? EVENTS.PRESS : EVENTS.UNPRESS, {
      count: this.intervalCount, 
      time: this.intervalCount * this.waitIntervalTimeMS 
    });
  }

  isPressed(): STATUS {
    return this.status;
  }

  _destroy() {
   this.gpio.unexport();
  }
}
