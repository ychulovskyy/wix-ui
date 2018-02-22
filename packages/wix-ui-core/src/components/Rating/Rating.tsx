import * as React from 'react';
import {RadioButton} from '../../baseComponents/RadioButton';
import {string, func, node, bool, number, oneOf, array} from 'prop-types';
import style from './Rating.st.css';

/**
 * This component is of dual purpose -
 * can be used to display rating
 * and to get input about a rating.
 */
export interface RatingProps {
  // Some properties are dual-purpose for display and input modes //
  /** Mode - Display or Input */
  mode?: 'display' | 'input';
  /** Checked Icon */
  checkedIcon?: React.ReactNode;
  /** Unchecked Icon */
  uncheckedIcon?: React.ReactNode;
  /** The rating displayed / Current rating selected */
  rating?: number;
  /** on Display mode, shows the number of reviews */
  reviewsCount?: number;
  /** on Display mode, the label shown to describe the reviews */
  reviewsCountLabel?: string;
  /** on Display mode, toggles the numeric rating */
  showRating?: boolean;
  /** on Display mode, toggles the numeric count */
  showReviewsCount?: boolean;
  /** on Display mode, specifies the position of the numeric rating in relative to the stars */
  ratingPosition?: 'left' | 'right';
  /** on Display mode, specifies a placeholder text to use (if that option is selected) in the absence of reviews */
  noReviewsPlaceholder?: string;
  /** on Input mode, a callback to invoke when the rating is changed by the user */
  onChange?: Function;
  /** on Input mode, the title of the rating */
  title?: string;
  /** on Input mode, the labels that represent each rating value */
  reviewLabels?: Array<string>;
  /** on Input mode, the position of the labels that represent each rating value */
  labelLayout?: 'above' | 'below' | 'aside';
  /** on Input mode, toggles the title */
  showTitle?: boolean;
  /** on Input mode, toggles the labels */
  showLabels?: boolean;
  /** on Input mode, specifies if this is required */
  required?: boolean;
}

export interface RatingState {
  hovered: number;
}

export class Rating extends React.Component<RatingProps, RatingState> {
  constructor(props) {
    super(props);
    this.state = {
      hovered: undefined
    };
  }

  static displayName = 'Rating';
  static propTypes: Object = {
    /** Mode - Display or Input */
    mode: oneOf(['display', 'input']),
    /** Checked Icon */
    checkedIcon: node,
    /** Unchecked Icon */
    uncheckedIcon: node,
    /** The rating displayed / Current rating selected */
    rating: number,
    /** on Display mode, shows the number of reviews */
    reviewsCount: number,
    /** on Display mode, the label shown to describe the reviews */
    reviewsCountLabel: string,
    /** on Display mode, toggles the numeric rating */
    showRating: bool,
    /** on Display mode, toggles the numeric count */
    showReviewsCount: bool,
    /** on Display mode, specifies the position of the numeric rating in relative to the stars */
    ratingPosition: oneOf(['left', 'right']),
    /** on Display mode, specifies a placeholder text to use (if that option is selected) in the absence of reviews */
    noReviewsPlaceholder: string,
    /** on Input mode, a callback to invoke when the rating is changed by the user */
    onChange: func,
    /** on Input mode, the title of the rating */
    title: string,
    /** on Input mode, the labels that represent each rating value */
    reviewLabels: array,
    /** on Input mode, the position of the labels that represent each rating value */
    labelLayout: oneOf(['above', 'below', 'aside']),
    /** on Input mode, toggles the title */
    showTitle: bool,
    /** on Input mode, toggles the labels */
    showLabels: bool,
    /** on Input mode, specifies if this is required */
    required: bool
  };

  onRatingChange = (event, value) => {
    console.log('click value ', value);
    this.props.onChange(event, value);
  }

  onIconHover = rating => {
    this.setState({hovered: rating});
  }

  onIconBlur = () => {
    this.setState({hovered: undefined})
  }

  render() {
    const {checkedIcon, uncheckedIcon, reviewLabels, ratingPosition, showRating} = this.props;

    return (
      <div {...style('root', {ratingRight: ratingPosition === 'right', noRating: !showRating}, this.props)} role="radiogroup">
        <span className={style.ratingValue}>{this.props.rating}</span>
        <span className={style.stars}> {
          [1,2,3,4,5]
            .map(value =>
              <RadioButton
                onChange={this.onRatingChange} value={`${value}`} key={value}
                checked={value <= (this.state.hovered || this.props.rating)}
                label={reviewLabels[value - 1]} onHover={this.onIconHover}
                onBlur={this.onIconBlur} checkedIcon={checkedIcon}
                uncheckedIcon={uncheckedIcon} />
            )
        } </span>
      </div>
    );
  }
}
