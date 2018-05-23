import {ComponentClass} from 'react';
import {MetaDataDefinition, Simulation} from './types';

export class MetaData implements MetaDataDefinition {
  simulations: [Simulation] = [{}]; // Initialize with "empty" simulation

  addSim (sim: Simulation) {
    this.simulations.push(sim);
  }
}

export default class MetaDataTools {
  private metaData: WeakMap<ComponentClass<any>, MetaData>;

  constructor() {
    this.metaData = new WeakMap();
  }

  describe (comp: ComponentClass<any>): MetaData {
    if (!this.metaData.has(comp)) {
      this.metaData.set(comp, new MetaData());
    }

    return this.metaData.get(comp)!;
  }
}
