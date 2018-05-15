import * as React from 'react';
import {badgeDriverFactory} from './Badge.driver.ts';
import {isEnzymeTestkitExists} from 'wix-ui-test-utils/enzyme';
import {createDriverFactory} from 'wix-ui-test-utils/driver-factory';
import {isTestkitExists} from 'wix-ui-test-utils/vanilla';
import {badgeTestkitFactory} from '../../testkit';
import {badgeTestkitFactory as enzymeBadgeTestkitFactory} from '../../testkit/enzyme';
import {mount} from 'enzyme';
import {Badge} from './index.ts';
import {expect} from 'chai';

describe('Badge', () => {
  const createDriver = createDriverFactory(badgeDriverFactory);

  describe('children', () => {
    it('should be rendered', () => {
      const content = (
        <div>
          <span>Delete</span>
          <i>?</i>
         </div>
      );

      const driver = createDriver(<Badge>{content}</Badge>);
      // throw new Error('sdfs');
      expect(driver.getContent()).to.contain(mount(content).html());
    });
  });
});
