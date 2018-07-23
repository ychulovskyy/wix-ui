import * as React from 'react';
import Markdown from 'wix-storybook-utils/Markdown';
import * as Readme from '../../src/HOCS/EllipsedTooltip/README.md';
import CodeExample from 'wix-storybook-utils/CodeExample';

import ExampleWithoutTooltip from './ExampleWithoutTooltip';
import * as ExampleWithoutTooltipRaw from '!raw-loader!./ExampleWithoutTooltip';

import ExampleWithTooltip from './ExampleWithTooltip';
import * as ExampleWithTooltipRaw from '!raw-loader!./ExampleWithTooltip';

const Example: React.SFC = () => (
  <div>
    <Markdown source={Readme}/>

    <CodeExample title="Ellipsis Without Tooltip Example" code={ExampleWithoutTooltipRaw}>
      <ExampleWithoutTooltip/>
    </CodeExample>

    <CodeExample title="Ellipsis With Tooltip Example" code={ExampleWithTooltipRaw}>
      <ExampleWithTooltip/>
    </CodeExample>
  </div>
);

export default Example;
