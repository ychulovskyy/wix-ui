import React from 'react';
import {string, func} from 'prop-types';

export const isClassExists = (element, className) =>
!!element && !!element.className.match(new RegExp('\\b' + className + '\\b'));

// HOC that makes underlying component "controlled"
export function makeControlled(Component) {
  return class ControlledComponent extends React.Component {
    static displayName = `Controlled${Component.name}`;
    static propTypes = {
      value: string,
      onChange: func
    };

    static defaultProps = {value: ''};

    constructor(props) {
      super(props);
      this.state = {value: props.value};
    }

    _onChange = e => {
      const {
        onChange
      } = this.props;

      this.setState({
        value: e.target.value
      });

      onChange && onChange(e);
    };

    render() {
      const bindedPropMethods = {};

      for (const propName of Object.keys(this.props)) {
        const propValue = this.props[propName];

        if (typeof propValue === 'function') {
          bindedPropMethods[propName] = this.props[propName].bind(this);  // eslint-disable-line react/jsx-no-bind
        }
      }

      return (
        <Component
          {...this.props}
          {...bindedPropMethods}
          value={this.state.value}
          onChange={this._onChange}
          />
      );
    }
  };
}
