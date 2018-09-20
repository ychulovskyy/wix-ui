import * as React from 'react';
import {string, number, func, bool, array, node, oneOfType, oneOf} from 'prop-types';
import {ENGINE_STATES} from 'playable';
import {Overlay} from './Overlay';
import {ReactPlayable} from 'react-playable';
import styles from './Video.st.css';

const noop = () => null;

export interface VideoProps {
  id?: string;
  src?: string | Array<string>;
  width?: number | string;
  height?: number | string;
  title?: string;
  playButton?: React.ReactNode;
  fillAllSpace?: boolean;
  loop?: boolean;
  volume?: number;
  logoUrl?: string;
  onLogoClick?: Function;
  alwaysShowLogo?: boolean;
  controls?: boolean;
  preload?: 'auto' | 'metadata' | 'none';
  poster?: string;
  playing?: boolean;
  muted?: boolean;
  onPlay?: Function;
  onPause?: Function;
  onEnd?: Function;
  playableRef?: Function;
}

export interface VideoState {
  hasBeenPlayed: boolean;
}

const mapPropsToMethods = {  
  loop: 'setLoop',
  logoUrl: 'setLogo',
  alwaysShowLogo: 'setAlwaysShowLogo',
  onLogoClick: 'setLogoClickCallback',
  volume: 'setVolume',
  controls: (player, isShow) => {
    // TODO: replace it after playable API update
    if (isShow) {
      player.showPlayControl();
      player.showVolumeControl();
      player.showTimeControl();
      player.showFullScreenControl();
      player.showProgressControl();
    } else {
      player.hidePlayControl();
      player.hideVolumeControl();
      player.hideTimeControl();
      player.hideFullScreenControl();
      player.hideProgressControl();
    }
  },
  preload: 'setPreload',
  playing: (player, nextPlaying) => {
    const isPlaying = !player.isPaused && !player.isEnded;
    if (nextPlaying && isPlaying) {
      player.play();
    }
    if (!nextPlaying && isPlaying) {
      player.pause();
    }
  },
  muted: (player, nextMuted) => {
    if (nextMuted && !player.isMuted) {
      player.mute();
    }
    if (!nextMuted && player.isMuted) {
      player.unmute();
    }
  }
};


export class Video extends React.PureComponent<VideoProps, VideoState> {
  static displayName = 'Video';

  containerRef: HTMLDivElement;
  player: any;

  static propTypes: React.ValidationMap<VideoProps> = {
    /** Element ID */
    id: string,
    /** A string or array with source of the video. For more information see this [page](https://wix.github.io/playable/video-source) */
    src: oneOfType([
      string,
      array,
    ]),
    /** Width of video player */
    width: oneOfType([
      string,
      number,
    ]),
    /** Height of video player */
    height: oneOfType([
      string,
      number,
    ]),
    /** String that would be shown as title of video. */
    title: string,
    /** React Component to appear for the "Play" button on poster */
    playButton: node,
    /** Pass `true` to alow player fill all space of it container. */
    fillAllSpace: bool,
    /** Loop video playback. */
    loop: bool,
    /** Start value of volume for audio, `0..100`. */
    volume: number,
    /** URL to image that would be used as logo on video */
    logoUrl: string,
    /** Function that will be evaluated after click on logo */
    onLogoClick: func,
    /** Pass true to set the logo to be visible no matter what */
    alwaysShowLogo: bool,
    /** Pass false to hide controls */
    controls: bool,
    /** Type of preloading. For more info check [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/video) */
    preload: oneOf(['auto', 'metadata', 'none']),
    /** URL to image that would be used as poster on overlay */
    poster: string,
    /** Set to `true` or `false` to pause or play the media */
    playing: bool,
    /** Mutes the player */
    muted: bool,
    /** Called when media starts or resumes playing after pausing or buffering */
    onPlay: func,
    /** Called when media is paused */
    onPause: func,
    /** Called when media finishes playing */
    onEnd: func,
    /** Use `playableRef` to call instance methods on the [playable](https://wix.github.io/playable/api). */
    playableRef: func,
  };

  static defaultProps = {
    controls: true,
    onPlay: noop,
    onPause: noop,
    onEnd: noop,
    playableRef: noop,
  };

  state = {hasBeenPlayed: false};

  _onInit = player => {
    this.player = player;

    const {playableRef, playing} = this.props;

    this._bindEvents();
    
    // Not triggering setting properties, that was passed via wrapper
    this._updatePlayer({}, this.props);
    this.player.setAutoplay(!!playing);

    playableRef(this.player);
  }

  _bindEvents() {
    const {onPlay, onPause, onEnd} = this.props;

    this.player.on(ENGINE_STATES.PLAYING, onPlay);
    this.player.on(ENGINE_STATES.PAUSED, onPause);
    this.player.on(ENGINE_STATES.ENDED, onEnd);
  }

  _unbindEvents() {
    const {onPlay, onPause, onEnd} = this.props;

    this.player.off(ENGINE_STATES.PLAYING, onPlay);
    this.player.off(ENGINE_STATES.PAUSED, onPause);
    this.player.off(ENGINE_STATES.ENDED, onEnd);
  }

  _updatePlayer(currentProps, nextProps) {
    for (let propKey in nextProps) {
      const method = mapPropsToMethods[propKey];
      const isPropChanged = nextProps[propKey] !== currentProps[propKey];

      if (method && isPropChanged) {
        if (typeof method === 'string') {
          this.player[method](nextProps[propKey]);
        } else {
          method(this.player, nextProps[propKey]);
        }
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    this._updatePlayer(this.props, nextProps);
  }

  componentWillUnmount() {
    this._unbindEvents();
  }

  _play = (): void => {
    this.player.play();
  }

  render() {
    const {id, title, poster, playButton} = this.props;
    let {width, height} = this.props;

    if (this.props.fillAllSpace) {
      width = '100%';
      height = '100%';
    }

    return (
      <div
        id={id}
        style={{width, height}}
        {...styles('root', {}, this.props)}
      >
        <ReactPlayable 
          onInit={this._onInit}
          width={this.props.width} 
          height={this.props.height}
          src={this.props.src}
          title={this.props.title}
          fillAllSpace={this.props.fillAllSpace}
          config={{hideOverlay: true}} 
        >
          <Overlay 
            title={title} 
            poster={poster} 
            playButton={playButton} 
            onPlayClick={this._play} 
          />
        </ReactPlayable>
      </div>
    );
  }
}
