/// <reference types="react" />
import * as React from 'react';
import * as PropTypes from 'prop-types';
export interface ThumbProps {
    shape: string;
    thumbPosition: React.CSSProperties;
    thumbSize: React.CSSProperties;
    onMouseEnter: any;
    onMouseLeave: any;
}
export declare class Thumb extends React.Component<ThumbProps> {
    static propTypes: {
        shape: PropTypes.Validator<any>;
        thumbPosition: PropTypes.Validator<any>;
        thumbSize: PropTypes.Validator<any>;
        onMouseEnter: PropTypes.Validator<any>;
        onMouseLeave: PropTypes.Validator<any>;
    };
    render(): JSX.Element;
}
export declare function getThumbSize(shape: string, ...rest: any[]): any;
