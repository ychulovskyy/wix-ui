export declare const inputWithOptionsDriverFactory: ({ element, eventTrigger }: {
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
} & {
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
};
