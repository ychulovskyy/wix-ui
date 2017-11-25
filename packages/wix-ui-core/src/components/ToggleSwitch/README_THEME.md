# ToggleSwitch Theme API

In order to create a themed ToggleSwitch, all you need to do is to provide a theme object which can override any property of the core theme object:

```javascript
import {pallete} from '../pallete';

export const core = {
  transitionSpeed: '.3s',
  borderRadius: '50px',
  labelMovementRange: '23px',

  outerLabelWidth: '45px',
  outerLabelHeight: '24px',

  innerLabelWidth: '21px',
  innerLabelHeight: '22px',
  innerLabelBackgroundColor: pallete.white,

  backgroundColor: 'grey',
  backgroundColorChecked: 'grey',
  backgroundColorDisabled: pallete.disabledButton,
  backgroundColorHover: 'grey',

  color: pallete.white,
  colorChecked: pallete.white,
  colorDisabled: pallete.white,
  colorCheckedDisabled: pallete.white,
  colorHover: pallete.white,

  toggleIconWidth: '8px',
  toggleIconHeight: '6px',
  toggleIconDisplay: 'none'
};
```
