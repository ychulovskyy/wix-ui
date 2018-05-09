/// <reference types="react" />
import * as React from 'react';
import { Requireable } from 'prop-types';
import { Option } from '../../baseComponents/DropdownOption';
export interface LabelWithOptionsProps {
    /** The dropdown options array */
    options: Array<Option>;
    /** set true for multiple selection, false for single */
    multi?: boolean;
    /** Handler for when an option is selected */
    onSelect?: (option: Option) => void;
    /** Handler for when an option is deselected */
    onDeselect?: (option: Option | null) => void;
    /** initial selected option ids */
    initialSelectedIds?: Array<string | number>;
    /** An element that always appears at the top of the options */
    fixedHeader?: React.ReactNode;
    /** An element that always appears at the bottom of the options */
    fixedFooter?: React.ReactNode;
    /** Makes the component disabled */
    disabled?: boolean;
    /** Placeholder to display */
    placeholder?: string;
    /** if set to true an error will be rendered when no options are selected */
    required?: boolean;
    /** If set to true, the label will display an ellipsis when overflowing */
    ellipsis?: boolean;
    /** Suffix */
    renderSuffix?: (isError: boolean) => React.ReactNode;
    checkbox?: boolean;
}
export interface LabelWithOptionsState {
    selectedIds: Array<string | number>;
    isDirty: boolean;
}
/**
 * LabelWithOptions
 */
export declare class LabelWithOptions extends React.PureComponent<LabelWithOptionsProps, LabelWithOptionsState> {
    static displayName: string;
    static propTypes: {
        options: (object: any, key: string, componentName: string, ...rest: any[]) => Error;
        multi: Requireable<any>;
        onSelect: Requireable<any>;
        onDeselect: Requireable<any>;
        initialSelectedIds: Requireable<any>;
        fixedHeader: Requireable<any>;
        fixedFooter: Requireable<any>;
        disabled: Requireable<any>;
        placeholder: Requireable<any>;
        required: Requireable<any>;
        ellipsis: Requireable<any>;
        renderSuffix: Requireable<any>;
    };
    static defaultProps: {
        initialSelectedIds: any[];
        multi: boolean;
        onSelect: () => any;
        onDeselect: () => any;
        renderSuffix: () => any;
    };
    static createOption: (option?: Partial<Option>) => Option;
    static createDivider: (value?: any) => Option;
    constructor(props: any, context?: any);
    render(): JSX.Element;
    private onInitialSelectedOptionsSet;
    private onSelect;
    private onDeselect;
    private createOptions;
    private createLabel;
}
