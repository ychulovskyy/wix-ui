import * as React from 'react';

export const appendStylable = (
  root: JSX.Element | null | false,
  stylesheet: RuntimeStylesheet,
  stateMap: StateMap) =>  {
  if (!root) { return null; }
  const className = root.props && root.props.className || '';
  const props = stylesheet(
    className ? 'root ' + className : 'root',
    stateMap
  );
  return React.cloneElement(root, props);
};

// Generic adapter to add the root class and it's css states
export function withStylable<T>(
  CoreComponent: React.ComponentClass<T>,
  stylesheet: RuntimeStylesheet,
  getState: (p?: any, s?: any, c?: any) => StateMap) {

  return class StylableComponent extends CoreComponent {
    static defaultProps = {
    };

    render() {
      const root = super.render();
      const states = getState(this.props, this.state, this.context);
      return appendStylable(root, stylesheet, states);
    }
  };
}
