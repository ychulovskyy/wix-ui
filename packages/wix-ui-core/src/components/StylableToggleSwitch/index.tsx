import * as React from 'react';
import ToggleSwitch from './ToggleSwitch';
import style from './ToggleSwitch.st.css';

// Generic adapter to add the root class and it's css states
export function withStylable(CoreComponent: React.ComponentClass<any>, stylesheet: RuntimeStylesheet, getState: (object) => StateMap) {
  return class StylableComponent extends CoreComponent {
    static stylable_stylesheet = stylesheet;
    render() {
      this.props = {...this.props, classes: stylesheet};
      const root = super.render();
      if (!root) { return null; }
      const isProcessedByStylable = root.props && root.props["data-stylable"];
      const states = getState(this.props);
      const className = root.props && root.props.className || '';
      const props = isProcessedByStylable ? 
          stylesheet(
            className ? 'root ' + className : 'root',
            states
          ) : 
          stylesheet(
            className, 
            states,
            this.props
          );
            
      props["data-stylable"] = true;
      return React.cloneElement(root, props);
    }
  };
}

export const StylableToggleSwitch = withStylable(
  ToggleSwitch,
  style,
  ({checked, disabled}) => ({checked, disabled})
);
