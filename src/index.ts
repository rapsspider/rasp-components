import { SingletonComponentsService as ComponentsService } from './components/AbstractComponent';

process.on("SIGINT", () => {
  ComponentsService.destroyAll();
});

export {default as AbstractComponent } from './components/AbstractComponent';
export {default as Button } from './components/Button';
export {default as Switch } from './components/Switch';
export {default as SwitchUpDown } from './components/SwitchUpDown';
export {default as RadioReceiver } from './components/RadioReceiver';

