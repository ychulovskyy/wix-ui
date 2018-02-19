import styles from './RadioButton.st.css';
import {StylableDOMUtil} from 'stylable/test-utils';

const utils = new StylableDOMUtil(styles);
const hasStyleState = (element, state) => utils.hasStyleState(element, state);

const getInput = element => element && element.querySelector('[data-hook="radio-input"]');
const getIcon = element => element && element.querySelector('[data-hook="radio-icon"]');
const getContent = element => element && element.querySelector('[data-hook="radio-content"]');

export const radioButtonDriverFactory = ({element, eventTrigger}) => ({
  exists: () => !!element,
  select: () => eventTrigger.click(element),
  value: () => getInput(element).getAttribute('value'),
  name: () => getInput(element).getAttribute('name'),
  iconExists: () => !!getIcon(element),
  contentExists: () => !!getContent(element),
  isChecked: () => hasStyleState(element, 'checked')
});
