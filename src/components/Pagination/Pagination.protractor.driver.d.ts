import { BaseDriver, DriverFactory } from './../../common/BaseDriver.protractor';
export interface PaginationDriver extends BaseDriver {
    /** Returns x & y coordinates for the element found with data-hook */
    getElementLocation: (dataHook: string) => Promise<{
        x: number;
        y: number;
    }>;
    /** Returns width & height for the element found with data-hook */
    getElementSize: (dataHook: string) => Promise<{
        width: number;
        height: number;
    }>;
    /** Get the text content of pages shown in "pages" mode  */
    getPageList: () => Promise<string[]>;
}
export declare const paginationDriverFactory: DriverFactory<PaginationDriver>;
