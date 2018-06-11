import * as React from 'React'
import { progressBarDriverFactory } from './ProgressBar.driver'
import { ReactDOMTestContainer } from '../../../test/dom-test-container';
import { ProgressBar } from './';

describe('ProgressBar', () => {

    const createDriver = new ReactDOMTestContainer().unmountAfterEachTest()
                        .createLegacyRenderer(progressBarDriverFactory);

    const defaultProps = {
        value: 40
    }                    

    it('should exist', () => {
        const driver = createDriver(<ProgressBar {...defaultProps} />);
        expect(driver.exists()).toBe(true);
    })

    it(`should set the foreground progress bar layer to ${defaultProps.value}%`, () => {
        const driver = createDriver(<ProgressBar {...defaultProps} />);
        expect(driver.getWidth()).toBe(`${defaultProps.value}%`);
    })

    describe('when error occures', () => {
        let driver;
        // getBackgroundColor: () => getProgressBarBackgroundStyle().color,
        // getForegroundColor: () => getProgressBarForeGroundStyle().color

        beforeEach(() => {
            const props = {...defaultProps, error: true};
            driver = createDriver(<ProgressBar {...props} />);
        })
        
        it('should show failure colors', () => {
            expect(driver.getForegroundColor()).toBe('red');
            expect(driver.getBackgroundColor()).toBe('pink');
        })
    })

});