import {Checkbox, CheckboxProps} from './Checkbox';
import Registry from '@ui-autotools/registry';
import style from './CheckboxStyle.st.css';

const checkboxMetadata = Registry.getComponentMetadata(Checkbox);

let checked: boolean = false;
const onChange = () => {
  checked = !checked; 
}

checkboxMetadata
  .addSim({
    title: 'Simulation with default props',
    props: {
      checked,
      className: style.root,
      onChange,
      'aria-label': 'Check to choose the option'
    }
  });
