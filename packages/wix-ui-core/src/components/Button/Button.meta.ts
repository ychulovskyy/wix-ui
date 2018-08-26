import {Button} from './Button';
import Registry from '@ui-autotools/registry';

const buttonMetadata = Registry.getComponentMetadata(Button);
buttonMetadata
  .addSim({
    title: 'Simulation with default props',
    props: {
      children: 'I\'m a Button!',
      'aria-label': 'Click button'
    }
  });