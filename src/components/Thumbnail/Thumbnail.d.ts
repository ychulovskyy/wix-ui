/// <reference types="react" />
import * as React from 'react';
export interface ThumbnailProps {
    /** Is the thumbnail selected */
    selected?: boolean;
    /** Callback when the element is clicked */
    onClick?: React.EventHandler<React.MouseEvent<HTMLElement>>;
    /** Icon to display in when thumbnail is selected */
    selectedIcon?: React.ReactNode;
    /** Item to sit inside the Thumbnail */
    children?: React.ReactNode;
    /** Is the thumbnail disabled */
    disabled?: boolean;
}
export declare const Thumbnail: React.SFC<ThumbnailProps>;
