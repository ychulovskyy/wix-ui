import * as React from 'react';
import {grouperDriverFactory} from './Grouper.driver';
import {isEnzymeTestkitExists} from 'wix-ui-test-utils/enzyme';
import {createDriverFactory} from 'wix-ui-test-utils/driver-factory';
import {isTestkitExists} from 'wix-ui-test-utils/vanilla';
import {grouperTestkitFactory} from '../../testkit';
import {grouperTestkitFactory as enzymeGrouperTestkitFactory} from '../../testkit/enzyme';
import {mount} from 'enzyme';
import {Grouper} from './';
import {ALIGNMENT} from './constants';

describe('Grouper', () => {

  const createDriver = createDriverFactory(grouperDriverFactory);
  const children = [1, 2, 3, 4, 5].map(x => <div key={x}>{x}</div>);

  describe('children prop', () => {
    it('should be rendered', () => {
      const driver = createDriver(<Grouper>{children}</Grouper>);
      expect(mount(<div>{children}</div>).html()).toContain(driver.getContent());
    });
  });

  describe('alignment prop', () => {
    it('should be horizontal by default', () => {
      const driver = createDriver(<Grouper>{children}</Grouper>);
      expect(driver.getAlignment()).toBe(ALIGNMENT.horizontal);
    });

    it('should be vertical', () => {
      const driver = createDriver(<Grouper alignment={ALIGNMENT.vertical}>{children}</Grouper>);
      expect(driver.getAlignment()).toBe(ALIGNMENT.vertical);
    });
  });

  describe('testkit', () => {
    it('should exist', () => {
      expect(isTestkitExists(<Grouper/>, grouperTestkitFactory)).toBe(true);
    });
  });

  describe('enzyme testkit', () => {
    it('should exist', () => {
      expect(isEnzymeTestkitExists(<Grouper/>, enzymeGrouperTestkitFactory, mount)).toBe(true);
    });
  });
});
