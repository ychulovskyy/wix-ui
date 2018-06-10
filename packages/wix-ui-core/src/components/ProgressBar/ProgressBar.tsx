import * as React from 'react';
import style from './ProgressBar.st.css';

export interface ProgressBarProps {
  value: number;
  error: boolean;
}

export const ProgressBar = (props: ProgressBarProps) =>  (
  <div { ...style('root', {error: props.error}, props) } data-hook={'storybook-progress-bar'} >{props.value}</div>
);
