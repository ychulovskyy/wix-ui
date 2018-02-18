const getInput = element => element && element.querySelector('[data-hook="radio-input"]');

export const radioButtonDriverFactory = ({element, eventTrigger}) => ({
  exists: () => !!element,
  select: () => eventTrigger.click(element),
  value: () => getInput(element).getAttribute('value')
});
