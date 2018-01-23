import * as React from 'react';

export function withStylable<CoreProps, ExtendedProps = {}>(
  Component: React.ComponentClass,
  stylesheet: RuntimeStylesheet,
  getState: (p?: any, s?: any, c?: any) => StateMap,
  extendedDefaultProps: object = {}): React.ComponentClass<CoreProps & ExtendedProps> {

  return class StylableComponent extends Component implements React.PureComponent<CoreProps & ExtendedProps> {
    static defaultProps = {
      ...Component.defaultProps,
      ...extendedDefaultProps
    };

    public props: Readonly<CoreProps & ExtendedProps>;

    render() {
      const root = super.render();
      if (!root) { return null; }
      const className = root.props && root.props.className || '';
      const statesMap = getState(this.props, this.state, this.context);
      const props = stylesheet(`root ${className}`.trim(), statesMap);
      return React.cloneElement(root, props);
    }
  } as any;
}

export function withStylableStateless<CoreProps, ExtendedProps = {}>(
  Component: React.SFC,
  stylesheet: RuntimeStylesheet,
  getState: (p?: any) => StateMap,
  extendedDefaultProps: object = {}): React.SFC<CoreProps & ExtendedProps> {
    const WrapperComponent: React.SFC<CoreProps & ExtendedProps> = (props: CoreProps & ExtendedProps) => {
      const root = Component(props);
      if (!root) { return null; }
      const className = root.props && root.props.className || '';
      const statesMap = getState(props);
      const stylableProps = stylesheet(`root ${className}`.trim(), statesMap);
      return React.cloneElement(root, stylableProps);
    };

    // Copy static properties
    for (let propName in Component) {
      WrapperComponent[propName] = Component[propName];
    }

    WrapperComponent.defaultProps = {
      ...Component.defaultProps,
      ...extendedDefaultProps
    };

    return WrapperComponent;
}
