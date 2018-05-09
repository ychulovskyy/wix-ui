import { BaseDriver, DriverFactory } from 'wix-ui-test-utils/driver-factory';
export interface TextDriver extends BaseDriver {
    hasEllipsis: () => boolean;
    hasTitleAttribute: () => boolean;
    getTitle: () => string;
    getTagName: () => string;
    getText: () => string;
}
export declare const textDriverFactory: DriverFactory<TextDriver>;
