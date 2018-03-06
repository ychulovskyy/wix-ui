export const dropdownContentDriverFactory = component => {
  return {
    element: () => component,
    selectOption: async (index: number) => await component.$$('[data-hook="option"]').get(index).click()
  };
};
