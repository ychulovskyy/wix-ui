import style from './button.st.css';
import classNames from 'classnames';

export type ButtonSize = 'tiny' | 'small' | 'medium' | 'large';
export type ButtonSkin = 'standard' | 'destructive' | 'premium' | 'transparent' | 'light' | 'dark';

export interface ButtonStyleProps {
  /* Button size - default 'medium'*/
  size?: ButtonSize;
  /* Button color set - default 'standard'*/
  skin?: ButtonSkin;
  /* Secondary priority */
  secondary?: boolean;
}

/**
 * Builds class names for button
 */
export function button(props : ButtonStyleProps = {}) : string {
  
  return classNames(
    style.button,
    {
      [style.secondary]: props.secondary,
    },
    style[props.size],
    style[props.skin]
  );
}
