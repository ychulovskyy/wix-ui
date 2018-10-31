import {Popover} from './Popover';
import Registry from '@ui-autotools/registry';

const popoverMetadata = Registry.getComponentMetadata(Popover);

// Popover currently uses legacy context API. TODO: update Popover to use latest context
popoverMetadata.reactStrictModeCompliant = false;

popoverMetadata
  .addSim({
    title: 'Simulation with default props',
    props: {
      placement: 'auto',
      shown: true
    }
  });