import * as React from 'react';
import {Popover} from './Popover';
import Registry from '@ui-autotools/registry';

const popoverMetadata = Registry.getComponentMetadata(Popover);
popoverMetadata
  .addSim({
    title: 'Simulation with default props',
    props: {
      placement: 'auto',
      shown: true,
      Content: () => {return <div>I'm Content</div>},
      Element: () => {return <div>I'm the Element</div>}
    }
  });