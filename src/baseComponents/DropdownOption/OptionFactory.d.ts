/// <reference types="react" />
import * as React from 'react';
import { Requireable } from 'prop-types';
export declare const optionPropType: Requireable<any>;
export interface Option {
    id: number | string;
    isDisabled: boolean;
    isSelectable: boolean;
    value: string;
    render: (value: React.ReactNode) => React.ReactNode;
}
export declare type DividerArgs = {
    className: string;
    value: React.ReactNode;
};
export declare const OptionFactory: {
    create: (option?: Partial<Option>) => Option;
    createDivider({ className, value }?: Partial<DividerArgs>): Option;
    createHighlighted(option: Option, hightlightValue: string): Option;
};
