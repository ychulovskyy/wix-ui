/* tslint:disable:no-empty */

let scheduleUpdateMock = () => {};

export default class Popper {
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
