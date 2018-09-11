export const codeExampleDriverFactory = ({element, eventTrigger}) => {
  return {
    exists: () => !!element,
    click: () => eventTrigger.click(element)
  };
};
