import { BaseDriver, DriverFactory } from 'wix-ui-test-utils/driver-factory';
export interface ButtonDriver extends BaseDriver {
    /** click on the button root element */
    click: () => any;
    /** returns elements type attribute */
    getType: () => any;
    /** returns elements textContent */
    getTextContent: () => any;
    /** returns if the element is disabled */
    isDisabled: () => boolean;
    styles: {
        /** returns elements min-width css property */
        getMinWidth: () => string;
        /** returns elements width css property */
        getWidth: () => string;
        /** returns elements height css property */
        getHeight: () => string;
        /** returns elements padding css property */
        getPadding: () => string;
        /** returns elements border-radius css property */
        getBorderRadius: () => string;
    };
}
export declare const buttonDriverFactory: DriverFactory<ButtonDriver>;
