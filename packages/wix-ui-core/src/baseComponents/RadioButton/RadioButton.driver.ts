import styles from './RadioButton.st.css';
import {StylableDOMUtil} from 'stylable/test-utils';

export const radioButtonDriverFactory = ({element, eventTrigger}) => {
  const domUtils = new StylableDOMUtil(styles, element);
  const hasStyleState = (element, state) => domUtils.hasStyleState(element, state);

  const getInput = () => domUtils.select('.hiddenRadio');
  const getIcon = () => domUtils.select('.icon');
  const getLabel = ()=> domUtils.select('.label');

  return {
    exists: () => !!element,
    select: () => eventTrigger.change(element),
    value: () => getInput().getAttribute('value'),
    name: () => getInput().getAttribute('name'),
    isRequired: () => getInput().hasAttribute('required'),
    iconExists: () => !!getIcon(),
    labelExists: () => !!getLabel(),
    isChecked: () => hasStyleState(element, 'checked'),
    isFocused: () => hasStyleState(element, 'focused'),
    isDisabled: () => hasStyleState(element, 'disabled')
  }
};
