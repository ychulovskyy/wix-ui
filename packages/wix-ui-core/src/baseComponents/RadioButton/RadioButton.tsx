import * as React from 'react';
import {string, func, node, bool} from 'prop-types';
import style from './RadioButton.st.css';

export interface RadioButtonProps {
  /** The value which the radio represents */
  value?: string;
  /** The group name which the button belongs to */
  name?: string;
  /** A callback to invoke on change */
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  /** A callback to invoke on hover */
  onHover?: (event: React.MouseEvent<HTMLElement>) => void;
  /** A callback to invoke on blur */
  onIconBlur?: (event: React.MouseEvent<HTMLElement>) => void;
  /** The checked icon */
  checkedIcon?: React.ReactNode;
  /** The unchecked icon */
  uncheckedIcon?: React.ReactNode;
  /** The label */
  label?: React.ReactNode;
  /** Sets checked status of the radio */
  checked?: boolean;
  /** Sets the disabled status of the radio */
  disabled?: boolean;
  /** Sets the required status of the radio */
  required?: boolean;
}

export interface RadioButtonState {
  focused: boolean;
}

export class RadioButton extends React.Component<RadioButtonProps, RadioButtonState> {

  constructor(props) {
    super(props);
    this.state = {
      focused: false
    };
  }

  static propTypes: Object = {
    /** The value which the radio represents */
    value: string,
    /** The group name which the button belongs to */
    name: string,
    /** A callback to invoke on change */
    onChange: func,
    /** A callback to invoke on hover */
    onHover: func,
    /** A callback to invoke on blur */
    onIconBlur: func,
    /** The checked icon */
    checkedIcon: node,
    /** The unchecked icon */
    uncheckedIcon: node,
    /** The label */
    label: node,
    /** Sets checked status of the radio */
    checked: bool,
    /** Sets the disabled status of the radio */
    disabled: bool,
    /** Sets the required status of the radio */
    required: bool
  };

  render() {
    const {value, name, checkedIcon, uncheckedIcon,
      label, checked, disabled, required, onIconBlur} = this.props;
    const focused = this.state.focused;

    return (
      <div {...style('root', {checked, disabled, focused}, this.props)}
           onChange={this.handleInputChange} onClick={this.handleInputChange}
           role="radio" aria-checked={checked}>
        <input type="radio" className={style.hiddenRadio} disabled={disabled} required={required}
               onFocus={this.onFocus} onBlur={this.onInputBlur} defaultChecked={checked}
               value={value} name={name} data-hook="radio-input"/>
        <span className={style.icon} data-hook="radio-icon"
              onMouseEnter={this.onHover} onMouseLeave={onIconBlur}>
          {checked ? checkedIcon : uncheckedIcon}
        </span>
        <span className={style.label} data-hook="radio-label">{label}</span>
      </div>
    );
  }

  handleInputChange = event => {
    if (!this.props.disabled) {
      event.value = this.props.value;
      this.props.onChange(event);
    }
  }

  onFocus = () => {
    this.setState({focused: true});
  }

  onInputBlur = () => {
    this.setState({focused: false});
  }

  onHover = event => {
    event.value = this.props.value;
    this.props.onHover(event);
  }
}
