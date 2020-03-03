const AbstractComponent = require("./AbstractComponent");

const ACTIONS = {
  UP: "UP",
  STOP: "STOP",
  DOWN: "DOWN"
}

class SwitchUpDown extends AbstractComponent {
  constructor({buttonUp, buttonDown, buttonStop, relayUp, relayDown}) {
    super();
    this.buttonUp = buttonUp;
    this.buttonDown = buttonDown;
    this.relayUp = relayUp;
    this.relayDown = relayDown;
    this.buttonStop = buttonStop;

    this.action = ACTIONS.STOP;

    this.init = this.init.bind(this);
    this.up = this.up.bind(this);
    this.stop = this.stop.bind(this);
    this.down = this.down.bind(this);
    this._destroy = this._destroy.bind(this);

    this.init();
  }

  init() {
    this.buttonUp.on('click', () => {
      this.up();
    });

    this.buttonDown.on('click', () => {
      this.down();
    });

    this.buttonStop && this.buttonStop.on('click', () => {
      this.stop();
    });
  };

  up() {
    if (this.action !== ACTIONS.UP) {
      this.relayDown.switchOff();
      this.relayUp.switchOn();
      this.action = ACTIONS.UP;
    }
  }

  stop() {
    if (this.action !== ACTIONS.STOP) {
      this.relayDown.switchOff();
      this.relayUp.switchOff();
      this.action = ACTIONS.STOP;
    }
  }

  down() {
    if (this.action !== ACTIONS.DOWN) {
      this.relayDown.switchOn();
      this.relayUp.switchOff();
      this.action = ACTIONS.DOWN;
    }
  }

  _destroy() {

  }
}

module.exports = SwitchUpDown;

