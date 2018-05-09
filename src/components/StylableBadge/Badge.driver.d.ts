import { ComponentFactory, BaseDriver } from "wix-ui-test-utils/driver-factory";
export interface BadgeDriver extends BaseDriver {
    /** returns elements innerHtml */
    getContent: () => string;
    /** returns elements innerText */
    text: () => string;
}
export declare const badgeDriverFactory: ({ element }: ComponentFactory) => BadgeDriver;
