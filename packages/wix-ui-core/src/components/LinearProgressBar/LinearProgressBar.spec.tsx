import * as React from 'React'
import { linearProgressBarDriverFactory } from './LinearProgressBar.driver'
import { ReactDOMTestContainer } from '../../../test/dom-test-container';
import { LinearProgressBar } from './';
import { LinearProgressBarProps } from './LinearProgressBar';
import { runTestkitExistsSuite } from '../../common/testkitTests';
import { linearProgressBarTestkitFactory } from '../../testkit';
import { linearProgressBarTestkitFactory as enzymeLinearProgressBarTestkitFactory } from '../../testkit/enzyme';

describe('ProgressBar', () => {

  const createDriver = new ReactDOMTestContainer().unmountAfterEachTest()
    .createLegacyRenderer(linearProgressBarDriverFactory);

  const defaultProps = {
    value: 40
  }

  it('should exist', () => {
    const driver = createDriver(<LinearProgressBar {...defaultProps} />);
    expect(driver.exists()).toBe(true);
  })

  it(`should set the foreground progress bar layer to ${defaultProps.value}%`, () => {
    const driver = createDriver(<LinearProgressBar {...defaultProps} />);
    expect(driver.getWidth()).toBe(`${defaultProps.value}%`);
  })

  it('should show progress colors with no failure', () => {
    const driver = createDriver(<LinearProgressBar {...defaultProps} />);
    expect(driver.getForegroundColor()).toBe('rgb(0, 0, 0)');
    expect(driver.getBackgroundColor()).toBe('rgb(227, 228, 227)');
  })

  it('should not show success icon when reaching 100%', () => {
    const driver = createDriver(<LinearProgressBar {...{ ...defaultProps, value: 100 }} />);
    expect(driver.isSuccessIconDisplayed()).toBe(false);
  })

  it('should not show percentages value while in progress', () => {
    const driver = createDriver(<LinearProgressBar {...{ ...defaultProps, value: 50 }} />);
    expect(driver.isPercentagesProgressDisplayed()).toBe(false);
  })

  it('should not show error icon while in progress', () => {
    const driver = createDriver(<LinearProgressBar {...{ ...defaultProps, error: true }} />);
    expect(driver.isErrorIconDisplayed()).toBe(false);
  })

  describe('when with progress indication', () => {
    let driver;
    let props: LinearProgressBarProps = defaultProps;

    beforeEach(() => {
      props = { ...defaultProps, showProgressIndication: true };
    });

    it('should show success icon when reaching 100%', () => {
      driver = createDriver(<LinearProgressBar {...{ ...props, value: 100, successIcon: <div /> }} />);
      expect(driver.isSuccessIconDisplayed()).toBe(true);
    })

    it('should not show success icon when reaching 100% and icon not provided', () => {
      driver = createDriver(<LinearProgressBar {...{ ...props, value: 100 }} />);
      expect(driver.isSuccessIconDisplayed()).toBe(false);
    })

    it('should show error icon on failure ', () => {
      driver = createDriver(<LinearProgressBar {...{ ...props, error: true, errorIcon: <div /> }} />);
      expect(driver.isErrorIconDisplayed()).toBe(true);
    })

    it('should now show error icon on failure when icon not provided', () => {
      driver = createDriver(<LinearProgressBar {...{ ...props, error: true, errorIcon: null }} />);
      expect(driver.isErrorIconDisplayed()).toBe(false);
    })

    it('should show percentages value while in progress', () => {
      driver = createDriver(<LinearProgressBar {...{ ...props, value: 50 }} />);
      expect(driver.getPercentagesProgressText()).toBe('50%');
    })
  });

  describe('when error occures', () => {
    let driver;

    beforeEach(() => {
      const props = { ...defaultProps, error: true };
      driver = createDriver(<LinearProgressBar {...props} />);
    })

    it('should show failure colors', () => {
      expect(driver.getForegroundColor()).toBe('rgb(223, 61, 61)');
      expect(driver.getBackgroundColor()).toBe('rgb(231, 182, 182)');
    })
  })

  runTestkitExistsSuite({
    Element: <LinearProgressBar value={0} />,
    testkitFactory: linearProgressBarTestkitFactory,
    enzymeTestkitFactory: enzymeLinearProgressBarTestkitFactory
  });
});