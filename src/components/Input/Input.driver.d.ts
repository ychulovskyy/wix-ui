export declare const inputDriverFactory: ({ element, eventTrigger }: {
    element: any;
    eventTrigger: any;
}) => {
    exists: () => boolean;
    hasStyleState: (stateName: any) => boolean;
    getInput: () => any;
    getValue: () => any;
    getPlaceholder: () => any;
    getPrefix: () => any;
    getSuffix: () => any;
    isDisabled: () => any;
    setValue: (value: any) => void;
    focus: () => any;
    blur: () => any;
    keyDown: (key: any) => any;
};
