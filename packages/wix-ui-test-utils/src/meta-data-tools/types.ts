import {ComponentClass} from 'react';

export interface MetaDataToolsDefinition {
  metaData: WeakMap<ComponentClass<any>, MetaDataDefinition>;
  describe: (comp: ComponentClass<any>) => MetaDataDefinition;
  clean: () => void;
}

export interface MetaDataDefinition {
  simulations: [Simulation];
  addSim: (sim: Simulation) => void;
}

export interface Simulation {
  props?: Object;
}
