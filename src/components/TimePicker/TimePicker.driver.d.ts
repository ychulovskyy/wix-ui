export declare const timePickerDriverFactory: ({ element, eventTrigger }: {
    element: any;
    eventTrigger: any;
}) => {
    exists: () => boolean;
    getInputElement: () => any;
    isDisabled: () => any;
    getInputType: () => any;
    getValue: () => any;
    keyDown: (key: any) => any;
    focus: () => any;
    blur: () => any;
    styles: {
        getRootDisplay: () => string;
        getBorderRadius: () => string;
    };
};
