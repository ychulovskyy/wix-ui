export declare const dropdownContentDriverFactory: ({ element, eventTrigger }: {
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
};
