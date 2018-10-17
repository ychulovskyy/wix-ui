# Avatar (WIP)

Avatar is a type of "icon" that represents a user, either as an image, icon or initials.


## Elements

Elements are "container" and content, which could be classified to either "text", "image" or "icon"


## API

#### Component Props

| name | type | defaultValue | isRequired | description |
| -- | -- | -- | -- | -- |
| disabled | boolean | false |  | If `true`, the component will not be interactive |
| name | string  |  |  | The name of the avatar user. Initials will be generated from the name    |
| imgProps | string  |  |  | the source url to load image from |
| icon | JSX Element |  |  | an SVG icon component  |


## General Behavior
this component will display content based on the props provided. For example, if `imgSrc` is provided (and successfully loaded), it will display an image as content. If more than one type of content prop is provided, it will first attempt to load the image then icon and lastly initials.

name conversion examples: 
<br/> John Doe --> JD 
<br/> John H. Doe --> JHD 
<br/> John Hurley Stanley Kubrik Doe --> JHD




### React Code Example

**Example 1:**

```jsx
//code example goes here
import * as React from 'react';
import { Avatar } from 'wix-ui-core/Avatar';
import { AvatarIcon } from 'my-icons/AvatarIcon';
import style from './style.st.css'; // link to Style file - see examples of style files below

export class ComponentsDemo extends React.Component<{}, {}>{

    render() {
        return (
            <div {...style('root')}>
                <Avatar
                    classnName={style.avatar}
                    name="John Doe"
                    imgProps={{
                        srcset="elva-fairy-320w.jpg 320w, elva-fairy-800w.jpg 800w"
                        sizes="(max-width: 320px) 280px, 800px"
                        src="elva-fairy-800w.jpg"
                        alt="Elva dressed as a fairy"
                    }}
                    icon={<AvatarIcon/>}
                    name="John Mystery Doe"
                    />
            </div>
        )
    }
}
```


## Style API

#### Subcomponents (pseudo-elements)

| selector | description  | type | children pseudo-states |
| -- | -- | -- | -- |
| ::container | Allows styling the background |  |  |
| ::image-container | Allows styling the image container |  |  |
| ::icon-container | Allows styling the icon container |  |  |
| ::initials | Allows styling the text container |  |  |

#### Custom CSS States (pseudo-classes)

| state | description |
| -- | -- |


### Style Code Example

```css
:import {
    -st-from: './components/avatar'; 
    -st-default: Avatar;
}

.root {}
.avatar{
    -st-extends: Avatar
}
.avatar::text-container {
    color: red
}
```