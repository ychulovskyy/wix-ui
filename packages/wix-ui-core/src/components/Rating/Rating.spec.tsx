import * as React from 'react';
import {ratingDriverFactory} from './Rating.driver';
import {createDriverFactory} from 'wix-ui-test-utils/driver-factory';
import {Rating} from './Rating';

function createRating(props = {}) {
  return <Rating data-hook="rating-spec" mode="display"
                 checkedIcon={<span>🦄</span>} uncheckedIcon={<span>🦄</span>}
                 {...props}/>;
}

describe('Rating', () => {
  const createDriver = createDriverFactory(ratingDriverFactory);

  it('renders to the screen', () => {
    const rating = createDriver(createRating());

    expect(rating.exists()).toBeTruthy();
  });
});
