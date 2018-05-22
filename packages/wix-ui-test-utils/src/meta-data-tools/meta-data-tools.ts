import { ComponentClass } from "react";
import { MetaDataDefinition, Simulation } from './types';
// import { saveOrUpdateConfig } from './generators';

// export interface MetaDataStore {
//   metaData: MetaData
// }

export class MetaData implements MetaDataDefinition {
  addSim (sim: Simulation) {

  }
}

export default class MetaDataTools {
  private metaData: WeakMap<ComponentClass, MetaData>;
  constructor() {
    this.metaData = new WeakMap();
  }

  describe (comp: ComponentClass): MetaData {
    if (!this.metaData.has(comp)) {
      this.metaData.set(comp, new MetaData());
    }

    return this.metaData.get(comp)!;
  }
}



