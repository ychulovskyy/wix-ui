import style from './button.st.css';
import classNames from 'classnames';

export type SizeType = 'tiny' | 'small' | 'large';

interface ButtonStyleProps {
  size?: SizeType;
  light?: boolean;
}

export function button(props : ButtonStyleProps = {}) : string {
  
  const sizeClass = style[props.size];
  return classNames(
    style.button,
    {
      [style.light]: props.light,
    },
    sizeClass
  );
}
