import classNames from 'classnames';

import Avatar from './avatar/avatar.st.css';
import IconButton from './icon-button/icon-button.st.css';
import TextButton from './text-button/text-button.st.css';
import CloseButton from './close-button/close-button.st.css';
import BackofficeTheme from './theme.st.css';

/* New generation prop-like API */
export {button, ButtonStyleProps, ButtonSize, ButtonSkin} from './button/button-classes';

/* Old generation class name array */
const getClassNames = (values, stylesheet, rootcls) => {
  const clsArray = values.map(cls => stylesheet[cls] || null);
  return classNames(stylesheet[rootcls], clsArray);
};

export const avatar = (...values) =>
  getClassNames(values, Avatar, 'avatar');
export const iconButton = (...values) =>
  getClassNames(values, IconButton, 'iconButton');
export const textButton = (...values) =>
  getClassNames(values, TextButton, 'textButton');
export const closeButton = (...values) =>
  getClassNames(values, CloseButton, 'closeButton');
export const backofficeTheme = BackofficeTheme.root;
