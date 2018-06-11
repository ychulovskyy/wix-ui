import * as React from 'react';
import style from './LinearProgressBar.st.css';

export interface LinearProgressBarProps {
  value: number;
  error?: boolean;
  showProgressIndication?: boolean;
  errorIcon?: JSX.Element;
  successIcon?: JSX.Element;
}

const resolveIndicationElement = (props: LinearProgressBarProps) => {
  const centered = (dataHook: string, children: JSX.Element) => 
    <div data-hook={dataHook} className={style.centered}>{children}</div>;

  if (props.error) {
    return props.errorIcon && centered('error-icon', props.errorIcon);
  }

  if (props.value === 100) {
    return props.successIcon && centered('success-icon', props.successIcon);
  }

  return centered('progress-percentages', <span>{`${props.value}%`}</span>);
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
    <div {...style('root', { error: props.error, showProgressIndication: props.showProgressIndication}, props)} >

      <div className={style.barSection}>
        {resolveBarSection(props.value)}
      </div>

      {props.showProgressIndication && <div className={style.progressIndicationSection}>
        {resolveIndicationElement(props)}
      </div>}

    </div>);
}
