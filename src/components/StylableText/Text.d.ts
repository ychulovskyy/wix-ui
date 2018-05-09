/// <reference types="react" />
import * as React from 'react';
export interface TextProps {
    children?: React.ReactNode;
    ellipsis?: boolean;
    forceHideTitle?: boolean;
    tagName?: string;
    className?: string;
}
/**
 * Text
 */
export declare const Text: React.SFC<TextProps>;
