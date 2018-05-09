/// <reference types="react" />
import * as React from 'react';
import { Input, InputProps } from '../Input';
import { FIELD } from './utils';
export interface TimePickerProps extends InputProps {
    onChange?: (value: any) => any;
    useNativeInteraction?: boolean;
    useAmPm?: boolean;
    step?: number;
    separateSteps?: boolean;
    value?: string;
    placeholder?: string;
}
export interface TimePickerState {
    value: string;
}
/**
 * Time Picker - following the Chrome on Mac behavior (mostly)
 */
export declare class TimePicker extends React.PureComponent<TimePickerProps, TimePickerState> {
    static displayName: string;
    /**
     * Tracks when focus is lost from the element or from the entire page -
     * We don't want focus to move if we left the page
     */
    _shouldHighlightOnFocus: boolean;
    /**
     * Tracks when the user started typing in a numerical field, to switch
     * behavior on first type and on subsequent types
     */
    _hasStartedTyping: boolean;
    /** For disabling select and drag */
    _mouseDown: boolean;
    /** To keep track of where to increment / decrement externally (ticker) */
    _lastFocusedField: FIELD;
    /** To be able to call focus */
    _inputRef: Input;
    static defaultProps: {
        onChange: () => any;
        useNativeInteraction: boolean;
        useAmPm: boolean;
        step: number;
        separateSteps: boolean;
        value: any;
        placeholder: string;
    };
    static propTypes: Object;
    constructor(props: any);
    componentWillReceiveProps(nextProps: any): void;
    _highlightField(DOMelement: HTMLInputElement, field: FIELD): void;
    _onMouseDown(e: any): void;
    _onMouseUp(e: any): void;
    _onMouseMove(e: any): void;
    _onClick(e: any): void;
    _onBlur(e: any): void;
    _onFocus(e: any): void;
    _onKeyDown(e: any): void;
    increment(field?: FIELD): void;
    decrement(field?: FIELD): void;
    focus(): void;
    render(): JSX.Element;
}
