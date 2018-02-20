import * as React from 'react';
import {string, func, node, bool} from 'prop-types';
import style from './RadioButton.st.css';

export interface RadioButtonProps {
  /** The value which the radio represents */
  value?: string;
  /** The group name which the button belongs to */
  name?: string;
  /** A callback to invoke */
  onChange?: Function;
  /** The icon */
  icon?: React.ReactNode;
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
    /** A callback to invoke */
    onChange: func,
    /** The icon */
    icon: node,
    /** The label */
    label: node,
    /** Sets checked status of the radio */
    checked: bool,
    /** Sets the disabled status of the radio */
    disabled: bool,
    /** Sets the required status of the radio */
    required: bool
  };

  handleInputChange = event => {
    this.props.onChange(event, this.props.value);
  }

  onFocus = () => {
    this.setState({focused: true});
  }

  onBlur = () => {
    this.setState({focused: false});
  }

  render() {
    const {value, name, icon, label, checked, disabled, required} = this.props;
    const focused = this.state.focused;

    return (
      <div {...style('root', {checked, disabled, focused}, this.props)}
           onChange={!disabled ? this.handleInputChange : () => null}
           onClick={!disabled ? this.handleInputChange : () => null}
           role="radio" aria-checked={!!checked}>
        <input type="radio" className={style.hiddenRadio} disabled={disabled} required={required}
               onFocus={this.onFocus} onBlur={this.onBlur} defaultChecked={checked}
               value={value} name={name} data-hook="radio-input"/>
        <span className={style.icon} data-hook="radio-icon">{icon}</span>
        <span className={style.label} data-hook="radio-label">{label}</span>
      </div>
    );
  }
}
