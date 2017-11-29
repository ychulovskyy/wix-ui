# wix-ui-theme

> Create your own themed components easily.

If you are creating a new component library with a unique theme, this is the package you are looking for.

## Creating a new theme
A theme is simply an object that we need to pass to the core component as a prop. The core component has no style by definition, or at at least only a basic one.
Each component must have it's own theme object.
It should have a specific structure (TBD).

![buttons](/packages/wix-ui-theme/assets/buttons.png)

## Basic Example
```javascript
import CoreButton from 'wix-ui-core/Button';
import {ThemedComponent} from 'wix-ui-theme';

const theme = {
  color: 'green',
  backgroundColor: 'red',

  hover: {
    color: 'white',
    backgroundColor: 'black'
  };

  export const ThemedButton = ({theme, ...coreProps}) => (
    <ThemedComponent theme={theme}>
      <CoreButton {...coreProps}> 
    </ThemedComponent>
  );
}
```

## Why do we need themes
- Prevent code duplication
- Make it easy to style components to match the different designs.

## Themed libraries
The themes we currently have at Wix (WIP):
- [Backoffice](https://github.com/wix/wix-ui/tree/master/packages/wix-ui-backoffice)
- [Tpa](https://github.com/wix/wix-ui/tree/master/packages/wix-ui-tpa)

### Implement your components
We want to create a new themed component which renders the core component with additional styles.

The core component is already implemented in `wix-ui-core`, and the styles will be generated from the custom theme you need to write.

The theme is an object, or a fucnction that gets some optional additional props as arguments, and returns an object with a very specific structure. Each component has it's own theme structure.
For example:

```javascript
const theme = ({height, skin}) => ({
  fontSize: height === 'small' ? '14px' : '20px',
  color: skin === 'normal' ? 'white' : 'blue',
  backgroundColor: skin === 'normal' ? 'blue' : 'white',
  
  hover: {		
    color: 'blue',		
    backgroundColor: 'green'		
  }
});
```

Note that we usually wouldn't want to pass those additional props to the core component, although it is possible.
Those props are being used to generate the theme object which we will then pass to the Core component.

All of that is being taken care of with the `ThemedComponent` component which expects to get the core component as a `children` prop, a `theme` function / object prop, and some optional props which can be used by the theme function in order to generate the theme object.

Here is an example of how to implement a themed Button component:

```javascript
import CoreButton from 'wix-style-react/Button';
import {ThemedComponent} from 'wix-style-react/theme';

const theme = ({height, skin}) => ({
  fontSize: height === 'small' ? '14px' : '20px',
  color: skin === 'normal' ? 'white' : 'blue',
  backgroundColor: skin === 'normal' ? 'blue' : 'white',
  
  hover: {		
    color: 'blue',		
    backgroundColor: 'green'		
  }
});

export const Button = ({height, skin, ...coreProps}) => (
  <ThemedComponent theme={theme} height={height} skin={skin}>
    <CoreButton {...coreProps}/>
  </ThemedComponent>
);
```
