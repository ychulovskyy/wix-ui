import * as React from 'react';
const noop = require('lodash/noop');
import {string, func, bool, number} from 'prop-types';
import {Text, TextProps} from '../StylableText';
import style from './TextArea.st.css';
import * as classNames from 'classnames';
import {DEFAULT_MAX_ROWS, DEFAULT_MAX_ROWS_FOCUS} from './constants';

export interface TextAreaProps {
  /** Value of the textArea */
  value?: string;
  /** Placeholder for the textArea */
  placeholder?: string;
  /** Callback when the user interacted with the textArea */
  onChange?: React.ChangeEventHandler<HTMLTextAreaElement>;
  /** Callback when the user focuses the textArea*/
  onFocus?: React.FocusEventHandler<HTMLTextAreaElement>;
  /** Callback when the user lost focus of the textArea */
  onBlur?: React.FocusEventHandler<HTMLTextAreaElement>;
  /** Callback for keyDown event */
  onKeyDown?: React.KeyboardEventHandler<HTMLTextAreaElement>;
  /** Callback for keyPress event */
  onKeyPress?: React.KeyboardEventHandler<HTMLTextAreaElement>;
  /** Callback for keyUp event */
  onKeyUp?: React.KeyboardEventHandler<HTMLTextAreaElement>;
  /** The tabindex */
  tabIndex?: number;
  /** is in error state */
  isError?: boolean;
  /** Error message to show in error state  */
  errorMessage?: string;
  /** Disabled state */
  disabled?: boolean;
  /** should auto focus textarea */
  autoFocus?: boolean;
  /** Height will not be set or changed dynamically by the component */
  staticHeightMode?: boolean;
  /** maximum height of the textarea when not in focus - in units of rows */
  maxHeightRows?: number;
  /** maximum height of the textarea when in focus - in units of rows */
  maxHeightFocusRows?: number;
}

export interface TextAreaState {
  focus: boolean;
  focusChange: boolean;
  height: number;
}

export class TextArea extends React.Component<TextAreaProps, TextAreaState> {
  static displayName = 'TextArea';
  static propTypes;

  static defaultProps: TextAreaProps = {
    onChange: noop,
    onBlur: noop,
    onFocus: noop,
    onKeyDown: noop,
    onKeyPress: noop,
    onKeyUp: noop,
    isError: false,
    disabled: false,
    errorMessage: '',
    autoFocus: false,
    staticHeightMode: false,
    value: '',
    maxHeightRows: DEFAULT_MAX_ROWS,
    maxHeightFocusRows: DEFAULT_MAX_ROWS_FOCUS
  };

  _hiddenTextAreaRef: HTMLTextAreaElement | null = null;
  _singleRowHiddenTextAreaRef: HTMLTextAreaElement | null = null;
  _visibleTextAreaRef: HTMLTextAreaElement | null = null;

  constructor(props) {
    super(props);
    this.state = {height: 0, focusChange: false, focus: this.props.autoFocus};
  }

  /* End Component def */
  computeNewHeight({value, maxHeightFocusRows, maxHeightRows}: TextAreaProps) {
    this._hiddenTextAreaRef.value = value || '';
    const totalHeight = this._hiddenTextAreaRef.scrollHeight;

    const lineHeight = this._singleRowHiddenTextAreaRef.scrollHeight;
    const allowedRows = this.state.focus ? maxHeightFocusRows : maxHeightRows;
    const allowedHeight = allowedRows * lineHeight;

    let newHeight = Math.min(allowedHeight, totalHeight);
    newHeight = Math.max(newHeight, lineHeight);

    this.setState({height: newHeight});
  }

  componentDidMount() {
    this.computeNewHeight(this.props);
    if (this.props.autoFocus && this._visibleTextAreaRef) {
        this._visibleTextAreaRef.focus();
        this.setState({focus: true});
    }
  }

  componentWillReceiveProps(nextProps: TextAreaProps) {
    if (nextProps.value !== this.props.value) {
      this.setState({focusChange: false});
      this.computeNewHeight(nextProps);
    }
  }

  handleUpdate = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    this.props.onChange && this.props.onChange(e);
  }

  onFocus = (e: React.FocusEvent<HTMLTextAreaElement>) => {
    this.props.onFocus && this.props.onFocus(e);
    this._visibleTextAreaRef.select();
    this.setState({focus: true, focusChange: true},
      () => this.computeNewHeight(this.props));
  }

  onBlur = (e: React.FocusEvent<HTMLTextAreaElement>) => {
    this.props.onBlur && this.props.onBlur(e);
    this._visibleTextAreaRef.scrollTop = 0;
    this.setState({focus: false, focusChange: true},
      () => this.computeNewHeight(this.props));
  }

  render() {
    const {value, placeholder, onChange, onKeyDown, onKeyPress, onKeyUp, isError, errorMessage, disabled, tabIndex} = this.props;
    const {focus, focusChange, height} = this.state;

    return (
      <div {...style('root', {focus, error: isError && !disabled, disabled}, {...this.props})}>
        <textarea data-hook="textarea-input"
          style={{height}}
          className={classNames(style.textArea, {[style.focusChange]: this.state.focusChange})}
          value={value || ''}
          ref={ref => this._visibleTextAreaRef = ref}
          placeholder={placeholder}
          onChange={this.handleUpdate}
          onFocus={this.onFocus}
          onBlur={this.onBlur}
          onKeyDown={onKeyDown}
          onKeyPress={onKeyPress}
          onKeyUp={onKeyUp}
          tabIndex={tabIndex}
          disabled={disabled}
        />
        <textarea
          className={style.hiddenTextArea}
          ref={ref => this._hiddenTextAreaRef = ref}
          aria-hidden
          tabIndex={-1}
          readOnly
          rows={1}
        />
        <textarea
          className={style.hiddenTextArea}
          value={''}
          rows={1}
          ref={ref => this._singleRowHiddenTextAreaRef = ref}
          aria-hidden
          tabIndex={-1}
          readOnly
        />
        <div className={style.underline}></div>
        {isError && errorMessage && !disabled && <div className={style.errorMessage} data-hook="validation-error">
          <Text className={style.errorMessageText}>{errorMessage}</Text>
        </div>}
      </div>
    );
  }
}

TextArea.propTypes = {
  /** Value of the textArea */
  value: string,
  /** Placeholder for the textArea */
  placeholder: string,
  /** Callback when the user interacted with the textArea */
  onChange: func,
  /** Callback when the user focuses the textArea*/
  onFocus: func,
  /** Callback when the user lost focus of the textArea */
  onBlur: func,
  /** Callback for keyDown event */
  onKeyDown: func,
  /** Callback for keyPress event */
  onKeyPress: func,
  /** Callback for keyUp event */
  onKeyUp: func,
  /** The tabindex */
  tabIndex: number,
  /** is in error state */
  isError: bool,
  /** Error message to show in error state  */
  errorMessage: string,
  /** Disabled state */
  disabled: bool,
  /** should auto focus textarea */
  autoFocus: bool,
  /** Height will not be set or changed dynamically by the component */
  staticHeightMode: bool,
  /** maximum height of the textarea when not in focus - in units of rows */
  maxHeightRows: number,
  /** maximum height of the textarea when in focus - in units of rows */
  maxHeightFocusRows: number,
};
