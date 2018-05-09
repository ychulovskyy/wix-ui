/// <reference types="react" />
import * as React from 'react';
import { Direction } from '../../types/index';
export interface HBoxProps {
    children?: React.ReactNode;
    verticalAlignment?: Alignment;
    spacing?: number;
    dir?: Direction;
}
export declare type Alignment = 'top' | 'center' | 'bottom';
/**
 * HBox
 */
export declare const HBox: React.SFC<HBoxProps>;
