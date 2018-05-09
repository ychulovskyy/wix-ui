/// <reference types="react" />
import * as React from 'react';
export interface VBoxProps {
    children?: React.ReactNode;
    horizontalAlignment?: Alignment;
    spacing?: number;
}
export declare type Alignment = 'left' | 'center' | 'right';
/**
 * VBox
 */
export declare const VBox: React.SFC<VBoxProps>;
