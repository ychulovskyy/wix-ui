import * as React from 'react';
import style from './LinearProgressBar.st.css';

export interface LinearProgressBarProps {
  value: number;
  error?: boolean;
  showProgressIndication?: boolean;
  errorIcon?: any;
  successIcon?: any;
}

const resolveIndicationElement = (props: LinearProgressBarProps) => {
  if (!props.showProgressIndication) {
    return null;
  }

  if (props.error) {
    return props.errorIcon && <div data-hook="error-icon" />;
  }

  if (props.value === 100) {
    return props.successIcon && <div data-hook="success-icon" />;
  }

  return <div data-hook="progress-percentages">{`${props.value}%`}</div>
}

const resolveBarSection = (value: number) => {
  const progressWidth = { width: `${value}%` };
  return (
    <div className={style.barContainer}>
      <div data-hook="progressbar-background" className={style.barBackground} />
      <div data-hook="progressbar-foreground" style={progressWidth} className={style.barForeground} />
    </div>
  )
}

export const LinearProgressBar = (props: LinearProgressBarProps) => {

  return (
    <div {...style('root', { error: props.error }, props)} >

      <div className={style.barSection}>
        {resolveBarSection(props.value)}
      </div>

      <div className={style.progressIndicationSection}>
        {resolveIndicationElement(props)}
      </div>

    </div>);
}
