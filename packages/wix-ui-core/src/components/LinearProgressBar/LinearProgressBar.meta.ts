import {LinearProgressBar} from './LinearProgressBar';
import Registry from '@ui-autotools/registry';
import style from '../../../stories/LinearProgressBar/style.st.css';

const linearProgressBarMetadata = Registry.getComponentMetadata(LinearProgressBar);
linearProgressBarMetadata
  .addSim({
    title: 'Simulation with default props',
    props: {
      value: 10,
      className: style.root
    }
  });