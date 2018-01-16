import * as React from 'react';
import {checkboxDriverFactory} from './Checkbox.driver';
import {createDriverFactory, isTestkitExists, isEnzymeTestkitExists} from 'wix-ui-test-utils';
// import {core, CheckboxTheme} from './theme';
import {mount} from 'enzyme';
import {checkboxTestkitFactory} from '../../testkit';
import {checkboxTestkitFactory as enzymeCheckboxTestkitFactory} from '../../testkit/enzyme';
import {Checkbox} from './';

describe('Checkbox', () => {

  const createDriver = createDriverFactory(checkboxDriverFactory);

  describe('type prop', () => {
    it('should be passed down', () => {
      const type = 'checkbox';
      const driver = createDriver(<Checkbox type={type}/>);
      expect(driver.getType()).toBe(type);
    });
  });

  // describe('onClick prop', () => {
  //   it('should be called on click', () => {
  //     const onClick = jest.fn();
  //     const driver = createDriver(<Checkbox onClick={onClick}/>);
  //     driver.click();
  //     expect(onClick).toBeCalled();
  //   });
  // });

  // describe('onMouseEnter prop', () => {
  //   it('should be called on mouse enter', () => {
  //     const onMouseEnter = jest.fn();
  //     const driver = createDriver(<Checkbox onMouseEnter={onMouseEnter}/>);
  //     driver.mouseEnter();
  //     expect(onMouseEnter).toBeCalled();
  //   });
  // });

  // describe('onMouseLeave prop', () => {
  //   it('should be called on mouse leave', () => {
  //     const onMouseLeave = jest.fn();
  //     const driver = createDriver(<Checkbox onMouseLeave={onMouseLeave}/>);
  //     driver.mouseLeave();
  //     expect(onMouseLeave).toBeCalled();
  //   });
  // });

  // describe('disabled prop', () => {
  //   it('should be falsy by default', () => {
  //     const driver = createDriver(<Checkbox/>);
  //     expect(driver.isDisabled()).toBe(false);
  //   });

  //   it('should not call onClick when truthy', () => {
  //     const onClick = jest.fn();
  //     const driver = createDriver(<Checkbox onClick={onClick} disabled/>);
  //     driver.click();
  //     expect(driver.isDisabled()).toBe(true);
  //     expect(onClick).toHaveBeenCalledTimes(0);
  //   });
  // });

  // describe('children', () => {
  //   it('should be rendered', () => {
  //     const content = 'Click me';
  //     const driver = createDriver(<Checkbox>{content}</Checkbox>);
  //     expect(driver.getTextContent()).toBe(content);
  //   });
  // });

  // describe('style', () => {
  //   it('should have default styles', () => {
  //     const driver = createDriver(<Checkbox/>);
  //     expect(driver.styles.getHeight()).toBe(core.height);
  //     expect(driver.styles.getPadding()).toBe(core.padding);
  //     expect(driver.styles.getBorderRadius()).toBe(core.borderRadius);
  //   });

  //   it('should override default height', () => {
  //     const theme: CheckboxTheme = {
  //       minWidth: '15px',
  //       width: '15px',
  //       height: '78px',
  //       padding: '15px',
  //       contentPadding: '16px',
  //       borderRadius: '3px'
  //     };
  //     const driver = createDriver(<Checkbox theme={theme}></Checkbox>);
  //     expect(driver.styles.getMinWidth()).toBe(theme.minWidth);
  //     expect(driver.styles.getWidth()).toBe(theme.width);
  //     expect(driver.styles.getHeight()).toBe(theme.height);
  //     expect(driver.styles.getPadding()).toBe(theme.padding);
  //     expect(driver.styles.getBorderRadius()).toBe(theme.borderRadius);
  //   });
  // });

  // describe('testkit', () => {
  //   it('should exist', () => {
  //     expect(isTestkitExists(<Checkbox/>, checkboxTestkitFactory)).toBe(true);
  //   });
  // });

  // describe('enzyme testkit', () => {
  //   it('should exist', () => {
  //     expect(isEnzymeTestkitExists(<Checkbox/>, enzymeCheckboxTestkitFactory, mount)).toBe(true);
  //   });
  // });
});
