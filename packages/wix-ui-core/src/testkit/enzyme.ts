import {
  enzymeTestkitFactoryCreator,
  enzymeUniTestkitFactoryCreator,
  WrapperData
} from 'wix-ui-test-utils/enzyme';

import { inputDriverFactory } from '../components/Input/input.driver';
//Ugly workaround for now
export const inputTestkitFactory: (
  obj: WrapperData
) => any = enzymeTestkitFactoryCreator(inputDriverFactory);

import { tooltipDriverFactory } from '../components/Tooltip/tooltip.driver';
export const tooltipTestkitFactory = enzymeTestkitFactoryCreator(
  tooltipDriverFactory
);

import {
  linearProgressBarDriverFactory,
  LinearProgressBarDriver
} from '../components/LinearProgressBar/linear-progress-bar.driver';
export const linearProgressBarTestkitFactory = enzymeTestkitFactoryCreator<
  LinearProgressBarDriver
>(linearProgressBarDriverFactory);
export { LinearProgressBarDriver };

import {
  circularProgressBarDriverFactory,
  CircularProgressBarDriver
} from '../components/CircularProgressBar/circular-progress-bar.driver';
export const circularProgressBarTestkitFactory = enzymeTestkitFactoryCreator<
  CircularProgressBarDriver
>(circularProgressBarDriverFactory);
export { CircularProgressBarDriver };

import { paginationDriverFactory } from '../components/Pagination/pagination.driver';
export const paginationTestkitFactory = enzymeTestkitFactoryCreator(
  paginationDriverFactory
);

import { dividerDriverFactory } from '../components/deprecated/Divider/divider.driver';
export const dividerTestkitFactory = enzymeTestkitFactoryCreator(
  dividerDriverFactory
);

import { checkboxDriverFactory } from '../components/Checkbox/checkbox.driver';
export const checkboxTestkitFactory = enzymeTestkitFactoryCreator(
  checkboxDriverFactory
);

// Stylable
import { toggleSwitchDriverFactory } from '../components/ToggleSwitch/toggle-switch.driver';
export const toggleSwitchTestkitFactory = enzymeTestkitFactoryCreator(
  toggleSwitchDriverFactory
);

import {
  buttonDriverFactory,
  ButtonDriver
} from '../components/deprecated/Button/button.driver';
export const buttonTestkitFactory = enzymeTestkitFactoryCreator<ButtonDriver>(
  buttonDriverFactory
);
export { ButtonDriver };

import {
  buttonNextDriverFactory,
  ButtonNextDriver
} from '../components/button-next/button-next.driver';
export const buttonNextTestkitFactory = enzymeUniTestkitFactoryCreator<
  ButtonNextDriver
>(buttonNextDriverFactory);
export { ButtonNextDriver };

import {
  badgeDriverFactory as stylableBadgeDriverFactory,
  BadgeDriver as StylableBadgeDriver
} from '../components/deprecated/StylableBadge/badge.driver';
export const stylableBadgeTestkitFactory = enzymeTestkitFactoryCreator<
  StylableBadgeDriver
>(stylableBadgeDriverFactory);
export { StylableBadgeDriver };

import { radioButtonDriverFactory } from '../components/RadioButton/radio-button.driver';
export const radioButtonTestkitFactory = enzymeTestkitFactoryCreator(
  radioButtonDriverFactory
);

import { autocompleteDriverFactory } from '../components/Autocomplete/autocomplete.driver';
export const autocompleteTestkitFactory = enzymeTestkitFactoryCreator(
  autocompleteDriverFactory
);

import { sliderDriverFactory } from '../components/Slider/slider.driver';
export const sliderTestkitFactory = enzymeTestkitFactoryCreator(
  sliderDriverFactory
);

import { addressInputDriverFactory } from '../components/AddressInput/address-input.driver';
export const addressInputTestkitFactory = enzymeTestkitFactoryCreator(
  addressInputDriverFactory
);

import { labelDriverFactory } from '../components/deprecated/Label/label.driver';
export const labelTestkitFactory = enzymeTestkitFactoryCreator(
  labelDriverFactory
);

import { timePickerDriverFactory } from '../components/TimePicker/time-picker.driver';
export const timePickerTestkitFactory = enzymeTestkitFactoryCreator(
  timePickerDriverFactory
);

import { labelWithOptionsDriverFactory } from '../components/LabelWithOptions/label-with-options.driver';
export const labelWithOptionsTestkitFactory = enzymeTestkitFactoryCreator(
  labelWithOptionsDriverFactory
);

import {
  thumbnailDriverFactory,
  ThumbnailDriver
} from '../components/Thumbnail/thumbnail.driver';
export const thumbnailTestkitFactory = enzymeTestkitFactoryCreator<
  ThumbnailDriver
>(thumbnailDriverFactory);
export { ThumbnailDriver };

import { popoverDriverFactory } from '../components/Popover/popover.driver';
export const popoverTestkitFactory = enzymeTestkitFactoryCreator(
  popoverDriverFactory
);

import {
  navStepperDriverFactory,
  NavStepperDriver
} from '../components/NavStepper/nav-stepper.driver';
export const navStepperTestkitFactory = enzymeTestkitFactoryCreator(
  navStepperDriverFactory
);
export { NavStepperDriver };
