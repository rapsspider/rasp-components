import { Button, Switch, SwitchUpDown, RadioReceiver } from './index';

const button: Button = new Button(4);
const led: Switch = new Switch(17);

const receiver: RadioReceiver = new RadioReceiver(27);

let show: boolean = false;

button.on("click", () => {
  show=!show;
  console.log('show', show);
  show ? led.switchOn() : led.switchOff()
});
