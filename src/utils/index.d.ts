/// <reference types="react" />
import * as React from 'react';
export declare const buildChildrenObject: <T>(children: React.ReactNode, childrenObject: T) => T;
export interface ElementProps {
    children: any;
}
export declare const createComponentThatRendersItsChildren: (displayName: string) => React.StatelessComponent<ElementProps>;
export declare const noop: () => any;
