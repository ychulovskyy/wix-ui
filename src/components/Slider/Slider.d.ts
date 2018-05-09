/// <reference types="react" />
import * as React from 'react';
export interface SliderProps {
    min?: number;
    max?: number;
    value?: number;
    onChange?: (x: any) => void;
    onBlur?: (x: any) => void;
    onFocus?: (x: any) => void;
    orientation?: 'horizontal' | 'vertical';
    step?: number;
    stepType?: 'value' | 'count';
    tooltipPosition?: 'normal' | 'across';
    tooltipVisibility?: 'none' | 'always' | 'hover';
    tickMarksPosition?: 'normal' | 'middle' | 'across';
    tickMarksShape?: 'none' | 'line' | 'dot';
    tooltipPrefix?: string;
    tooltipSuffix?: string;
    trackSize?: number;
    thumbShape?: 'circle' | 'square' | 'rectangle' | 'bar';
    disabled?: boolean;
    readOnly?: boolean;
    dir?: string;
}
export interface Rect {
    left?: number;
    right?: number;
    top?: number;
    bottom?: number;
    width?: number;
    height?: number;
}
export interface SliderState {
    dragging: boolean;
    mouseDown: boolean;
    thumbHover: boolean;
    step: number;
    innerRect: Rect;
    trackRect: Rect;
}
export declare class Slider extends React.PureComponent<SliderProps, SliderState> {
    inner: HTMLDivElement;
    track: HTMLDivElement;
    ContinuousStep: number;
    static propTypes: Object;
    static defaultProps: {
        min: number;
        max: number;
        value: number;
        stepType: string;
        thumbShape: string;
        orientation: string;
        disabled: boolean;
        readOnly: boolean;
        tooltipVisibility: string;
        tooltipPosition: string;
        tooltipPrefix: string;
        tooltipSuffix: string;
        tickMarksPosition: string;
        tickMarksShape: string;
        dir: string;
    };
    constructor(props: any);
    updateLayout(): void;
    componentDidMount(): void;
    componentWillUnmount(): void;
    componentDidUpdate(prevProps: any): void;
    getStartPos(): "right" | "left";
    calcDiscreteStepValue(min: any, max: any, step: any, stepType: any): any;
    calcContinuousStepValue(min: any, max: any, sliderSize: any): number;
    calcStepValue(min: any, max: any, step: any, stepType: any, sliderSize: any): any;
    isShallowEqual(v: any, o: any): boolean;
    getSliderSize(): number;
    getSliderLength(): number;
    getThumbSize(): any;
    getThumbSizeMainAxis(): any;
    getThumbSizeCrossAxis(): any;
    setInnerNode: (inner: any) => void;
    setTrackNode: (track: any) => void;
    handleMouseDown: () => void;
    handleMouseUp: () => void;
    handleKeyDown: (ev: any) => void;
    handleMouseMove: (ev: any) => void;
    handleChange(value: any): void;
    handleThumbEnter: () => void;
    handleThumbLeave: () => void;
    clamp(val: any, min: any, max: any): number;
    isRtl(): boolean;
    isVertical(): boolean;
    isContinuous(): boolean;
    moveThumbByMouse: (ev: any) => void;
    shouldShowTooltip(): boolean;
    calcThumbProgressPosition(): string;
    calcTrackFillPosition(): string;
    calcThumbCrossPosition(): string;
    calcThumbPosition(): {
        bottom: string;
        left: number;
        top?: undefined;
    } | {
        [x: string]: React.ReactText;
        top: number;
        bottom?: undefined;
        left?: undefined;
    };
    floorValue(value: any, precision?: number): number;
    renderTooltip(): JSX.Element;
    render(): JSX.Element;
}
