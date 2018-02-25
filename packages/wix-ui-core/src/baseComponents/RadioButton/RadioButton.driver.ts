import styles from './RadioButton.st.css';
import {StylableDOMUtil} from 'stylable/test-utils';

export const radioButtonDriverFactory = ({element, eventTrigger}) => {
  const domUtils = new StylableDOMUtil(styles, element);
  const hasStyleState = (element, state) => domUtils.hasStyleState(element, state);

  const getInput = () => domUtils.select('.hiddenRadio');
  const getIcon = element => element && element.querySelector('[data-hook="radio-icon"]');
  const getLabel = element => element && element.querySelector('[data-hook="radio-label"]');

  return {
    exists: () => !!element,
    select: () => eventTrigger.change(element),
    value: () => getInput().getAttribute('value'),
    name: () => getInput().getAttribute('name'),
    isRequired: () => getInput().hasAttribute('required'),
    iconExists: () => !!getIcon(element),
    labelExists: () => !!getLabel(element),
    isChecked: () => hasStyleState(element, 'checked'),
    isFocused: () => hasStyleState(element, 'focused'),
    isDisabled: () => hasStyleState(element, 'disabled')
  }
};
