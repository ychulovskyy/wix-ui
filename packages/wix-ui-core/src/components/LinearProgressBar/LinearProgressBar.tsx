import * as React from 'react';
import style from './LinearProgressBar.st.css';

export interface LinearProgressBarProps {
  value: number;
  error?: boolean;
  showProgressIndication?: boolean;
}


const resolveIndicationElement = (props: LinearProgressBarProps) => {
  if (!props.showProgressIndication) {
    return null;
  }

  if (props.error) {
    return <div data-hook="failure-icon" />;
  }

  if (props.value === 100) {
    return <div data-hook="success-icon" />;
  }

  return <div data-hook="progress-percentages">{`${props.value}%`}</div>
}

export const LinearProgressBar = (props: LinearProgressBarProps) => {
  const progressWidth = { width: `${props.value}%` };

  return (
    <div {...style('root', { error: props.error }, props)} >
      <div className={style.linearProgressBarContainer}>
        <div data-hook="progressbar-background" className={style.linearProgressBarBackground} />
        <div data-hook="progressbar-foreground" style={progressWidth} className={style.linearProgressBarForeground} />
        {resolveIndicationElement(props)}
      </div>
    </div>);
}
