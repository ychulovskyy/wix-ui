import * as React from 'react';
import style from './ProgressBar.st.css';

export interface ProgressBarProps {
  value: number;
  error: boolean;
}

const LinearProgressBar = (props: ProgressBarProps) => {
  const progressWidth = { width: `${props.value}%` };
  return (
    <div className={style.linearProgressBarContainer}>
      <div className={style.linearProgressBarBackground} />
      <div style={progressWidth} className={style.linearProgressBarValue} />
    </div>
  )
};

export const ProgressBar = (props: ProgressBarProps) => (
  <div {...style('root', { error: props.error }, props)} >
    <LinearProgressBar {...props} />
  </div>
);
