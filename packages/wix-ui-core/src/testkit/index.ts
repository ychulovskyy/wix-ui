import {
  testkitFactoryCreator,
  uniTestkitFactoryCreator
} from 'wix-ui-test-utils/vanilla';

import { inputDriverFactory } from '../components/Input/input.driver';
export const inputTestkitFactory = testkitFactoryCreator(inputDriverFactory);

import { paginationDriverFactory } from '../components/Pagination/pagination.driver';
export const paginationTestkitFactory = testkitFactoryCreator(
  paginationDriverFactory
);

import { tooltipDriverFactory } from '../components/Tooltip/tooltip.driver';
export const tooltipTestkitFactory = testkitFactoryCreator(
  tooltipDriverFactory
);

import { dividerDriverFactory } from '../components/deprecated/Divider/divider.driver';
export const dividerTestkitFactory = testkitFactoryCreator(
  dividerDriverFactory
);

import { checkboxDriverFactory } from '../components/Checkbox/checkbox.driver';
export const checkboxTestkitFactory = testkitFactoryCreator(
  checkboxDriverFactory
);

//Stylable
import { toggleSwitchDriverFactory } from '../components/ToggleSwitch/toggle-switch.driver';
export const toggleSwitchTestkitFactory = testkitFactoryCreator(
  toggleSwitchDriverFactory
);

import {
  buttonDriverFactory,
  ButtonDriver
} from '../components/deprecated/Button/button.driver';
export const buttonTestkitFactory = testkitFactoryCreator<ButtonDriver>(
  buttonDriverFactory
);
export { ButtonDriver };

import {
  buttonNextDriverFactory,
  ButtonNextDriver
} from '../components/button-next/button-next.driver';
export const buttonNextTestkitFactory = uniTestkitFactoryCreator<
  ButtonNextDriver
>(buttonNextDriverFactory);
export { ButtonNextDriver };

import {
  linearProgressBarDriverFactory,
  LinearProgressBarDriver
} from '../components/LinearProgressBar/linear-progress-bar.driver';
export const linearProgressBarTestkitFactory = testkitFactoryCreator<
  LinearProgressBarDriver
>(linearProgressBarDriverFactory);
export { LinearProgressBarDriver };

import {
  circularProgressBarDriverFactory,
  CircularProgressBarDriver
} from '../components/CircularProgressBar/circular-progress-bar.driver';
export const circularProgressBarTestkitFactory = testkitFactoryCreator<
  CircularProgressBarDriver
>(circularProgressBarDriverFactory);
export { CircularProgressBarDriver };

import {
  badgeDriverFactory as stylableBadgeDriverFactory,
  BadgeDriver as StylableBadgeDriver
} from '../components/deprecated/StylableBadge/badge.driver';
export const stylableBadgeTestkitFactory = testkitFactoryCreator<
  StylableBadgeDriver
>(stylableBadgeDriverFactory);
export { StylableBadgeDriver };

import { radioButtonDriverFactory } from '../components/RadioButton/radio-button.driver';
export const radioButtonTestkitFactory = testkitFactoryCreator(
  radioButtonDriverFactory
);

import { autocompleteDriverFactory } from '../components/Autocomplete/autocomplete.driver';
export const autocompleteTestkitFactory = testkitFactoryCreator(
  autocompleteDriverFactory
);

import { sliderDriverFactory } from '../components/Slider/slider.driver';
export const sliderTestkitFactory = testkitFactoryCreator(sliderDriverFactory);

import { addressInputDriverFactory } from '../components/AddressInput/address-input.driver';
export const addressInputTestkitFactory = testkitFactoryCreator(
  addressInputDriverFactory
);

import { labelDriverFactory } from '../components/deprecated/Label/label.driver';
export const labelTestkitFactory = testkitFactoryCreator(labelDriverFactory);

import { timePickerDriverFactory } from '../components/TimePicker/time-picker.driver';
export const timePickerTestkitFactory = testkitFactoryCreator(
  timePickerDriverFactory
);

import { labelWithOptionsDriverFactory } from '../components/LabelWithOptions/label-with-options.driver';
export const labelWithOptionsTestkitFactory = testkitFactoryCreator(
  labelWithOptionsDriverFactory
);

import {
  thumbnailDriverFactory,
  ThumbnailDriver
} from '../components/Thumbnail/thumbnail.driver';
export const thumbnailTestkitFactory = testkitFactoryCreator<ThumbnailDriver>(
  thumbnailDriverFactory
);
export { ThumbnailDriver };

import { popoverDriverFactory } from '../components/Popover/popover.driver';
export const popoverTestkitFactory = testkitFactoryCreator(
  popoverDriverFactory
);
