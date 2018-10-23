import React from 'react';
import {mount} from 'enzyme';

import AutoTestkit from './';

class Driver {
  component;
  defaultProps;

  constructor(defaultProps) {
    this.defaultProps = defaultProps;
  }

  when = {
    created: (props = {}) => {
      this.component = mount(
        React.createElement(AutoTestkit, {...this.defaultProps, ...props})
      );
      return this.component;
    }
  };

  get = {
    root: () => this.component.children(),
    numRows: () => this.component.find('tr').length,
    debug: () => console.log(this.component.debug())
  };
}

const testkitMetadata = {
  file: 'some-testkit.js',
  descriptor: [
    {name: 'click', args: [], type: 'function'},
    {name: 'double click', args: [], type: 'function'}
  ]
};

const driver = new Driver({
  testkitMetadata
});

describe('AutoTestkit', () => {
  it('should have displayName', () => {
    expect(AutoTestkit.displayName).toBe('AutoTestkit');
  });

  it('should render table', () => {
    driver.when.created();
    expect(driver.get.root().type()).toBe('table');
  });

  describe('`testkitMetadata` prop', () => {
    describe('when descriptor.length === 0', () => {
      it('should not render table', () => {
        driver.when.created({
          testkitMetadata: {
            ...testkitMetadata,
            descriptor: []
          }
        });
        expect(driver.get.numRows()).toBe(0);
      });
    });

    describe('when descriptor.length > 0', () => {
      it('should render rows for each entry', () => {
        driver.when.created({testkitMetadata});
        expect(driver.get.numRows()).toBe(2);
      });
    });
  });
});
