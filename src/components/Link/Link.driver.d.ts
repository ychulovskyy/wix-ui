export declare const linkDriverFactory: ({ element, eventTrigger }: {
    element: any;
    eventTrigger: any;
}) => {
    exists: () => boolean;
    isAnchor: () => boolean;
    getAttribute: (attribute: any) => any;
    getChildren: () => any;
    trigger: (eventName: any, event?: {}) => any;
};
