// import {Key, browser} from 'protractor';
import {innerInputDataHook} from './constants';

export const textAreaDriverFactory = (component) => {
  const textAreaComponent = () => component.$(`[data-hook="${innerInputDataHook}"]`);

  return {
    /** returns the component element */
    element: () => component,
    /** returns the inner textarea element */
    textareaElement: () => textAreaComponent(),
    /** adds text to the value of the element */
    enterText: text => textAreaComponent().sendKeys(text),
    /** returns the height of the component */
    getHeight: () => textAreaComponent().getSize().then(size => size.height),
    /** blurs the component */
    // blur: () => textAreaComponent().sendKeys(Key.TAB),
    /** focus the component */
    focus: () => textAreaComponent().click(),
    /** hover over the component */
    // hover: () => browser.actions()
    //   .mouseMove(textAreaComponent())
    //   .perform(),
    /** get the text of the validation error, or empty if no error displayed */
    // getErrorText: async () => {
    //   const errorMessageElement = component.$('[data-hook="validation-error"]');
    //   return await errorMessageElement.isPresent() ? errorMessageElement.getText() : '';
    // },
    // /** check if textarea input is disabled */
    // isDisabled: async () => await textAreaComponent().getAttribute('disabled') === 'true'
  };
};
