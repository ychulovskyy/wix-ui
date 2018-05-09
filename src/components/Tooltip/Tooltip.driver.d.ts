export declare const tooltipDriverFactory: (args: any) => {
    styles: {
        getBackgroundColor: () => string;
        getBorderWidth: () => string;
        getBorderStyle: () => string;
        getBorderColor: () => string;
        getBorderRadius: () => string;
        getContentPadding: () => string;
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
