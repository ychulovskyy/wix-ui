import * as React from 'react';
import createStory from '../create-story';

import {Rating} from '../../src/components/Rating';
import * as RatingSource from '!raw-loader!../../src/components/Rating/Rating.tsx';

export const story = () => createStory({
    category: 'Components',
    name: 'Rating',
    storyName: 'Rating',
    component: Rating,
    componentProps: (setState, getState) => ({
        checkedIcon: <span style={{fontSize: '80px'}}>⭐</span>,
        uncheckedIcon: <span style={{fontSize: '40px'}}>⭐</span>,
        reviewLabels: [' ', ' ', ' ', ' ', ' '],
        'data-hook': 'rating-story'
    }),
    source: RatingSource
  });
