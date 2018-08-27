import {TimePicker} from './TimePicker';
import Registry from '@ui-autotools/registry';

const timePickerMetadata = Registry.getComponentMetadata(TimePicker);
timePickerMetadata.reactStrictModeCompliant = false;

timePickerMetadata
  .addSim({
    title: 'Simulation with default props',
    props: {
      tickerUpIcon: '+',
      tickerDownIcon: '-',
      step: 1,
      'aria-label': 'Pick a time'
    }
  });