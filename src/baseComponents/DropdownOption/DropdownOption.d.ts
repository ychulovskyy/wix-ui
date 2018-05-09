/// <reference types="react" />
import * as React from 'react';
import { Option } from './';
export interface DropdownOptionProps {
    className: string;
    option: Option;
    isSelected: boolean;
    isHovered: boolean;
    onClickHandler: React.MouseEventHandler<HTMLDivElement> | undefined;
    onMouseEnterHandler: React.MouseEventHandler<HTMLDivElement> | undefined;
}
export declare type DropdownOptionType = React.SFC<DropdownOptionProps>;
export declare const DropdownOption: DropdownOptionType;
