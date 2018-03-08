export const dropdownContentDriverFactory = component => {
  return {
    element: () => component,
    getOptionsCount: async () => await component.$$('[data-hook="option"]').count(),
    selectOption: async (index: number) => await component.$$('[data-hook="option"]').get(index).click()
  };
};
