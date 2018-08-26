import * as React from 'react';
import {NavStepper} from './NavStepper';
import Registry from '@ui-autotools/registry';

const navStepperMetadata = Registry.getComponentMetadata(NavStepper);
navStepperMetadata
  .addSim({
    title: 'Simulation with default props',
    props: {
      activeStep: 0,
      children: [
        <NavStepper.Step key="1">Active</NavStepper.Step>,
        <NavStepper.Step key="2">Not visited</NavStepper.Step>,
        <NavStepper.Step key="3">Not visited</NavStepper.Step>,
        <NavStepper.Step key="4" disabled>Disabled</NavStepper.Step>,
      ]
    }
  });