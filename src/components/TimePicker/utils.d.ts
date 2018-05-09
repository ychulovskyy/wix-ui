export declare enum FIELD {
    NONE = 0,
    HOUR = 1,
    MINUTE = 2,
    AMPM = 3,
    AFTER = 4,
}
export declare const BLANK = "--";
export declare const NULL_TIME: string;
export declare const leftpad: (str: any) => string;
export declare const getFieldFromPos: (pos: number) => number;
export declare const parseTime: (timeStr: string) => {
    hour: string;
    minute: string;
};
export declare const isValidTime: (timeStr: string, useAmPm?: boolean) => boolean;
export declare const increment: ({ value, field, step, separateSteps }: {
    value: any;
    field: any;
    step?: number;
    separateSteps?: boolean;
}) => string;
export declare const decrement: ({ value, field, step, separateSteps }: {
    value: any;
    field: any;
    step?: number;
    separateSteps?: boolean;
}) => string;
export declare const convertToAmPm: (value: any) => string;
