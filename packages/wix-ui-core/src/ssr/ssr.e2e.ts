import {browser} from 'protractor';
import {start} from './server';
import {waitForVisibilityOf} from 'wix-ui-test-utils/protractor';

export const baseURL = `http://localhost:3100`;
let server;


describe('React application', () => {
  beforeEach(async () => {
    server = await start(3100);
    browser.get(baseURL);
  });

  afterEach(async () => {
    await browser.close();
  });

  fit('should display yyyyyyyyy', async () => {
    waitForVisibilityOf(browser.$('div'), 'Cannot find Input');
  });
});
