import { ILocation } from 'wix-ui-test-utils/protractor';
import { BaseDriver, DriverFactory } from './../../common/BaseDriver.protractor';
export interface SliderDriver extends BaseDriver {
    getSliderValue: () => Promise<string>;
    getTooltipValue: () => Promise<string>;
    clickTrack: (position: ILocation) => Promise<void>;
    dragThumb: (position: ILocation) => Promise<void>;
    dragAndDropThumb: (position: ILocation) => Promise<void>;
}
export declare const sliderDriverFactory: DriverFactory<SliderDriver>;
