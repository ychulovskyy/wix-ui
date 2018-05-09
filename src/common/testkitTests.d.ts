/// <reference types="react" />
import { WrapperData } from 'wix-ui-test-utils/enzyme';
import { BaseDriver } from 'wix-ui-test-utils/driver-factory';
export interface TestkitSuiteParams<T extends BaseDriver> {
    Element: React.ReactElement<any>;
    testkitFactory: (obj: {
        wrapper: any;
        dataHook: string;
    }) => T;
    enzymeTestkitFactory: (obj: WrapperData) => T;
}
export declare function runTestkitExistsSuite<T extends BaseDriver>(params: TestkitSuiteParams<T>): void;
