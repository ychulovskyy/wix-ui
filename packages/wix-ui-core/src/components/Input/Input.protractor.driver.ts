export const inputDriverFactory = component => ({
    element: () => component,
    enterText: text => component.clear().sendKeys(text),
    getText: () => component.getAttribute('value')
});
