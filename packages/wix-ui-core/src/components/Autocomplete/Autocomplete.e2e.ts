import * as eyes from 'eyes.it';
import {getStoryUrl, waitForVisibilityOf} from 'wix-ui-test-utils/protractor';
import {autocompleteTestkitFactory} from '../../testkit/protractor';
import {browser} from 'protractor';

describe('Autocomplete', () => {
  const storyUrl = getStoryUrl('Components', 'Autocomplete');
  const dataHook = 'storybook-autocomplete';

  beforeEach(() => browser.get(storyUrl));

  eyes.it('should open autocomplete when it focused', async () => {
    const driver = autocompleteTestkitFactory({dataHook});
    await waitForVisibilityOf(driver.element(), 'Cannot find Autocomplete');

    expect(driver.isOpen()).toBe(false);

    driver.focusInput();

    expect(driver.isOpen()).toBe(true);
    expect(driver.getOptionsCount()).toEqual(20);

    driver.enterText('very');
    expect(driver.getOptionsCount()).toEqual(1);

    expect(driver.getOptionText(0)).toBe('This is a very very very very very long option');
  });

  eyes.it('should choose one of autocomplete items', async () => {
    const driver = autocompleteTestkitFactory({dataHook});
    await waitForVisibilityOf(driver.element(), 'Cannot find Autocomplete');

    driver.focusInput();
    driver.selectOption(1);

    expect(driver.getText()).toBe('value1');
  });
});
