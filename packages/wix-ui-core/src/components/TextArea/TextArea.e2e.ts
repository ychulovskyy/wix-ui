import * as eyes from 'eyes.it';
import {browser} from 'protractor';
import {getStoryUrl, waitForVisibilityOf} from 'wix-ui-test-utils/protractor';
import {sleep} from 'wix-ui-test-utils/react-helpers';
import {textAreaTestkitFactory} from '../../testkit/protractor';
import range = require('lodash/range');
import {DEFAULT_MAX_ROWS, DEFAULT_MAX_ROWS_FOCUS} from './constants';
// import {disableTransitions} from '../../test/protractor-utils';
import * as autoExampleDriver from 'wix-storybook-utils/AutoExampleDriver';
import {TextAreaProps} from '.';

describe('TextArea', () => {
  const storyUrl = getStoryUrl('Components', 'TextArea');
  const dataHook = 'storybook-textarea';

  beforeEach(async () => {
    await browser.get(storyUrl);
    // await disableTransitions();
  });

  // eyes.it('basic input test', async () => {
  //   const driver = textAreaTestkitFactory({dataHook});
  //   await waitForVisibilityOf(driver.textareaElement(), 'Cannot find TextArea');

  //   await driver.hover();
  //   eyes.checkWindow('onHover');
  //   await driver.enterText('foobar');
  //   expect(driver.textareaElement().getText()).toBe('foobar');
  // });

  // eyes.it('should expand in height when putting two lines', async () => {
  //   const driver = textAreaTestkitFactory({dataHook});
  //   await waitForVisibilityOf(driver.textareaElement(), 'Cannot find TextArea');

  //   const origHeight = await driver.getHeight();
  //   await driver.enterText('first line');
  //   await expect(driver.getHeight()).toEqual(origHeight);
  //   await driver.enterText('\nsecond line');
  //   await expect(driver.getHeight()).not.toEqual(origHeight);
  // });

  // eyes.it(`should only show max ${DEFAULT_MAX_ROWS} rows when out of focus`, async () => {
  //   const driver = textAreaTestkitFactory({dataHook});
  //   await waitForVisibilityOf(driver.textareaElement(), 'Cannot find TextArea');

  //   const maxBlurLines = range(0, DEFAULT_MAX_ROWS).map(i => `${i}`).join('\n');
  //   await driver.enterText(maxBlurLines);
  //   const maxBlurHeight = await driver.getHeight();
  //   await driver.enterText('\nmore\nlines');
  //   await expect(driver.getHeight()).not.toEqual(maxBlurHeight);

  //   await driver.blur();
  //   await expect(driver.getHeight()).toEqual(maxBlurHeight);
  // });

  // eyes.it(`should not expand beyond ${DEFAULT_MAX_ROWS_FOCUS} rows`, async () => {
  //   const driver = textAreaTestkitFactory({dataHook});
  //   await waitForVisibilityOf(driver.textareaElement(), 'Cannot find TextArea');

  //   const lines = range(0, DEFAULT_MAX_ROWS_FOCUS).map(i => `${i}`).join('\n');
  //   await driver.enterText(lines);
  //   const maxFocusHeight = await driver.getHeight();
  //   await driver.enterText('\nmore\nlines');
  //   await expect(driver.getHeight()).toEqual(maxFocusHeight);
  // });

  // eyes.it('should scroll to the top when out of focus', async () => {
  //   const driver = textAreaTestkitFactory({dataHook});
  //   await waitForVisibilityOf(driver.textareaElement(), 'Cannot find TextArea');

  //   const lines = range(0, DEFAULT_MAX_ROWS_FOCUS + 4).map(i => `${i}`).join('\n');
  //   await driver.enterText(lines);
  //   await expect(driver.textareaElement().getAttribute('scrollTop')).toBeGreaterThan(0);
  //   await driver.blur();
  //   await expect(driver.textareaElement().getAttribute('scrollTop')).toEqual('0');
  // });

  // eyes.it('should not accept input in disabled mode', async () => {
  //   const driver = textAreaTestkitFactory({dataHook});
  //   await waitForVisibilityOf(driver.textareaElement(), 'Cannot find TextArea');
  //   await autoExampleDriver.setProps({disabled: true});
  //   expect(driver.isDisabled()).toBe(true);
  // });

  // eyes.it('should show error message when set in props', async () => {
  //   const driver = textAreaTestkitFactory({dataHook});
  //   expect(await driver.getErrorText()).toBe('');
  //   const props: TextAreaProps = {isError: true, errorMessage: 'THIS IS ERROR'};
  //   await autoExampleDriver.setProps(props);
  //   expect(await driver.getErrorText()).toBe('THIS IS ERROR');
  // });
});
