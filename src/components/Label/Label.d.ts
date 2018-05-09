/// <reference types="react" />
import * as React from 'react';
export interface LabelProps {
    className?: string;
    /** Children */
    children?: string;
    /** For property */
    for?: string;
    /** ID of element */
    id?: string;
    /** should the text be ellipsed or not */
    ellipsis?: boolean;
    /** Is the Label disabled */
    disabled?: boolean;
}
/**
 * Label
 */
export declare const Label: React.SFC<LabelProps>;
