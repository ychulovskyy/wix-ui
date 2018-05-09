/// <reference types="react" />
import * as React from 'react';
import PopperJS from 'popper.js';
import { ElementProps } from '../../utils';
import { Requireable } from 'prop-types';
export declare type Placement = PopperJS.Placement;
export declare type AppendTo = PopperJS.Boundary | Element;
export declare const AppendToPropType: Requireable<any>;
export declare const PlacementsType: Requireable<any>;
export interface PopoverProps {
    className?: string;
    /** The location to display the content */
    placement: Placement;
    /** Is the content shown or not */
    shown: boolean;
    /** onClick on the component */
    onClick?: React.MouseEventHandler<HTMLDivElement>;
    /** onMouseEnter on the component */
    onMouseEnter?: React.MouseEventHandler<HTMLDivElement>;
    /** onMouseLeave on the component */
    onMouseLeave?: React.MouseEventHandler<HTMLDivElement>;
    /** onKeyDown on the target component */
    onKeyDown?: React.KeyboardEventHandler<HTMLDivElement>;
    /** Show show arrow from the content */
    showArrow?: boolean;
    /** Moves popover relative to the parent */
    moveBy?: {
        x: number;
        y: number;
    };
    /** Fade Delay */
    hideDelay?: number;
    /** Show Delay */
    showDelay?: number;
    /** Moves arrow by amount */
    moveArrowTo?: number;
    /** Enables calculations in relation to a dom element */
    appendTo?: AppendTo;
    /** Animation timer */
    timeout?: number;
}
export declare type PopoverState = {
    isMounted: boolean;
};
export declare type PopoverType = PopoverProps & {
    Element?: React.SFC<ElementProps>;
    Content?: React.SFC<ElementProps>;
};
/**
 * Popover
 */
export declare class Popover extends React.Component<PopoverType, PopoverState> {
    static Element: React.StatelessComponent<ElementProps>;
    static Content: React.StatelessComponent<ElementProps>;
    targetRef: HTMLElement;
    appendToNode: HTMLElement;
    stylesObj: {
        [key: string]: string;
    };
    constructor(props: PopoverProps);
    static propTypes: {
        className: Requireable<any>;
        placement: Requireable<any>;
        shown: Requireable<any>;
        onClick: Requireable<any>;
        onMouseEnter: Requireable<any>;
        onMouseLeave: Requireable<any>;
        onKeyDown: Requireable<any>;
        showArrow: Requireable<any>;
        moveBy: Requireable<any>;
        hideDelay: Requireable<any>;
        showDelay: Requireable<any>;
        moveArrowTo: Requireable<any>;
        appendTo: Requireable<any>;
        timeout: Requireable<any>;
    };
    getPopperContentStructure(childrenObject: any): any;
    applyStylesToAppendedNode(props: any): void;
    wrapWithAnimations(popper: any): any;
    renderPopperContent(childrenObject: any): any;
    handlePortaledPopoverNode(props: any): void;
    componentDidMount(): void;
    render(): JSX.Element;
}
