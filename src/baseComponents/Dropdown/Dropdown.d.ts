/// <reference types="react" />
import * as React from 'react';
import { InjectedOnClickOutProps, OnClickOutProps } from 'react-onclickoutside';
import { Placement } from '../../components/Popover';
import { Option } from '../DropdownOption';
import { OPEN_TRIGGER_TYPE } from './constants';
export interface DropdownProps {
    /** The location to display the content */
    placement: Placement;
    /** Should display arrow with the content */
    showArrow?: boolean;
    /** render function that renders the target element with the state */
    children: React.ReactNode;
    /** The dropdown options array */
    options: Array<Option>;
    /** Trigger type to open the content */
    openTrigger: OPEN_TRIGGER_TYPE;
    /** Handler for when an option is selected */
    onSelect: (option: Option | null) => void;
    /** Handler for when an option is deselected */
    onDeselect: (option: Option | null) => void;
    /** initial selected option ids */
    initialSelectedIds: Array<string | number>;
    /** A callback for when initial selected options are set */
    onInitialSelectedOptionsSet: (options: Array<Option>) => void;
    /** set true for multiple selection, false for single */
    multi?: boolean;
    /** An element that always appears at the top of the options */
    fixedHeader?: React.ReactNode;
    /** An element that always appears at the bottom of the options */
    fixedFooter?: React.ReactNode;
    /** Makes the component disabled */
    disabled?: boolean;
    /** Animation timer */
    timeout?: number;
    /** If set to true, content element will always be visible, used for preview mode */
    forceContentElementVisibility?: boolean;
}
export interface DropdownState {
    isOpen: boolean;
    selectedIds: Array<string | number>;
}
/**
 * Dropdown
 */
export declare class DropdownComponent extends React.PureComponent<DropdownProps & InjectedOnClickOutProps, DropdownState> {
    static displayName: string;
    private dropdownContentRef;
    constructor(props: DropdownProps & InjectedOnClickOutProps);
    componentWillMount(): void;
    componentWillReceiveProps(props: DropdownProps): void;
    initializeSelectedOptions(props: any): void;
    handleClickOutside(): void;
    open(onOpen?: () => void): void;
    close(): void;
    onKeyboardSelect(): void;
    isClosingKey(key: any): boolean;
    onKeyDown(evt: React.KeyboardEvent<HTMLElement>): void;
    onOptionClick(option: Option | null): void;
    render(): JSX.Element;
}
export declare const Dropdown: React.ComponentClass<DropdownProps & OnClickOutProps>;
