
import * as React from 'react';

export interface StateComponentClass<P = {}, S = {}> {
  new (props?: P, context?: any): React.Component<P, S>;
  propTypes?: React.ValidationMap<P>;
  contextTypes?: React.ValidationMap<any>;
  childContextTypes?: React.ValidationMap<any>;
  defaultProps?: Partial<P>;
  displayName?: string;
}

// Generic adapter to add the root class and it's css states
export function withStylable<P, S>(
  CoreComponent: StateComponentClass<P, S>,
  stylesheet: RuntimeStylesheet,
  getState: (p?: any, s?: any, c?: any) => StateMap) {

  return class StylableComponent extends CoreComponent {
    static defaultProps = {
    };

    render() {
      const root = super.render();
      if (!root) { return null; }
      const states = getState(this.props, this.state, this.context);
      const className = root.props && root.props.className || '';
      const props = stylesheet(
        className ? 'root ' + className : 'root',
        states
      );
      return React.cloneElement(root, props);
    }
  };
}
