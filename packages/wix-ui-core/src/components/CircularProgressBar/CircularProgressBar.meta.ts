import {CircularProgressBar} from './CircularProgressBar';
import Registry from '@ui-autotools/registry';
import style from '../../../stories/CircularProgressBar/style.st.css';

const circularProgressBarMetadata = Registry.getComponentMetadata(CircularProgressBar);
circularProgressBarMetadata
  .addSim({
    title: 'Simulation with default props',
    props: {
      value: 10,
      className: style.root
    }
  });