import * as React from 'react';
import {TooltipComponent} from './Tooltip';
import Registry from '@ui-autotools/registry';
const noop = require('lodash/noop');

const tooltipMetadata = Registry.getComponentMetadata(TooltipComponent);
tooltipMetadata
  .addSim({
    title: 'Simulation with default props',
    props: {
      placement: "auto",
      disableOnClickOutside: noop,
      enableOnClickOutside: noop,
      content: <span> This is my tooltip</span>,
      children: [<div key="1" />]
    }
  });
  