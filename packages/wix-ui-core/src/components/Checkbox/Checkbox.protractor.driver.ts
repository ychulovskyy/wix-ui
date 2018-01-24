export const checkboxDriverFactory = component => ({
  element: () => component,
  click: () => component.click(),
  isDisabled: () => !!component.getAttribute('disabled')
});
