import * as React from 'react';
import {string, func, node, bool} from 'prop-types';
import style from './RadioButton.st.css';

export interface RadioButtonProps {
  /** The value which the radio represents */
  value?: string;
  /** The group name which the button belongs to */
  name?: string;
  /** A callback to invoke */
  onChange?: Function;
  /** The icon */
  icon?: React.ReactNode;
  /** The label */
  label?: React.ReactNode;
  /** Sets checked status of the radio */
  checked?: boolean;
  /** Sets the disabled status of the radio */
  disabled?: boolean;
  /** Sets the required status of the radio */
  required?: boolean;
  /** Sets the focused status of the radio */
  focused?: boolean;
}

export const RadioButton: React.SFC<RadioButtonProps> = (props: RadioButtonProps) => {
  const {value, name, onChange, icon, label, checked, disabled, required, focused} = props;

  const handleInputChange = event => {
    onChange(event, value);
  };

  return (
    <div {...style('root', {checked, disabled, focused}, props)}
         onChange={!disabled ? handleInputChange : () => null}
         onClick={!disabled ? handleInputChange : () => null}
         role="radio" aria-checked={!!checked}>
      <input id='my-radio' type="radio" className={style.hiddenRadio} disabled={disabled} required={required}
             defaultChecked={checked} value={value} name={name} data-hook="radio-input"/>
      <span className={style.icon} data-hook="radio-icon">{icon}</span>
      <span className={style.label} data-hook="radio-label">{label}</span>
    </div>
  )
};

RadioButton.propTypes = {
  /** The value which the radio represents */
  value: string,
  /** The group name which the button belongs to */
  name: string,
  /** A callback to invoke */
  onChange: func,
  /** The icon */
  icon: node,
  /** The label */
  label: node,
  /** Sets checked status of the radio */
  checked: bool,
  /** Sets the disabled status of the radio */
  disabled: bool,
  /** Sets the required status of the radio */
  required: bool,
  /** Sets the focused status of the radio */
  focused: bool
};
