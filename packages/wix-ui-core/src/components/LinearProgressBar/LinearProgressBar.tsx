import * as React from 'react';
import style from './LinearProgressBar.st.css';

export interface LinearProgressBarProps {
  value: number;
  error?: boolean;
  showProgressIndication?: boolean;
  errorIcon?: JSX.Element;
  successIcon?: JSX.Element;
}

const FULL_PROGRESS = 100;
const NO_PROGRESS = 0;

const resolveIndicationElement = (props: LinearProgressBarProps) => {
  const wrapped = (dataHook: string, children: JSX.Element) => 
    <div data-hook={dataHook}>{children}</div>;

  if (props.error && props.errorIcon) {
    return wrapped('error-icon', props.errorIcon);
  }

  if (props.value === FULL_PROGRESS && props.successIcon) {
    return wrapped('success-icon', props.successIcon);
  }

  return wrapped('progress-percentages', <span className={style.value} >{`${props.value}%`}</span>);
}

const renderBarSection = (value: number) => {
  const progressWidth = { width: `${value}%` };
  return (
    <div className={style.barContainer}>
      <div data-hook="progressbar-background" className={style.barBackground} />
      <div data-hook="progressbar-foreground" style={progressWidth} className={style.barForeground} />
    </div>
  )
}

const validateProgressValue = (props: LinearProgressBarProps) => {
  const value = parseInt(props.value as any);
  
  if (props.value >= FULL_PROGRESS) {
    return {...{}, ...props, value: FULL_PROGRESS};
  }

  if (props.value < 0) {
    return {...{}, ...props, value: NO_PROGRESS};
  }

  return {...{}, ...props, value};
}

export const LinearProgressBar = (_props: LinearProgressBarProps) => {
  const {error, showProgressIndication} = _props;
  const props = validateProgressValue(_props);

  return (
    <div {...style('root', {error, showProgressIndication}, props)} >

      {renderBarSection(props.value)}  

      {props.showProgressIndication && <div data-hook="progress-indicator" className={style.progressIndicationSection}>
        {resolveIndicationElement(props)}
      </div>}

    </div>);
}
