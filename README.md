Some components for raspberry pi when programming in nodejs

# Example
```javascript
import { Button, Switch, SwitchUpDown } from "rasp-components";

const button = new Button(4);
const led = new Switch(17);

let show = false;

button.on("click", () => {
  show=!show;
  console.log('show', show);
  show ? led.switchOn() : led.switchOff()
});
```
