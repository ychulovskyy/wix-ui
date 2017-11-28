import React from 'react';
import {func, object, node, oneOfType} from 'prop-types';
import pickBy from 'lodash/pickBy';

class ThemeGenerator extends React.PureComponent {
  static propTypes = {
    render: func.isRequired,
    theme: oneOfType([func, object]).isRequired
  };

  constructor(props) {
    super(props);
    // eslint-disable-next-line no-unused-vars
    const {render, theme, ...propsForTheme} = props;
    this.state = {calculatedTheme: theme(propsForTheme)};
  }

  componentWillReceiveProps(nextProps) {
    // eslint-disable-next-line no-unused-vars
    const {render, theme, ...propsForTheme} = nextProps;

    const changedProps = pickBy(propsForTheme, (value, key) => this.props[key] !== value);

    if (Object.keys(changedProps).length > 0) {
      this.setState({calculatedTheme: theme(propsForTheme)});
    }
  }

  render() {
    return this.props.render(this.state);
  }
}

export const ThemedComponent = ({children, theme, ...propsForTheme}) => (
  <ThemeGenerator
    theme={theme}
    render={({calculatedTheme}) => React.cloneElement(children, {theme: calculatedTheme})}
    {...propsForTheme}
    />
);

ThemedComponent.propTypes = {
  children: node,
  theme: oneOfType([func, object])
};

ThemedComponent.defaultProps = {
  children: null,
  theme: () => {}
};

function getTheme(theme, params) {
  return typeof theme === 'function' ? theme(params) : theme;
}
