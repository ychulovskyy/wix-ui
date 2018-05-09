/// <reference types="react" />
import * as React from 'react';
import { Option } from '../../baseComponents/DropdownOption/OptionFactory';
import { Requireable } from 'prop-types';
export interface AutocompleteProps {
    /** The dropdown options array */
    options: Array<Option>;
    /** Handler for when an option is selected */
    onSelect?: (option: Option) => void;
    /** initial selected option id */
    initialSelectedId?: string | number;
    /** An element that always appears at the top of the options */
    fixedHeader?: React.ReactNode;
    /** An element that always appears at the bottom of the options */
    fixedFooter?: React.ReactNode;
    /** Callback when the user pressed the Enter key or Tab key after he wrote in the Input field - meaning the user selected something not in the list  */
    onManualInput?: (value: string) => void;
    /** Standard React Input autoFocus (focus the element on mount) */
    autoFocus?: boolean;
    /** Makes the component disabled */
    disabled?: boolean;
    /** Standard input onBlur callback */
    onBlur?: React.FocusEventHandler<HTMLInputElement>;
    /** Standard input onChange callback */
    onChange?: React.ChangeEventHandler<HTMLInputElement>;
    /** Standard input onFocus callback */
    onFocus?: React.FocusEventHandler<HTMLInputElement>;
    /** Placeholder to display */
    placeholder?: string;
    /** Is in error state */
    error?: string | boolean;
    /** Prefix */
    prefix?: React.ReactNode;
    /** Suffix */
    suffix?: React.ReactNode;
}
export interface AutocompleteState {
    inputValue: string;
}
export declare class Autocomplete extends React.PureComponent<AutocompleteProps, AutocompleteState> {
    static displayName: string;
    static propTypes: {
        options: (object: any, key: string, componentName: string, ...rest: any[]) => Error;
        onSelect: Requireable<any>;
        initialSelectedId: Requireable<any>;
        fixedHeader: Requireable<any>;
        fixedFooter: Requireable<any>;
        onManualInput: Requireable<any>;
        autoFocus: Requireable<any>;
        disabled: Requireable<any>;
        onBlur: Requireable<any>;
        onChange: Requireable<any>;
        onFocus: Requireable<any>;
        placeholder: Requireable<any>;
        error: Requireable<any>;
        prefix: Requireable<any>;
        suffix: Requireable<any>;
    };
    static createOption: (option?: Partial<Option>) => Option;
    static createDivider: (value?: any) => Option;
    constructor(props: AutocompleteProps);
    _onInputChange(event: React.ChangeEvent<HTMLInputElement>): void;
    _onSelect(option: Option): void;
    _createInputProps(): {
        value: string;
        onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
        autoFocus: boolean;
        disabled: boolean;
        onBlur: (event: React.FocusEvent<HTMLInputElement>) => void;
        onFocus: (event: React.FocusEvent<HTMLInputElement>) => void;
        placeholder: string;
        error: string | boolean;
        suffix: React.ReactNode;
        prefix: React.ReactNode;
    };
    _onInitialSelectedOptionsSet(options: Array<Option>): void;
    render(): JSX.Element;
}
