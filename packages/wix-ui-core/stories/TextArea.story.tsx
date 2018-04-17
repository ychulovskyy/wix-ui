import {TextArea} from '../src/components/TextArea';

export default {
  category: 'Components',
  storyName: 'TextArea',
  component: TextArea,
  componentPath: '../src/components/TextArea/TextArea.tsx',

  componentProps: {
    'data-hook': 'storybook-textarea',
    value: 'hello'
  }
};
