import * as React from 'react';
import {string, func, node, bool} from 'prop-types';
import style from './RadioButton.st.css';

export interface RadioButtonProps {
  /** The value which the radio represents */
  value?: string;
  /** The group name which the button belongs to */
  name?: string;
  /** A callback to invoke */
  onChange?: (event: React.MouseEvent<HTMLDivElement>) => void;
  /** The icon */
  icon?: React.ReactNode;
  /** The content */
  content?: React.ReactNode;
  /** Sets checked status of the radio */
  checked?: boolean;
  /** Sets the disabled status of the radio */
  disabled?: boolean;
  /** Sets the required status of the radio */
  required?: boolean;
}

export const RadioButton: React.SFC<RadioButtonProps> = (props: RadioButtonProps) => {
  const {value, name, onChange, icon, content, checked, disabled, required} = props;
  return (
    <div onClick={!disabled ? onChange : () => null} {...style('root', {checked, disabled}, props)}
         role="radio" aria-checked={!!checked}>
      <input type="radio" className={style.hiddenRadio} disabled={disabled} required={required}
             defaultChecked={checked} value={value} name={name} data-hook="radio-input"/>
      <span className={style.icon} data-hook="radio-icon">{icon}</span>
      <span className={style.content} data-hook="radio-content">{content}</span>
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
  /** The content */
  content: node,
  /** Sets checked status of the radio */
  checked: bool,
  /** Sets the disabled status of the radio */
  disabled: bool,
  /** Sets the required status of the radio */
  required: bool
};
