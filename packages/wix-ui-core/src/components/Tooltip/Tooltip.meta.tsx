import * as React from 'react';
import {TooltipComponent} from './Tooltip';
import Registry from '@ui-autotools/registry';
const noop = require('lodash/noop');

const tooltipMetadata = Registry.getComponentMetadata(TooltipComponent);

// Tooltip uses Popover which currently uses legacy context API. TODO: update Popover to use latest context
tooltipMetadata.reactStrictModeCompliant = false;

tooltipMetadata
  .addSim({
    title: 'Simulation with default props',
    props: {
      disableOnClickOutside: noop,
      enableOnClickOutside: noop,
      children: [<div key="1" />]
    }
  });
  