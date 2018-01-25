import * as React from 'react';
import style from './MultiCheckbox.st.css';
import {arrayOf, object} from 'prop-types';
import {InputWithOptions} from '../InputWithOptions';
import {Option} from '../../baseComponents/DropdownOption';

export interface MultiCheckboxProps {
  /** The dropdown options array */
  options: Array<Option>;
}

export interface MultiCheckboxState {
}

export class MultiCheckbox extends React.PureComponent<MultiCheckboxProps, MultiCheckboxState> {

  static displayName = 'MultiCheckbox';
  static propTypes = {
    /** The dropdown options array */
    options: arrayOf(object).isRequired,
  };

  constructor() {
    super();
  }

  render() {
    const {options} = this.props;
    return (
      <InputWithOptions
        {...style('root', {}, this.props)}
        closeOnSelect={false}
        options={options}
        />
    );
  }
}
