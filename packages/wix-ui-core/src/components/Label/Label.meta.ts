import {Label} from './Label';
import Registry from '@ui-autotools/registry';

const labelMetadata = Registry.getComponentMetadata(Label);

labelMetadata
  .addSim({
    title: 'Simulation with default props',
    props: {
      children: 'I\'m a label!'
    }
  });
