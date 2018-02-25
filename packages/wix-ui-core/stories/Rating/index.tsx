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

// import * as React from 'react';
// import createStory from '../create-story';
//
// import {Rating, RatingChangeEvent} from '../../src/components/Rating';
// import * as RatingSource from '!raw-loader!../../src/components/Rating/Rating.tsx';
//
// export const story = () => createStory({
//     category: 'Components',
//     name: 'Rating',
//     storyName: 'Rating',
//     component: Rating,
//     componentProps: (setState, getState) => ({
//         rating: 3,
//         onChange: (event: RatingChangeEvent) => setState({rating: event.value}),
//         mode: 'display',
//         checkedIcon: <span style={{fontSize: '40px'}}>⭐</span>,
//         uncheckedIcon: <span style={{fontSize: '40px'}}>★</span>,
//         reviewLabels: [' ', ' ', ' ', ' ', ' '],
//         ratingPosition: 'left',
//         showRating: true,
//         'data-hook': 'rating-story'
//     }),
//     source: RatingSource
//   });
