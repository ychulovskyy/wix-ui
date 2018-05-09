import { BaseDriver, DriverFactory } from 'wix-ui-test-utils/driver-factory';
export interface ThumbnailDriver extends BaseDriver {
    hasSelectedIcon: () => boolean;
    click: () => void;
    isSelected: () => boolean;
    getContent: () => HTMLElement;
    getSelectedIcon: () => HTMLElement;
    isDisabled: () => boolean;
}
export declare const thumbnailDriverFactory: DriverFactory<ThumbnailDriver>;
