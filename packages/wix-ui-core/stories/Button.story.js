import {Button} from '../src/components/deprecated/button';

export default {
  category: 'Components',
  storyName: 'Button',
  component: Button,
  componentPath: '../src/components/deprecated/button/Button.tsx',

  componentProps: {
    disabled: false,
    type: 'button',
    children: 'I\'m a Button!',
    'data-hook': 'storybook-button'
  },

  exampleProps: {
    onClick: () => 'Clicked!',
    onMouseEnter: () => 'Mouse Enter!',
    onMouseLeave: () => 'Mouse Leave!',
  }
};
