import React from 'react';
import {func, node} from 'prop-types';
import pickBy from 'lodash/pickBy';

class ThemeGenerator extends React.PureComponent {
  static propTypes = {
    children: func.isRequired,
    theme: func.isRequired
  };

  constructor(props) {
    super(props);
    // eslint-disable-next-line no-unused-vars
    const {children, theme, ...propsForTheme} = props;
    this.state = {calculatedTheme: theme(propsForTheme)};
  }

  componentWillReceiveProps(nextProps) {
    // eslint-disable-next-line no-unused-vars
    const {children, theme, ...propsForTheme} = nextProps;

    const changedProps = pickBy(propsForTheme, (value, key) => this.props[key] !== value);

    if (Object.keys(changedProps).length > 0) {
      this.setState({calculatedTheme: theme(propsForTheme)});
    }
  }

  render() {
    return (
      <div>{this.props.children(this.state)}</div>
    );
  }
}

export const ThemedComponent = ({children, theme, ...propsForTheme}) => (
  <ThemeGenerator theme={theme} {...propsForTheme}>
    {({calculatedTheme}) => React.cloneElement(children, {theme: calculatedTheme})}
  </ThemeGenerator>
);

ThemedComponent.propTypes = {
  children: node,
  theme: func
};

ThemedComponent.defaultProps = {
  children: null,
  theme: () => {}
};

