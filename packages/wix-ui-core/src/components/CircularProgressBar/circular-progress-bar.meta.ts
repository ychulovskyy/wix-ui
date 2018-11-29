import {CircularProgressBar} from './circular-progress-bar';
import Registry from '@ui-autotools/registry';

const circularProgressBarMetadata = Registry.getComponentMetadata(CircularProgressBar);
circularProgressBarMetadata
  .addSim({
    title: 'Simulation with default props',
    props: {}
  });