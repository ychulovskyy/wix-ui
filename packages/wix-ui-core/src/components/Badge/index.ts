import * as React from 'react';
import BadgeComponent, {BadgeProps} from './Badge.tsx';
import {styles} from './styles.ts';
import {withClasses, ThemedComponentProps} from 'wix-ui-jss';
import {WixComponentProps} from '../../createHOC/index.tsx';

export {BadgeProps};
export const Badge = withClasses(BadgeComponent, styles) as React.ComponentClass<BadgeProps & ThemedComponentProps & WixComponentProps>;
