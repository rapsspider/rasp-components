const AbstractComponent = require('./AbstractComponent').default;
const rpi433 = require('rpi-433-tristate');

class RadioReceiver extends AbstractComponent {
  constructor(pinCode, { debounceDelay } = {}) {
    super(pinCode);
    this.pin = pinCode;
    this.sniffer = rpi433.sniffer({
      pin: pinCode,
      debounceDelay: debounceDelay || 500
    });

    this.init = this.init.bind(this);

    this.init();
  }

  init() {
    // Receive (data is like {code: xxx, pulseLength: xxx})
    rfSniffer.on('data', (data) => {
      console.log('Code received: '+data.code+' pulse length : '+data.pulseLength);
      this.emit('data', data);
    });
  }
}

module.exports = RadioReceiver;
