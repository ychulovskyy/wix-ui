import * as React from 'react';
import * as uniqueId from 'lodash/uniqueId';
import {bool, func, object, string} from 'prop-types';
import tsStyle from './ToggleSwitch.st.css';

/* ICON STUFF */
export const activeViewBox = '0 0 41 32';
export const activePathD = 'M0.169 17.815c0.169 1.098 0.76 2.111 1.689 2.871l14.269 10.385c1.942 1.435 4.644 1.013 6.079-0.844l18.069-23.303c1.435-1.858 1.098-4.559-0.844-5.995s-4.644-1.098-6.164 0.844l-15.367 19.842-10.723-7.852c-1.942-1.435-4.644-1.013-6.164 0.844-0.76 0.929-1.013 2.111-0.844 3.208z';
export const inactiveViewBox = '0 0 143 32';
export const inactivePathD = 'M0 0h142.545v32h-142.545v-32z';
export const getViewBox = checked => checked ? activeViewBox : inactiveViewBox;
export const getPathDescription = checked => checked ? activePathD : inactivePathD;

export interface ToggleSwitchProps {
  checked?: boolean;
  disabled?: boolean;
  onChange: React.EventHandler<React.ChangeEvent<HTMLInputElement>>;
  className?: string;
  style?: React.CSSProperties;
  id?: string;
}

/**
 * Toggle Switch
 */
export class ToggleSwitch<P = {}> extends React.PureComponent<ToggleSwitchProps & P> {
  static displayName = 'ToggleSwitch';
  id: string = this.props.id || uniqueId('ToggleSwitch');

  private toggle: HTMLLabelElement;

  static propTypes = {
    /** Is the toggleSwitch checked or not */
    checked: bool,
    /** Callback function when user changes the value of the component */
    onChange: func.isRequired,
    /** Is the toggleSwitch disabled or not */
    disabled: bool,
    /** Styles object */
    style: object,
    /** Component ID, will be generated automatically if not provided */
    id: string
  };

  static defaultProps = {checked: false, style: {}};

  componentDidMount() {
    this.toggle.addEventListener('keydown', this._listenToSpace);
  }

  componentWillUnmount() {
    this.toggle.removeEventListener('keydown', this._listenToSpace);
  }

  _listenToSpace = e => {
    if (e.key === ' ') {
      e.preventDefault();
      this._handleChange(e);
    }
  }

  _handleChange = e => {
    if (!this.props.disabled) {
      this.props.onChange(e);
    }
  }

  render() {
    const {checked, disabled, style} = this.props;
    const {id} = this;

    return (
      <label
        {...tsStyle('root', {checked, disabled}, this.props)}
        style={style}
        tabIndex={0}
        ref={ref => this.toggle = ref
      }>
        <input
          type="checkbox"
          id={id}
          checked={checked}
          disabled={disabled}
          onChange={this._handleChange}
        />
        <div className={tsStyle.track} aria-label="Toggle" />
        <div className={tsStyle.knob} >
          <svg
            className={tsStyle.icon}
            viewBox={getViewBox(checked)}
          >
            <path d={getPathDescription(checked)} />
          </svg>
        </div>
      </label>
    );
  }
}
