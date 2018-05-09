/// <reference types="react" />
import * as React from 'react';
import { Option } from '.';
export declare const generateOptions: (dividerFactory?: ({ className, value }?: Partial<{
    className: string;
    value: React.ReactNode;
}>) => Option) => Option[];
