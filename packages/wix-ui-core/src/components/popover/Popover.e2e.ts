import * as eyes from 'eyes.it';
import {browser} from 'protractor';
import {createStoryUrl, waitForVisibilityOf, scrollToElement} from 'wix-ui-test-utils/protractor';
import * as autoExampleDriver from 'wix-storybook-utils/AutoExampleDriver';
import {popoverTestkitFactory} from '../../testkit/protractor';

// Scroll to the bottom of a container
const scrollToBottom = async dataHook => {
  await browser.executeScript(
    `document.querySelector('[data-hook="${dataHook}"]').scrollTop = 100`,
  );
};

describe('Popover', () => {
  const storyUrl = createStoryUrl({
    kind: 'Components',
    story: 'Popover',
    withExamples: true
  });

  const createDriver = async dataHook => {
    const driver = popoverTestkitFactory({ dataHook });

    await waitForVisibilityOf(
      driver.element(),
      `Cannot find Popover component ${dataHook}`,
    );

    await scrollToElement(driver.element());
    return driver;
  };

  beforeAll(() => {
    browser.get(storyUrl)
  });

  beforeEach(async () => {
    await autoExampleDriver.reset();
  });

  eyes.it('should exist', async () => {
    const driver = await createDriver('storybook-popover');

    expect(await driver.element().isPresent()).toBe(true);
    await autoExampleDriver.setProps({shown: true});
  });

  describe('Flip behaviour', () => {
    beforeAll(async () => {
      await createDriver('story-popover-flip-behaviour');
    });

    eyes.it('flip enabled (default)', async () => {
      await scrollToBottom('story-popover-flip-enabled');
    });

    eyes.it('flip disabled', async () => {
      await scrollToBottom('story-popover-flip-disabled');
    });
  });

  describe('Fixed behaviour', () => {
    beforeAll(async () => {
      await createDriver('story-popover-fixed-behaviour');
    });

    eyes.it('fixed disabled (default)', async () => {
      await scrollToBottom('story-popover-fixed-disabled');
    });

    eyes.it('fixed enabled', async () => {
      await scrollToBottom('story-popover-flip-enabled');
    });
  });
});
