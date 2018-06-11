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

    it('should show progress colors with no failure', () => {
        const driver = createDriver(<ProgressBar {...defaultProps} />);
        expect(driver.getForegroundColor()).toBe('rgb(0, 0, 0)');
        expect(driver.getBackgroundColor()).toBe('rgb(227, 228, 227)');
    })

    it('should show success icon when reaching 100%', () => {
        const driver = createDriver(<ProgressBar {...{...defaultProps, value: 100}} />);
        expect(driver.isSuccessIconDisplayed()).toBe(true);
    })

    describe('when error occures', () => {
        let driver;
        
        beforeEach(() => {
            const props = {...defaultProps, error: true};
            driver = createDriver(<ProgressBar {...props} />);
        })
        
        it('should show failure colors', () => {
            expect(driver.getForegroundColor()).toBe('rgb(223, 61, 61)');
            expect(driver.getBackgroundColor()).toBe('rgb(231, 182, 182)');
        })
    })

});