import {browser} from 'protractor';
import {start} from './server';
import {waitForVisibilityOf} from 'wix-ui-test-utils/protractor';

export const baseURL = `http://localhost:3100`;
let server;


describe('SSR', () => {
  beforeEach(async () => {
    server = await start(3100);
    browser.get(baseURL);
  });

  afterEach(async () => {
    await browser.close();
  });

  it('should display components', async () => {
    waitForVisibilityOf(browser.$('div'), 'There is a problem with SSR');
  });
});
