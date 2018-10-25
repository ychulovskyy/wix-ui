**Table of Contents**

- [Description](#description)

- [Elements](#elements)

- [API](#api)

- [States](#states-(if-applicable))

- [Accessibility](#accessibility)

- [Behavior](#behavior)
  - [Validation](validation)
  - [Edge case handling](edge-case-handling)

- [Input Methods](#input-methods)
  - [Keyboard](#keyboard)
  - [Mouse](#mouse)
  - [Touch](#touch)

- [RTL](#rtl)

- [DOM Structure](#dom-structure)

- [Design](#design)

  ​



## Description

**Segmented Toggle** allows users to choose a single option out of a group. Recommended use is for a small amount of predefined options.


### Elements

This component consists of **container** which is the root of the component and **option** which holds each of the select-able options


## API

**SegmentedToggle Props**
| name     | type                                                     | defaultValue | isRequired | description                                                                                 |
|:---------|:---------------------------------------------------------|:-------------|:-----------|:--------------------------------------------------------------------------------------------|
| value    | string                                                   |              |            | sets the selected option of the group. should match the `value` prop of one of the children |
| onChange | (event: React.ChangeEvent<React.SyntheticEvent>) => null | () => {}     |            | event to call when selection change                                                         |
| tabIndex | number                                                   | 0            |            | the tabIndex value to put on the selected item                                              |
| disabled | boolean                                                  | false        |            | disables all functionality of the component AND toggles non-functional visual state         |
| readOnly | boolean                                                  | false        |            | disables all functionality of the component WITHOUT toggling non-functional visual state    |
| children | Component<ToggleableItem>                                    |              |            | The options to render. Only children which are of type ToggleItem will be rendered          |

**ToggleableItem Props**
| name     | type      | defaultValue | isRequired | description                                                 |
|:---------|:----------|:-------------|:-----------|:------------------------------------------------------------|
| value    | string    |              |            | sets the value of the specific option. Must be unique       |
| disabled | boolean   | false        |            | makes the component non selectable and toggles visual state |
| children | ReactNode | false        |            | The content to render.                                      |


## React Code Example

```jsx
import * as React from 'react';
import { SegmentedToggle } from 'wix-ui-core/SegmentedToggle';
import { EditSVG, TrashSVG} from './my-icons'
import style from './style.st.css';

export class ComponentsDemo extends React.Component<{}, {}>{
    state = {
        selected: 'item1'
    }

    onChange = (event:React.ChangeEvent<React.SyntheticEvent>, value: string): null => {
        this.setState({value})
    }

    render() {
        return (
            <div>
                <SegmentedToggle
                    value={this.state.selected}
                    onChange={this.onChange} 
                >
                    <ToggleItem value='item1'>Raw</ToggleItem>
                    <ToggleItem value='item2'>Blame</ToggleItem>
                    <ToggleItem value='item3'>History</ToggleItem>
                    <ToggleItem value='item4' disabled>{EditSVG}</ToggleItem>
                    <ToggleItem value='item5'>{TrashSVG}</ToggleItem>
                </SegmentedToggle>
                   
            </div>
        )
    }
}
```



**Style**

Brief description of pseudo-classes and custom CSS states that can be applied to the component.
See [README.md](./README.md) for more info. 



## **ToggleItem** States

A description of all the internal states of the component, and how they should be shown visually.

| State         | Description                            | Link to design |
|:--------------|:---------------------------------------|:---------------|
| default       | Default component appearance           |                |
| selected      | selected option                        |                |
| disabled      | disabled option                        |                |
| hover         | when hovering over option              |                |
| focus         | the option has focus                   |                |
| focus-visible | the option has focus and visible focus |                |
| pressed       | toggles when the option is pressed     |                |



## Accessibility

TBD role, aria-labels 
roving tabIndex

##### Keyboard

**SegmentedToggle** has a radio group keyboard behavior, meaning after TAB into focus navigation is done via arrow keys. UP or LEFT will SELECT the previous option while DOWN or RIGHT will SELECT next option of the group. TAB will move focus 
##### Focus

**SegmentedToggle** has a radio group focus behavior, meaning focus is put on the selected item. Changing selection causes focus to shift to the new selected item. By default mouse selection causes non visual focus while keyboard selection toggles focus visible visual state.

##### Reference links

> Links to similar ARIA compatible components for reference



### Behavior
**SegmentedToggle** should be viewed as a replacement to a radio group in all aspects and should mimic its "native" counterpart (meaning a few `<input type="radio" name="..."/>`>) behavior.


#### Validation 
toggleItem tabIndex override
Default validation needs to be addressed, as well as the component behavior when validation is broken.

> E.g. 
> Time Input component will address inputs that fail validation like letters, numbers larger than 24 for hours, numbers larger than 59 for minutes, etc. What should happen, what should be shown to the user, etc.

The component may allow a developer to use his own validation patterns where relevant. 
**In such a case, there should be an example implementation in the readme doc.**



#### Edge case handling

| Case                                     | Handling                                 |
| ---------------------------------------- | ---------------------------------------- |
| value out of min/max range               | Show error in console and set value to corresponding min/max |
| value out of step (e.g. min=0 / max=20, step=5, value=7) | Show error in console, handle displays on 7. User can increase value (in this case 7 will change to 10) OR decrease value (7 will change to 5) and after that step will work as expected. |



## Input Methods

#### Keyboard

| Keys      | Action                      |
| --------- | --------------------------- |
| tab       | moves to next element       |
| shift+tab | moves to previous element   |
| UP / LEFT      | moves selection & focus to previous option |
| DOWN / RIGHT      | moves selection & focus to next option |


**RTL** ( if applicable )

| Keys | Action |
| ---- | ------ |
|      |        |



#### Mouse

| Event | Action                | NOTE                     |
| ----- | --------------------- | ------------------------ |
| hover | what happens on hover | Side notes (if relevant) |
| click |                       |                          |



#### **Touch**

| Event | Action              | NOTE                    |
| ----- | ------------------- | ----------------------- |
| tap   | what happens on tap | Side note (if relevant) |
| drag  |                     |                         |



## RTL

> We are deciding on how are we going to handle the RTL. Detailed description will be added later.



## DOM structure

Each component should have a visual style guide for all of its visual states and elements structure. This style guide will be based on the **Style API**, and a visual theme agreed upon as our reset style (blank base).

If more themes exist, they should be shown as well, and available as options through change of theme.

In addition, a link to Zeplin or a similar system is optional.



## Design

Link to [assets](link goes here)