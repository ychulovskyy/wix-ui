import style from './button.st.css';
import classNames from 'classnames';

export type SizeType = 'tiny' | 'small' | 'medium' | 'large';
export type SkinType = 'standard' | 'destructive' | 'premium' | 'transparent' | 'light' | 'dark';

interface ButtonStyleProps {
  /* Button size - default 'medium'*/
  size?: SizeType;
  /* Button color set - default 'standard'*/
  skin?: SkinType;
  /* Secondary priority */
  secondary?: boolean;
}

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
