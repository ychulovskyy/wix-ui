import {LinearProgressBar} from './linear-progress-bar';
import Registry from '@ui-autotools/registry';

const linearProgressBarMetadata = Registry.getComponentMetadata(LinearProgressBar);
linearProgressBarMetadata
  .addSim({
    title: 'Simulation with default props',
    props: {}
  });