/// <reference types="react" />
import * as React from 'react';
import { BaseProps } from '../../types/BaseProps';
export interface ButtonProps extends BaseProps, React.ButtonHTMLAttributes<any> {
    /** Type of the button - submit / button / reset */
    type?: 'submit' | 'button' | 'reset';
}
/**
 * Button
 */
export declare const Button: React.SFC<ButtonProps>;
