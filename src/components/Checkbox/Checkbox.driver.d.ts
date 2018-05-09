export declare const checkboxDriverFactory: ({ element, eventTrigger }: {
    element: any;
    eventTrigger: any;
}) => {
    element: () => any;
    exists: () => boolean;
    click: () => void;
    keyDown: (key: string) => any;
    mouseEnter: () => any;
    mouseLeave: () => any;
    mouseDown: () => any;
    focus: () => any;
    isChecked: () => boolean;
    isIndeterminate: () => boolean;
    isDisabled: () => boolean;
    children: () => Element;
    tickmark: () => Element;
    input: () => HTMLInputElement;
    hasErrorState: () => boolean;
    hasFocusState: () => boolean;
    hasReadOnlyState: () => boolean;
};
