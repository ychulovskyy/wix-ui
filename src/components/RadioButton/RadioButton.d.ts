/// <reference types="react" />
import * as React from 'react';
export interface RadioButtonChangeEvent extends React.MouseEvent<HTMLDivElement> {
    value: string;
}
export interface RadioButtonClickEvent extends React.MouseEvent<HTMLDivElement> {
    value: string;
}
export interface RadioButtonHoverEvent extends React.MouseEvent<HTMLSpanElement> {
    value: string;
}
export interface RadioButtonProps {
    /** Sets checked status of the radio */
    checked?: boolean;
    /** The value which the radio represents */
    value?: string;
    /** The group name which the button belongs to */
    name?: string;
    /** A callback to invoke on change */
    onChange?: (event: RadioButtonChangeEvent | RadioButtonClickEvent) => void;
    /** A callback to invoke on hover */
    onHover?: (event: RadioButtonHoverEvent) => void;
    /** A callback to invoke on blur */
    onIconBlur?: (event: React.MouseEvent<HTMLElement>) => void;
    /** The checked icon */
    checkedIcon?: React.ReactNode;
    /** The unchecked icon */
    uncheckedIcon?: React.ReactNode;
    /** The label */
    label?: React.ReactNode;
    /** Sets the disabled status of the radio */
    disabled?: boolean;
    /** Sets the required status of the radio */
    required?: boolean;
}
export interface RadioButtonState {
    focused: boolean;
}
export declare class RadioButton extends React.Component<RadioButtonProps, RadioButtonState> {
    state: {
        focused: boolean;
    };
    static defaultProps: {
        onChange: () => any;
        onHover: () => any;
        onBlur: () => any;
    };
    render(): JSX.Element;
    handleInputChange: (event: React.MouseEvent<HTMLDivElement>) => void;
    onHover: (event: React.MouseEvent<HTMLSpanElement>) => void;
    onFocus: () => void;
    onInputBlur: () => void;
    private radioRef;
}
