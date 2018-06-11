import * as React from 'react';
import style from './ProgressBar.st.css';

export interface ProgressBarProps {
  value: number;
  error?: boolean;
}

const LinearProgressBar = (props: ProgressBarProps) => {
  const progressWidth = { width: `${props.value}%` };
  return (
    <div className={style.linearProgressBarContainer}>
      <div data-hook="progressbar-background" className={style.linearProgressBarBackground} />
      <div data-hook="progressbar-foreground" style={progressWidth} className={style.linearProgressBarForeground} />
    </div>
  )
};

export const ProgressBar = (props: ProgressBarProps) => (
  <div {...style('root', { error: props.error }, props)} >
    <LinearProgressBar {...props} />
  </div>
);
