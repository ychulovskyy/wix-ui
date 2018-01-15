import {inputDriverFactory} from '../Input/Input.protractor.driver';

const getInput = component => component.$('[data-hook="dropdown-element"] input');

export const inputWithOptionsDriverFactory = component => {
  const inputDriver = inputDriverFactory(getInput(component));

  return {
    element: () => component,
    focusInput: inputDriver.focus,
    enterText: inputDriver.enterText,
    getText: inputDriver.getText
  };
};
