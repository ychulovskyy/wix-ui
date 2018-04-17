import {ComponentFactory} from 'wix-ui-test-utils/driver-factory';
import {TextArea} from '.';
import {innerInputDataHook} from './constants';
import style from './TextArea.st.css';

export const textAreaDriverFactory = ({element, eventTrigger}: ComponentFactory<TextArea>) => {
  const textAreaInput: HTMLTextAreaElement = element.querySelector(`[data-hook="${innerInputDataHook}"]`);

  return {
    /** checks if the element exists */
    exists: () => !!element,
    /** retrieves the value of the element */
    getValue: () => textAreaInput.value,
    /** sets the value of the element */
    enterText: (value) => {
      textAreaInput.value = value;
      eventTrigger.change(textAreaInput);
    },
    /** focuses the element */
    focus: () => eventTrigger.focus(textAreaInput),
    /** removes focus from the element */
    blur: () => eventTrigger.blur(textAreaInput),
    /** retrieves the placeholder of the element */
    getPlaceholder: () => textAreaInput.placeholder,
    /** simulate keyPress */
    keyPress: (k: string, eventData?: KeyboardEvent) => {
      eventTrigger.keyPress(textAreaInput, eventData || {key: k, char: k, charCode: k.charCodeAt(0), keyCode: k.charCodeAt(0)} as any);
    },
    /** gets selected text in the textArea */
    getSelection: () => {
      const value = textAreaInput.value || '';
      return value.substring(textAreaInput.selectionStart, textAreaInput.selectionEnd);
    },
    /** get the text of the validation error, or null if no error displayed */
    getErrorText: (): string => {
      const errorMessageElement = element.querySelector('[data-hook="validation-error"]');
      return errorMessageElement ? errorMessageElement.textContent : null;
    },
    /** check if textarea input is disabled */
    isDisabled: () => textAreaInput.disabled,
    /** check if the textarea has a classname of focusChange to indicate a transition from focus/blur */
    isFocusChangeClassPresent: () => textAreaInput.classList.contains(style.focusChange)
  };
};
