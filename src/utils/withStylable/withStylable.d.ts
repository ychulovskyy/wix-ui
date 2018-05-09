/// <reference types="react" />
import * as React from 'react';
export declare function withStylable<CoreProps, ExtendedProps = {}>(Component: React.ComponentClass<CoreProps>, stylesheet: RuntimeStylesheet, getState: (p?: any, s?: any, c?: any) => StateMap, extendedDefaultProps?: object): React.ComponentClass<CoreProps & ExtendedProps>;
export declare function withStylable<CoreProps, ExtendedProps = {}>(Component: React.SFC<CoreProps>, stylesheet: RuntimeStylesheet, getState: (p?: any) => StateMap, extendedDefaultProps?: object): React.SFC<CoreProps & ExtendedProps>;
