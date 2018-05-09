/// <reference types="react" />
import * as React from 'react';
import { InjectedOnClickOutProps } from 'react-onclickoutside';
import { Placement, AppendTo } from '../Popover';
import { Requireable } from 'prop-types';
import { ElementProps } from '../../utils';
export declare type Point = {
    x: number;
    y: number;
};
export interface TooltipProps {
    /** tooltip's placement in relation to the target element */
    placement?: Placement;
    /** children to render that will be the target of the tooltip */
    children?: React.ReactNode;
    /** the content to put inside the tooltip */
    content?: React.ReactNode;
    /** object that describes re-positioning of the tooltip */
    moveBy?: Point;
    /** offset for the arrow */
    moveArrowTo?: number;
    /** callback to call when the tooltip is shown */
    onShow?: Function;
    /** callback to call when the tooltip is being hidden */
    onHide?: Function;
    /** Enables calculations in relation to the parent element*/
    appendTo?: AppendTo;
    /** Provides callback to invoke when outside of tooltip is clicked */
    onClickOutside?: Function;
    /** If true, makes tooltip close when clicked outside (incase it was open) */
    shouldCloseOnClickOutside?: boolean;
    /** Animation timer */
    timeout?: number;
    /** If true, shows the tooltip arrow */
    showArrow?: boolean;
}
export interface TooltipState {
    isOpen: boolean;
}
/**
 * Tooltip
 */
export declare class TooltipComponent extends React.PureComponent<TooltipProps & InjectedOnClickOutProps, TooltipState> {
    static Element: React.SFC<ElementProps>;
    static Content: React.SFC<ElementProps>;
    static displayName: string;
    static defaultProps: {
        placement: string;
        onShow: () => any;
        onHide: () => any;
        timeout: number;
        showArrow: boolean;
    };
    static propTypes: {
        placement: Requireable<any>;
        children: Requireable<any>;
        content: Requireable<any>;
        moveBy: Requireable<any>;
        moveArrowTo: Requireable<any>;
        onShow: Requireable<any>;
        onHide: Requireable<any>;
        appendTo: Requireable<any>;
        onClickOutside: Requireable<any>;
        shouldCloseOnClickOutside: Requireable<any>;
        timeout: Requireable<any>;
        showArrow: Requireable<any>;
    };
    constructor(props: TooltipProps & InjectedOnClickOutProps);
    handleClickOutside(): void;
    open(): void;
    close(): void;
    render(): JSX.Element;
}
export declare const Tooltip: React.ComponentClass<any>;
