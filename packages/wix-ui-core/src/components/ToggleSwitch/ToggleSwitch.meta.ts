import {ToggleSwitch} from './ToggleSwitch';
import Registry from '@ui-autotools/registry';
import style from '../../../stories/ToggleSwitch/style.st.css';

const toggleSwitchMetadata = Registry.getComponentMetadata(ToggleSwitch);
toggleSwitchMetadata
  .addSim({
    title: 'Simulation with default props',
    props: {
      className: style.root,
      'aria-label': 'ToggleSwitch'
    }
  });