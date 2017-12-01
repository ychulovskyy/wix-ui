# ToggleSwitch Theme API

In order to create a themed ToggleSwitch, all you need to do is to provide a theme object which can override any property of the core theme object:

```javascript
import {palette} from '../palette';

export const core = {
  transitionSpeed: '.3s',
  borderRadius: '50px',
  labelMovementRange: '23px',

  outerLabelWidth: '45px',
  outerLabelHeight: '24px',

  innerLabelWidth: '21px',
  innerLabelHeight: '22px',
  innerLabelBackgroundColor: palette.white,

  backgroundColor: 'grey',
  backgroundColorChecked: 'grey',
  backgroundColorDisabled: palette.disabledButton,
  backgroundColorHover: 'grey',

  color: palette.white,
  colorChecked: palette.white,
  colorDisabled: palette.white,
  colorCheckedDisabled: palette.white,
  colorHover: palette.white,

  toggleIconWidth: '8px',
  toggleIconHeight: '6px',
  toggleIconDisplay: 'none'
};
```
