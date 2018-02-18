const getInput = element => element && element.querySelector('[data-hook="radio-input"]');
const getIcon = element => element && element.querySelector('[data-hook="radio-icon"]');
const getContent = element => element && element.querySelector('[data-hook="radio-content"]');

export const radioButtonDriverFactory = ({element, eventTrigger}) => ({
  exists: () => !!element,
  select: () => eventTrigger.click(element),
  value: () => getInput(element).getAttribute('value'),
  group: () => getInput(element).getAttribute('name'),
  iconExists: () => !!getIcon(element),
  contentExists: () => !!getContent(element),
  isSelected: () => element.getAttribute('data-selected')
});
