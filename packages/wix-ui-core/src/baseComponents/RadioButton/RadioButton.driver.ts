import styles from './RadioButton.st.css';
import {StylableDOMUtil} from 'stylable/test-utils';

const utils = new StylableDOMUtil(styles);
const hasStyleState = (element, state) => utils.hasStyleState(element, state);

const getInput = element => element && element.querySelector('[data-hook="radio-input"]');
const getIcon = element => element && element.querySelector('[data-hook="radio-icon"]');
const getLabel = element => element && element.querySelector('[data-hook="radio-label"]');

export const radioButtonDriverFactory = ({element, eventTrigger}) => ({
  exists: () => !!element,
  select: () => eventTrigger.change(element),
  value: () => getInput(element).getAttribute('value'),
  name: () => getInput(element).getAttribute('name'),
  isRequired: () => getInput(element).hasAttribute('required'),
  iconExists: () => !!getIcon(element),
  labelExists: () => !!getLabel(element),
  isChecked: () => hasStyleState(element, 'checked'),
  isFocused: () => hasStyleState(element, 'focused'),
  isDisabled: () => hasStyleState(element, 'disabled')
});
