/// <reference types="react" />
import * as React from 'react';
import * as propTypes from 'prop-types';
export interface ToggleSwitchStyles {
    root?: React.CSSProperties;
    track?: React.CSSProperties;
    knob?: React.CSSProperties;
    knobIcon?: React.CSSProperties;
}
export interface ToggleSwitchProps {
    checked?: boolean;
    disabled?: boolean;
    tabIndex?: number;
    onChange?: () => void;
    styles?: ToggleSwitchStyles;
    id?: string;
    checkedIcon?: React.ReactNode;
    uncheckedIcon?: React.ReactNode;
}
export interface ToggleSwitchState {
    focus: boolean;
    focusVisible: boolean;
}
/**
 * Toggle Switch
 */
export declare class ToggleSwitch extends React.PureComponent<ToggleSwitchProps, ToggleSwitchState> {
    static displayName: string;
    static propTypes: {
        checked: propTypes.Requireable<any>;
        disabled: propTypes.Requireable<any>;
        tabIndex: propTypes.Requireable<any>;
        onChange: propTypes.Requireable<any>;
        styles: propTypes.Requireable<any>;
        id: propTypes.Requireable<any>;
        checkedIcon: propTypes.Requireable<any>;
        uncheckedIcon: propTypes.Requireable<any>;
    };
    static defaultProps: {
        checked: boolean;
        styles: {};
        tabIndex: number;
        onChange: () => any;
    };
    state: {
        focus: boolean;
        focusVisible: boolean;
    };
    private focusedByMouse;
    render(): JSX.Element;
    private handleKeyDown;
    private handleMouseDown;
    private handleFocus;
    private handleBlur;
}
