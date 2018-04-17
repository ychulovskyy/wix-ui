import * as React from 'react';
import {textAreaDriverFactory} from './TextArea.driver';
import {TextArea} from './';
import {createDriverFactory} from 'wix-ui-test-utils/driver-factory';
import {isEnzymeTestkitExists} from 'wix-ui-test-utils/enzyme';
import {isTestkitExists} from 'wix-ui-test-utils/vanilla';
import {mount} from 'enzyme';
import {textAreaTestkitFactory} from '../../testkit';
import {textAreaTestkitFactory as enzymeTextAreaTestkitFactory} from '../../testkit/enzyme';
import {innerInputDataHook} from './constants';

describe('TextArea', () => {
  const createDriver = createDriverFactory(textAreaDriverFactory);

  describe('value prop', () => {
    it('should set the value when value prop is sent', () => {
      const someValue = 'SOME_VALUE';
      const driver = createDriver(<TextArea value={someValue} />);
      expect(driver.getValue()).toEqual(someValue);
    });
  });

  describe('placeholder prop', () => {
    it('should be empty by default', () => {
      const driver = createDriver(<TextArea />);
      expect(driver.getPlaceholder()).toEqual('');
    });

    it('should set the placeholder when placeholder prop is sent', () => {
      const somePlaceholder = 'SOME_PLACEHOLDER';
      const driver = createDriver(<TextArea placeholder={somePlaceholder} />);
      expect(driver.getPlaceholder()).toEqual(somePlaceholder);
    });
  });

  describe('props callbacks', () => {
    [
      {prop: 'onFocus', cb: driver => driver.focus()},
      {prop: 'onBlur', cb: driver => driver.blur()},
      {prop: 'onKeyPress', cb: driver => driver.keyPress('k')}
    ].forEach(({prop, cb}) => {
      it(`should call the ${prop} handler when the event occurs`, () => {
        const onEvent = jest.fn();
        const props = {[prop]: onEvent};
        const driver = createDriver(<TextArea {...props} />);
        cb(driver);
        expect(onEvent).toBeCalled();
      });
    });
  });

  describe('focusChange class on TextArea element', () => {
    it('should not be present by default', () => {
      const driver = createDriver(<TextArea />);
      expect(driver.isFocusChangeClassPresent()).toEqual(false);
    });

    it('should be present after focus', () => {
      const driver = createDriver(<TextArea />);
      driver.focus();
      expect(driver.isFocusChangeClassPresent()).toEqual(true);
    });

    it('should be present after blur', () => {
      const driver = createDriver(<TextArea autoFocus={true} />);
      driver.blur();
      expect(driver.isFocusChangeClassPresent()).toEqual(true);
    });

    it('should not be present after text change', () => {
      class ManagedTextArea extends React.Component<{}, {val: string}> {
        render() {
          return (<TextArea
            value={(this.state && this.state.val) || ''}
            onChange={e => this.setState({val: e.target.value})} />);
        }
      }

      const driver = createDriver(<ManagedTextArea />);

      driver.focus();
      driver.enterText('TEXT');
      expect(driver.getValue()).toEqual('TEXT');
      expect(driver.isFocusChangeClassPresent()).toEqual(false);
    });
  });

  it('should get the value on changeEvent when value is changed', () => {
    let captured;
    const value = 'newValue';
    const onChange = e => captured = e.target.value;
    const driver = createDriver(<TextArea onChange={onChange} value={''} />);
    driver.enterText(value);
    expect(captured).toEqual(value);
  });

  it('should select all text when user focused the window', () => {
    const value = 'newValue';
    const driver = createDriver(<TextArea value={value} />);
    driver.focus();
    expect(driver.getSelection()).toEqual(value);
  });

  it('should auto focus when prop is passed', () => {
    const driver = createDriver(<TextArea value={''} autoFocus />);
    driver.focus();
    expect(document.activeElement.getAttribute('data-hook')).toBe(innerInputDataHook);
  });

  describe('validation error', () => {
    it('should not display error message by default', () => {
      const driver = createDriver(<TextArea errorMessage={'should NOT be displayed'} />);
      expect(driver.getErrorText()).toBeNull();
    });

    it('should not display error message when error prop is false', () => {
      const driver = createDriver(<TextArea errorMessage={'should NOT be displayed'} isError={false} />);
      expect(driver.getErrorText()).toBeNull();
    });

    it('should not display error message when error message is empty', () => {
      let driver = createDriver(<TextArea errorMessage={''} isError />);
      expect(driver.getErrorText()).toBeNull();

      driver = createDriver(<TextArea isError />);
      expect(driver.getErrorText()).toBeNull();
    });

    it('should display error message when error prop is true and error message is not empty', () => {
      const driver = createDriver(<TextArea errorMessage={'should be displayed'} isError />);
      expect(driver.getErrorText()).toBe('should be displayed');
    });

    it('should not render an error when in disabled state', () => {
      const driver = createDriver(<TextArea disabled errorMessage={'should NOT be displayed'} isError />);
      expect(driver.getErrorText()).toBeNull();
      expect(driver.isDisabled()).toBe(true);
    });
  });

  describe('testkit', () => {
    it('should exist', () => {
      expect(isTestkitExists(<TextArea />, textAreaTestkitFactory)).toBe(true);
    });
  });

  describe('enzyme testkit', () => {
    it('should exist', () => {
      expect(isEnzymeTestkitExists(<TextArea />, enzymeTextAreaTestkitFactory, mount)).toBe(true);
    });
  });
});
