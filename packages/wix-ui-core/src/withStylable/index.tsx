import * as React from 'react';

export function withStylable(
  root: JSX.Element | null | false,
  stylesheet: RuntimeStylesheet,
  stateMap: StateMap) {
  if (!root) { return null; }
  const className = root.props && root.props.className || '';
  const props = stylesheet(`root ${className}`.trim(), stateMap);
  return React.cloneElement(root, props);
}

export function appendStylable(
  Component: React.ComponentClass,
  stylesheet: RuntimeStylesheet,
  getState: (p?: any, s?: any, c?: any) => StateMap) {

  return class StylableComponent extends Component {
    render() {
      const root = super.render();
      if (!root) { return null; }
      const className = root.props && root.props.className || '';
      const statesMap = getState(this.props, this.state, this.context);
      const props = stylesheet(`root ${className}`.trim(), statesMap);
      return React.cloneElement(root, props);
    }
  };
}
