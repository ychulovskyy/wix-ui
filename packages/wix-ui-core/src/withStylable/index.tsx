import * as React from 'react';

export function withStylable(
  component: React.Component,
  root: JSX.Element | null | false,
  stylesheet: RuntimeStylesheet,
  getState: (p?: any, s?: any, c?: any) => StateMap) {
  if (!root) { return null; }
  const stateMap = getState(component.props, component.state, component.context);
  const className = root.props && root.props.className || '';
  const props = stylesheet(
    className ? 'root ' + className : 'root',
    stateMap
  );
  return React.cloneElement(root, props);
}
