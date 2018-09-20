import * as React from 'react';
import {string, func, object, node} from 'prop-types';
import {VIDEO_EVENTS, ENGINE_STATES} from 'playable';
import styles from './Overlay.st.css';

export interface OverlayProps {
  title?: string;
  playButton?: React.ReactNode;
  poster?: string;
  onPlayClick?: Function;
  eventEmitter?: any;
}

export interface OverlayState {
  isHidden: boolean;
}

const noop = () => null;

export class Overlay extends React.PureComponent<OverlayProps, OverlayState> {
  static displayName = 'Video';
  static dependencies = ['eventEmitter'];

  containerRef: HTMLDivElement;
  player: any;

  static propTypes: React.ValidationMap<OverlayProps> = {
    title: string,
    playButton: node,
    poster: string,
    onPlayClick: func,
    eventEmitter: object,
  };

  static defaultProps = {
    onPlayClick: noop,
  };

  state = {isHidden: false};
  _eventEmitter: any;

  constructor(props) {
    super(props);

    this._eventEmitter = props.eventEmitter;
    this._bindEvents();
  }

  _show = () => {
    this.setState({isHidden: false});
  }
  _hide = () => {
    this.setState({isHidden: true});
  }

  _bindEvents() {
    this._eventEmitter.on(VIDEO_EVENTS.PLAY_REQUEST_TRIGGERED, this._hide);
    this._eventEmitter.on(ENGINE_STATES.PLAYING, this._hide);

    this._eventEmitter.on(ENGINE_STATES.ENDED,  this._show);
    this._eventEmitter.on(ENGINE_STATES.SRC_SET, this._show);
    this._eventEmitter.on(VIDEO_EVENTS.RESET,  this._show);
  }

  _unbindEvents() {
    this._eventEmitter.off(VIDEO_EVENTS.PLAY_REQUEST_TRIGGERED, this._hide);
    this._eventEmitter.off(ENGINE_STATES.PLAYING, this._hide);

    this._eventEmitter.off(ENGINE_STATES.ENDED,  this._show);
    this._eventEmitter.off(ENGINE_STATES.SRC_SET, this._show);
    this._eventEmitter.off(VIDEO_EVENTS.RESET,  this._show);
  }

  _onPlayClick = () => {
    const {onPlayClick} = this.props;
    this._hide();
    onPlayClick();
  }

  componentWillUnmount() {
    this._unbindEvents();
    this._eventEmitter = null;
  }

  render() {
    const {title, poster, playButton} = this.props;
    const coverStyles = {
      backgroundImage: poster ? `url(${poster})` : 'none'
    };
    return (
      (!this.state.isHidden && poster) ? (
        <div
          {...styles('root', {}, this.props)}
          style={coverStyles}
          onClick={this._onPlayClick}
          data-hook="cover"
        >
          <div className={styles.overlay}>
            {title && <div data-hook="title" title={title} className={styles.title}>{title}</div>}
            {playButton}
          </div>
        </div>
      ) : null
    );
  }
}