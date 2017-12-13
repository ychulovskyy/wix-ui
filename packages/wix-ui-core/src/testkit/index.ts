import {testkitFactoryCreator} from 'wix-ui-test-utils';

import {toggleSwitchDriverFactory} from '../components/ToggleSwitch/ToggleSwitch.driver';
export const toggleSwitchTestkitFactory = testkitFactoryCreator(toggleSwitchDriverFactory);

import {inputDriverFactory} from '../components/Input/Input.driver';
export const inputTestkitFactory = testkitFactoryCreator(inputDriverFactory);

import {textDriverFactory} from '../components/Text/Text.driver';
export const textTestkitFactory = testkitFactoryCreator(textDriverFactory);
