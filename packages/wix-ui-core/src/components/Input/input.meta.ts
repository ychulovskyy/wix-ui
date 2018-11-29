import {Input} from './input';
import Registry from '@ui-autotools/registry';

const inputMetadata = Registry.getComponentMetadata(Input);
inputMetadata
  .addSim({
    title: 'Simulation with default props',
    props: {
      'aria-label': 'input'
    }
  });