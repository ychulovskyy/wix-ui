import {Link} from './Link';
import Registry from '@ui-autotools/registry';

const linkMetadata = Registry.getComponentMetadata(Link);

linkMetadata
  .addSim({
    title: 'Simulation with default props',
    props: {
      children: 'I\'m a link!'
    }
  });
