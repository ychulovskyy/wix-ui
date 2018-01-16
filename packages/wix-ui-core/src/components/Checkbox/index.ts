import * as React from 'react';
import CheckboxComponent, {CheckboxProps} from './Checkbox';
import {styles} from './styles';
import {withClasses, ThemedComponentProps} from 'wix-ui-jss';
import {WixComponentProps} from '../../createHOC';

export {CheckboxProps};
export const Checkbox = withClasses(CheckboxComponent, styles) as React.ComponentClass<CheckboxProps & ThemedComponentProps & WixComponentProps>;
