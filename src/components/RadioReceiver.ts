const AbstractComponent = require('./AbstractComponent').default;
const rpi433 = require('rpi-433-tristate');

interface RadioReceiverConfig {
  debounceDelay?: number
}

export default class RadioReceiver extends AbstractComponent {

  private sniffer: any;

  constructor(pinCode: number, config?: RadioReceiverConfig) {
    super(pinCode);

    this.sniffer = rpi433.sniffer({
      pin: pinCode,
      debounceDelay: config && config.debounceDelay || 500
    });

    this.init = this.init.bind(this);
    this._destroy = this._destroy.bind(this);

    this.init();
  }

  private init() {
    // Receive (data is like {code: xxx, pulseLength: xxx})
    this.sniffer.on('data', (data: any) => {
      console.log('Code received: '+data.code+' pulse length : '+data.pulseLength);
      this.emit('data', data);
    });
  }

  private _destroy() {

  }
}
