/// <reference types="react" />
import * as React from 'react';
import { Option } from '../DropdownOption';
export interface DropdownContentProps {
    /** Component class name */
    className?: string;
    /** The dropdown options array */
    options: Array<Option>;
    /** A callback for when clicking an option */
    onOptionClick: (option: Option | null) => void;
    /** Array of the selected ids */
    selectedIds: Array<string | number>;
    /** An element that always appears at the top of the options */
    fixedHeader?: React.ReactNode;
    /** An element that always appears at the bottom of the options */
    fixedFooter?: React.ReactNode;
}
export interface DropdownContentState {
    hoveredIndex: number;
}
/**
 * DropdownContent
 */
export declare class DropdownContent extends React.PureComponent<DropdownContentProps, DropdownContentState> {
    static displayName: string;
    private optionsContainerRef;
    private mouseCoords;
    constructor(props: DropdownContentProps);
    setHoveredIndex(index: number): void;
    isValidOptionForSelection(option: Option): boolean;
    hoverNextItem(interval: number): void;
    onKeyboardSelect(): Option;
    onKeyDown(eventKey: string): void;
    onMouseMove(evt: React.MouseEvent<HTMLDivElement>): void;
    onMouseEnter(evt: React.MouseEvent<HTMLDivElement>, index: number): void;
    render(): JSX.Element;
}
