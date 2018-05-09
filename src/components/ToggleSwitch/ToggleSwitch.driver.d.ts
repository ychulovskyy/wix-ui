export declare const toggleSwitchDriverFactory: ({ element, eventTrigger }: {
    element: any;
    eventTrigger: any;
}) => {
    exists: () => boolean;
    click: () => void;
    isChecked: () => any;
    isDisabled: () => any;
    getKnobIcon: () => any;
    hasKnobIcon: () => boolean;
    getId: () => any;
    getTabIndex: () => any;
    getRootStyles: () => CSSStyleDeclaration;
    getTrackStyles: () => CSSStyleDeclaration;
    getKnobStyles: () => CSSStyleDeclaration;
    getKnobIconStyles: () => CSSStyleDeclaration;
};
