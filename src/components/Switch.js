const AbstractComponent = require('./AbstractComponent');
const Gpio = require('onoff').Gpio;

class Switch extends AbstractComponent {
  constructor(pinCode) {
    super(pinCode);
    this.gpio = new Gpio(pinCode, 'out');

    this.switchOn = this.switchOn.bind(this);
    this.switchOff = this.switchOff.bind(this);
    this._destroy = this._destroy.bind(this);
  }

  switchOn() {
    this.gpio.writeSync(1);
    this.emit("switchOn");
  }

  switchOff() {
    this.gpio.writeSync(0);
    this.emit("switchOff");
  }

  _destroy() {
    this.gpio.writeSync(0);
    this.gpio.unexport();
  }
}

module.exports = Switch;

