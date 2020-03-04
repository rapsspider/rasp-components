import AbstractComponent from './AbstractComponent';
import Button from './Button';
import Switch from './Switch';

enum ACTIONS {
  UP,
  STOP,
  DOWN
}

interface ParamConstructor {
  buttonUp: Button, 
  buttonDown: Button, 
  buttonStop?: Button, 
  relayUp: Switch, 
  relayDown: Switch
}

export default class SwitchUpDown extends AbstractComponent {

  private buttonUp: Button;
  private buttonDown: Button;
  private buttonStop?: Button;
  private relayUp: Switch;
  private relayDown: Switch;
  private action: ACTIONS;

  constructor(params: ParamConstructor) {
    super();
    this.buttonUp = params.buttonUp;
    this.buttonDown = params.buttonDown;
    this.relayUp = params.relayUp;
    this.relayDown = params.relayDown;
    this.buttonStop = params.buttonStop;

    this.action = ACTIONS.STOP;

    this.init = this.init.bind(this);
    this.up = this.up.bind(this);
    this.stop = this.stop.bind(this);
    this.down = this.down.bind(this);
    this._destroy = this._destroy.bind(this);

    this.init();
  }

  private init() {
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

