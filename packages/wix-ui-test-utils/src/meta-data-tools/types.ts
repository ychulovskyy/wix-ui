export interface MetaDataDefinition {
  simulations: [Simulation];
  addSim: (sim: Simulation) => void;
}

export interface Simulation {
  props?: Object;
}
