import * as React from 'react';
import {enzymeTestkitFactoryCreator, isEnzymeTestkitExists} from '../src/enzyme';
import {isTestkitExists, testkitFactoryCreator} from '../src/vanilla';
import {DriverFactory} from '../src/driver-factory';
import {mount} from 'enzyme';

describe('isTestkitExists', () => {
  const MyComp: React.StatelessComponent = () => (<div></div>);
  const driver: DriverFactory<{exists: () => boolean}> = element => {
    return {
      exists: () => !!element
    };
  };

  it('vanilla should exist', () => {
    expect(isTestkitExists(<MyComp/>, testkitFactoryCreator(driver))).toEqual(true);
  });

  it('vanilla should exist using data-hook only', () => {
    expect(isTestkitExists(<MyComp/>, testkitFactoryCreator(driver), {dataHookPropName: 'data-hook'})).toEqual(true);
  });

  it('enzyme should exist', () => {
    expect(isEnzymeTestkitExists(<MyComp/>, enzymeTestkitFactoryCreator(driver), mount)).toEqual(true);
  });

  it('enzyme should exist without data-hook value', () => {
    expect(isEnzymeTestkitExists(<MyComp/>, enzymeTestkitFactoryCreator(driver), mount, {withoutDataHook: true})).toEqual(true);
  });

  it('enzyme should exist using data-hook prop name only', () => {
    expect(isEnzymeTestkitExists(<MyComp/>, enzymeTestkitFactoryCreator(driver), mount, {dataHookPropName: 'data-hook'})).toEqual(true);
  });
});
