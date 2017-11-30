import * as React from 'react';
import * as pickBy from 'lodash.pickby';
import {ReactElement} from 'react';

export type Theme = ((props: any) => Object) | Object;

interface ThemeGeneratorState {
  calculatedTheme: object;
}

interface ThemedComponentProps {
  theme?: Theme;
  children: ReactElement<any>;
  [propName: string]: any;
}

export class ThemedComponent extends React.PureComponent<ThemedComponentProps, ThemeGeneratorState> {
  constructor(props) {
    super(props);
    const {children, theme, ...propsForTheme} = props;
    this.state = {calculatedTheme: getTheme(theme, propsForTheme)};
  }

  componentWillReceiveProps(nextProps) {
    const {children, theme, ...propsForTheme} = nextProps;

    const changedProps = pickBy(propsForTheme, (value, key) => this.props[key] !== value);

    if (Object.keys(changedProps).length > 0) {
      this.setState({calculatedTheme: getTheme(theme, propsForTheme)});
    }
  }

  render() {
    const {calculatedTheme} = this.state;
    return React.cloneElement(this.props.children, {theme: calculatedTheme});
  }
}

function getTheme(theme: Theme, params?: object): object {
  return typeof theme === 'function' ? theme(params) : theme;
}
