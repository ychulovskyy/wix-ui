/* tslint:disable:no-empty */
import * as PopperJs from 'popper.js';

let scheduleUpdateMock = () => {};

export default class Popper {
  static placements = PopperJs.placements;

  static __setScheduleUpdateImplementation(impl) {
    scheduleUpdateMock = impl;
  }

  static __reset() {
    scheduleUpdateMock = () => {};
  }

  constructor() {
    return {
      destroy: () => {},
      scheduleUpdate: scheduleUpdateMock
    };
  }
}
