/// <reference types="react" />
import * as React from 'react';
import * as PropTypes from 'prop-types';
export interface InputProps {
    className?: string;
    error?: string | boolean;
    prefix?: React.ReactNode;
    suffix?: React.ReactNode;
    autoComplete?: 'on' | 'off';
    autoFocus?: boolean;
    disabled?: boolean;
    maxLength?: number;
    onBlur?: React.FocusEventHandler<HTMLElement>;
    onChange?: React.ChangeEventHandler<HTMLInputElement>;
    onFocus?: React.FocusEventHandler<HTMLElement>;
    onClick?: React.EventHandler<React.MouseEvent<HTMLInputElement>>;
    onMouseDown?: React.EventHandler<React.MouseEvent<HTMLInputElement>>;
    onMouseUp?: React.EventHandler<React.MouseEvent<HTMLInputElement>>;
    onMouseMove?: React.EventHandler<React.MouseEvent<HTMLInputElement>>;
    onDragStart?: React.EventHandler<React.DragEvent<HTMLInputElement>>;
    onKeyDown?: React.KeyboardEventHandler<HTMLInputElement>;
    onKeyPress?: React.KeyboardEventHandler<HTMLInputElement>;
    onKeyUp?: React.KeyboardEventHandler<HTMLInputElement>;
    placeholder?: string;
    readOnly?: boolean;
    required?: boolean;
    tabIndex?: number;
    type?: string;
    value?: string;
}
export interface InputState {
    focus: boolean;
}
export declare class Input extends React.Component<InputProps, InputState> {
    static propTypes: {
        className: PropTypes.Requireable<any>;
        error: PropTypes.Requireable<any>;
        prefix: PropTypes.Requireable<any>;
        suffix: PropTypes.Requireable<any>;
        autoComplete: PropTypes.Requireable<any>;
        autoFocus: PropTypes.Requireable<any>;
        disabled: PropTypes.Requireable<any>;
        maxLength: PropTypes.Requireable<any>;
        onBlur: PropTypes.Requireable<any>;
        onChange: PropTypes.Requireable<any>;
        onFocus: PropTypes.Requireable<any>;
        onClick: PropTypes.Requireable<any>;
        onMouseDown: PropTypes.Requireable<any>;
        onMouseUp: PropTypes.Requireable<any>;
        onMouseMove: PropTypes.Requireable<any>;
        onDragStart: PropTypes.Requireable<any>;
        onKeyDown: PropTypes.Requireable<any>;
        onKeyPress: PropTypes.Requireable<any>;
        onKeyUp: PropTypes.Requireable<any>;
        placeholder: PropTypes.Requireable<any>;
        readOnly: PropTypes.Requireable<any>;
        required: PropTypes.Requireable<any>;
        tabIndex: PropTypes.Requireable<any>;
        type: PropTypes.Requireable<any>;
        value: PropTypes.Requireable<any>;
    };
    static defaultProps: InputProps;
    state: InputState;
    private input;
    render(): JSX.Element;
    focus(): void;
    blur(): void;
    select(): void;
    private handleFocus;
    private handleBlur;
}
