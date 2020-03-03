const { Button, Switch, SwitchUpDown } = require('./index.js');

const button = new Button(4);
const led = new Switch(17);

let show = false;

button.on("click", () => {
  show=!show;
  console.log('show', show);
  show ? led.switchOn() : led.switchOff()
});
