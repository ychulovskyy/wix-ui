import * as React from 'react';
import {Grouper} from '../src/baseComponents/Grouper';

export default {
  category: 'Base Components',
  storyName: 'Grouper',
  component: Grouper,
  componentPath: '../src/baseComponents/Grouper/Grouper.tsx',

  componentProps: {
    alignment: 'horizontal',
    children: [1, 2, 3, 4, 5].map(() => <div>hello</div>),
    'data-hook': 'storybook-grouper'
  }
};
