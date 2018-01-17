import * as React from 'react';
import * as uniqueId from 'lodash/uniqueId';
import {bool, func, object, string} from 'prop-types';
import style from './Checkbox.st.css';

export interface CheckboxProps {
  checked?: boolean;
  disabled?: boolean;
  onChange?: React.EventHandler<React.ChangeEvent<HTMLInputElement>>;
  id?: string;
  tabIndex?: number;
  tickIcon?: React.ReactNode;
  indeterminateIcon?: React.ReactNode;
  children?: React.ReactNode;
  error?: boolean;
  name?: string;
  readOnly?: boolean;
  required?: boolean;
  indeterminate?: boolean;
  autoFocus?: boolean;
  ['aria-controls']?: string[];
}

export interface CheckBoxState {
  isFocused: boolean;
}

/**
 * Checkbox
 */
class Checkbox extends React.PureComponent<CheckboxProps> {
  public static defaultProps: Partial<CheckboxProps> = {
    tickIcon: (
      <span
        className={`${style.icon} ${style.tickIcon}`}
        data-automation-id="CHECKBOX_TICKMARK"
      />
    ),
    indeterminateIcon: (
      <span
        className={`${style.icon} ${style.indeterminateIcon}`}
        data-automation-id="CHECKBOX_INDETERMINATE"
      />
    ),
    // tslint:disable-next-line:no-empty
    onChange: () => {},
    checked: false,
    indeterminate: false,
    tabIndex: 0
  };

  public state: CheckBoxState = {isFocused: false};

  static displayName = 'Checkbox';
  id: string = this.props.id || uniqueId('Checkbox');

  private checkbox: HTMLInputElement;

  static propTypes = {
    /** Is the Checkbox checked or not */
    checked: bool,
    /** Callback function when user changes the value of the component */
    onChange: func.isRequired,
    /** Is the Checkbox disabled or not */
    disabled: bool,
    /** Classes object */
    classes: object.isRequired,
    /** Component ID, will be generated automatically if not provided */
    id: string,
  };

  componentDidMount() {
    this.checkbox.addEventListener('keydown', this.listenToSpace);
  }

  componentWillUnmount() {
    this.checkbox.removeEventListener('keydown', this.listenToSpace);
  }

  private listenToSpace = e => {
    const SPACEBAR = 32;
    if (e.keyCode === SPACEBAR) {
      e.preventDefault();
      this.handleChange(e);
    }
  }

  private handleChange = e => {
    if (!this.props.disabled) {
      this.props.onChange(e);
    }
  }

  private handleClick: React.MouseEventHandler<HTMLDivElement> = e => {
    this.handleChange(e);
    this.checkbox && this.checkbox.focus();
    this.setState({isFocused: false});
  }

  // private handleChange = (e: React.SyntheticEvent<HTMLElement>) => {
  //   if (!this.props.disabled && !this.props.readOnly) {
  //     this.props.onChange!(Object.assign({
  //       checked: this.props.indeterminate ? true : !this.props.value
  //     }, e));
  //   }
  // }

  // handleInputClick will be called only on pressing "space" key when nativeInput has focus
  private handleInputClick: React.MouseEventHandler<HTMLInputElement> = e => {
    e.stopPropagation();
    this.setState({isFocused: true});
  }

  private handleInputBlur: React.FocusEventHandler<HTMLInputElement> = () => {
    this.state.isFocused && this.setState({isFocused: false});
  }

  private handleInputFocus: React.FocusEventHandler<HTMLInputElement> = () => {
    !this.state.isFocused && this.setState({isFocused: true});
  }

  render() {
    const {checked, disabled} = this.props;
    // const {id} = this;

    return (
      <div {...style('root', {checked, disabled}, this.props) }
        data-automation-id="CHECKBOX_ROOT"
        onClick={this.handleClick}
        role="checkbox"
        tabIndex={0}
        aria-checked={this.props.indeterminate ? 'mixed' : this.props.checked}
        >
          <input
            data-automation-id="NATIVE_CHECKBOX"
            type="checkbox"
            className="nativeCheckbox"
            checked={this.props.checked}
            disabled={this.props.disabled}
            onClick={this.handleInputClick}
            onChange={this.handleChange}
            onFocus={this.handleInputFocus}
            onBlur={this.handleInputBlur}
            id={this.props.id}
            tabIndex={this.props.tabIndex}
            autoFocus={this.props.autoFocus}
            name={this.props.name}
            aria-controls={this.props['aria-controls']}
            ref={ref => this.checkbox = ref!}
          />

          <span
            className="box"
            data-automation-id="CHECKBOX_BOX"
          >
            {this.props.indeterminate ?
              this.props.indeterminateIcon : (this.props.checked && this.props.tickIcon)}
          </span>

          {this.props.children ? (
            <div
              data-automation-id="CHECKBOX_CHILD_CONTAINER"
              className="childContainer"
            >
              {this.props.children}
            </div>
          ) : null
          }
      </div>
    );
  }
}

export default Checkbox;
