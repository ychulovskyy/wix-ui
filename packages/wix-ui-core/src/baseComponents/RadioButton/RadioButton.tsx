import * as React from 'react';
import {string, number, func, node, bool} from 'prop-types';
import style from './RadioButton.st.css';

export interface RadioButtonProps {
  /** The value which the radio represents */
  value?: string;
  /** The group name which the button belongs to */
  group?: string;
  /** The size of the icon. units TBD */
  size?: number;
  /** A callback to invoke */
  onChange?: (event: React.MouseEvent<HTMLDivElement>) => void;
  /** The icon */
  icon?: React.ReactNode;
  /** The content */
  content?: React.ReactNode;
  /** Selected? */
  selected?: boolean;
}

function getSize(size: number) {
  const pxSize = `${2 * size}px`;
  return size ? {height: pxSize, width: pxSize, fontSize: pxSize} : null;
}

export const RadioButton: React.SFC<RadioButtonProps> = (props: RadioButtonProps) => {
  const {value, group, size, onChange, icon, content} = props;
  return (
    <div onClick={onChange} {...style('root')}>
      <input type="radio" className={style.hiddenRadio}
             value={value} name={group} data-hook="radio-input"/>
      <span className={style.icon} style={getSize(size)}>{icon}</span>
      <span className={style.content}>{content}</span>
    </div>
  )
};

RadioButton.propTypes = {
  /** The value which the radio represents */
  value: string,
  /** The group name which the button belongs to */
  group: string,
  /** The size of the icon. units TBD */
  size: number,
  /** A callback to invoke */
  onChange: func,
  /** The icon */
  icon: node,
  /** The content */
  content: node,
  /** Selected ? */
  selected: bool
};