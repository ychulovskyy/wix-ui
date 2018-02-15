import {ComponentFactory} from 'wix-ui-test-utils/driver-factory';

export const radioButtonDriverFactory = ({element, eventTrigger}) => ({
  exists: () => !!element,
});
