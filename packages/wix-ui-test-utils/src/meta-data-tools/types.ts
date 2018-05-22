export interface MetaDataDefinition {
  componentName?: string;
  addSim: (sim: Simulation) => void;
} 

export interface Simulation {
  props?: Object;
}