/// <reference types="react" />
import * as React from 'react';
export interface TicksProps {
    pStyle: any;
    step: number;
    min: number;
    max: number;
    tickMarksShape: string;
    thumbSize: number;
    vertical: boolean;
    trackSize: number;
    onTickClick: (any) => void;
}
export declare class Ticks extends React.PureComponent<TicksProps> {
    calcMaximumTickDensity(): number;
    calcStep(): number;
    renderTick(i: any, min: any, max: any, vertical: any, thumbSize: any, pStyle: any): JSX.Element;
    render(): JSX.Element;
}
