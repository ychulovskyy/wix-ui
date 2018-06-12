import * as eyes from 'eyes.it';
import {browser} from 'protractor';
import {getStoryUrl, waitForVisibilityOf} from 'wix-ui-test-utils/protractor';
import {linearProgressBarTestkitFactory, LinearProgressBarDriver} from '../../testkit/protractor';

describe('LinearProgresBar', () => {
  const storyUrl = getStoryUrl('Components', 'LinearProgressBar');
  const dataHook = 'progress-bar';
  let driver: LinearProgressBarDriver;

  beforeEach(() => {
    browser.get(storyUrl)
    driver = linearProgressBarTestkitFactory({dataHook});
  });
  
  eyes.it('should display correct content', async() => {
    await waitForVisibilityOf(driver.element(), 'Cannot find LinearProgressBar');
  });
});
