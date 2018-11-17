import style from './button.st.css';
import classNames from 'classnames';

export type SizeType = 'tiny' | 'small' | 'medium' | 'large';
export type SkinType = 'destructive' | 'premium' | 'transparent';

interface ButtonStyleProps {
  size?: SizeType;
  skin?: SkinType;
  light?: boolean;
  dark?: boolean;
  secondary?: boolean;
}

export function button(props : ButtonStyleProps = {}) : string {
  
  return classNames(
    style.button,
    {
      [style.light]: props.light,
      [style.dark]: props.dark,
      [style.secondary]: props.secondary,
    },
    style[props.size],
    style[props.skin]
  );
}
