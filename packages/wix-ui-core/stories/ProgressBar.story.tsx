import * as React from 'react';
import {ProgressBar} from '../src/components/ProgressBar';
import { ProgressBarProps } from '../src/components/ProgressBar/ProgressBar';

export default {
  category: 'Components',
  name: 'ProgressBar',
  storyName: 'ProgressBar',
  component: ProgressBar,
  componentPath: '../src/components/ProgressBar',

  componentProps: setState => ({
    'data-hook': 'progress-bar',
    value: 10,
    error: true
  }),
}