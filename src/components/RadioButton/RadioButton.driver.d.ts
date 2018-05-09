export declare const radioButtonDriverFactory: ({ element, eventTrigger }: {
    element: any;
    eventTrigger: any;
}) => {
    exists: () => boolean;
    select: () => any;
    value: () => string;
    name: () => string;
    isInputFocused: () => boolean;
    isRequired: () => boolean;
    iconExists: () => boolean;
    labelExists: () => boolean;
    isChecked: () => boolean;
    isFocused: () => boolean;
    isDisabled: () => boolean;
};
