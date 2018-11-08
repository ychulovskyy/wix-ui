import * as React from 'react';

import {Avatar} from '.';
import {
  avatar,
  defaultTheme
} from '../../themes/default';

import User from 'wix-ui-icons-common/User';

export default {
  category: 'Components',
  storyName: 'WIP - Avatar',
  component: Avatar,
  componentPath: 'avatar.tsx',

  componentProps: {
    name: 'John Doe',
    'data-hook': 'storybook-avatar',
    className: avatar()
  },
  exampleProps: {
    icon: [{label: 'Icon1', value: <User />}],
    imgProps: [{label: 'image1', value:{src:'http://lorempixel.com/90/90/people/'}}]
  }

};
