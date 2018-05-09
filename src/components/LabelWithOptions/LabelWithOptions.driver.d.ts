export declare const labelWithOptionsDriverFactory: ({ element, eventTrigger }: {
    element: any;
    eventTrigger: any;
}) => {
    exists: () => boolean;
    getOptionsCount: () => any;
    getSelectedOptionsCount: () => number;
    optionAt: (index: number) => {
        exists: () => boolean;
        click: () => any;
        mouseEnter: () => any;
        className: () => any;
        isHovered: () => boolean;
        isSelected: () => boolean;
        isDisabled: () => boolean;
        getText: () => any;
        getElement: () => any;
    };
} & {
    exists: () => boolean;
    getTargetElement: () => Element;
    getContentElement: () => any;
    isTargetElementExists: () => boolean;
    isContentElementExists: () => boolean;
    mouseEnter: () => any;
    mouseLeave: () => any;
    click: () => any;
    getArrowOffset: () => {
        top: string;
        left: string;
        right: string;
        bottom: string;
    };
} & {
    exists: () => boolean;
    getLabelText: () => any;
    getId: () => any;
    getForAttribute: () => any;
    isDisabled: () => boolean;
    click: () => any;
    keyDown: (key: any) => any;
    hasEllipsis: () => boolean;
} & {
    getSuffix: () => any;
    isRequired: () => boolean;
    isError: () => boolean;
    isDisabled: () => boolean;
    checkboxDriverAt: (index: number) => {
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
};
