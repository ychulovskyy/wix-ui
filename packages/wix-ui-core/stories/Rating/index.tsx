import * as React from 'react';
import {Rating} from '../../src/components/Rating/Rating';

export class RatingStory extends React.Component {
    render() {
        return (
          <Rating rating={3} mode="display" checkedIcon={<span>🦄</span>}
                  uncheckedIcon={<span>🦄</span>} reviewLabels={[' ', ' ', ' ', ' ', ' ']} />
        )
    }
}
