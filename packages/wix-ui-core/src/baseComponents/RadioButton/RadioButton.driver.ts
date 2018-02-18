export const radioButtonDriverFactory = ({element, eventTrigger}) => ({
  exists: () => !!element,
  select: () => eventTrigger.click(element)
});
