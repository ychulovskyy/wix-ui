import {Pagination} from './Pagination';
import Registry from '@ui-autotools/registry';
import style from './PaginationTest.st.css';

const paginationMetadata = Registry.getComponentMetadata(Pagination);
paginationMetadata.reactStrictModeCompliant = false;

paginationMetadata
  .addSim({
    title: 'Simulation with default props',
    props: {
      totalPages: 9,
      className: style.root
    }
  });