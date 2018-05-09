/// <reference types="react" />
import * as React from 'react';
export interface OnChangeEvent extends React.ChangeEvent<HTMLInputElement> {
    checked: boolean;
}
export interface CheckboxProps extends React.InputHTMLAttributes<HTMLElement> {
    /** The onChange function will be called with a new checked value */
    onChange?: React.EventHandler<OnChangeEvent>;
    /** An element to be displayed when the checkbox is unchecked */
    uncheckedIcon?: JSX.Element;
    /** An element to be displayed when the checkbox is checked */
    checkedIcon?: JSX.Element;
    /** An element to be displayed when the checkbox is in indeterminate state */
    indeterminateIcon?: JSX.Element;
    /** Whether checkbox should be in error state */
    error?: boolean;
    /** Whether the checkbox is indeterminate */
    indeterminate?: boolean;
}
export interface CheckboxState {
    isFocused: boolean;
    focusVisible: boolean;
}
export declare class Checkbox extends React.Component<CheckboxProps, CheckboxState> {
    static defaultProps: Partial<CheckboxProps>;
    private checkbox;
    private focusedByMouse;
    state: {
        isFocused: boolean;
        focusVisible: boolean;
    };
    render(): JSX.Element;
    private handleMouseDown;
    private handleChange;
    private handleInputKeyDown;
    private handleInputBlur;
    private handleInputFocus;
}
