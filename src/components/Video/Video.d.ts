/// <reference types="react" />
import * as React from 'react';
import { Requireable } from 'prop-types';
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
export declare class Video extends React.PureComponent<VideoProps, VideoState> {
    containerRef: HTMLDivElement;
    player: any;
    static propTypes: {
        id: Requireable<any>;
        src: Requireable<any>;
        width: Requireable<any>;
        height: Requireable<any>;
        title: Requireable<any>;
        playButton: Requireable<any>;
        fillAllSpace: Requireable<any>;
        loop: Requireable<any>;
        volume: Requireable<any>;
        poster: Requireable<any>;
        playing: Requireable<any>;
        muted: Requireable<any>;
        onPlay: Requireable<any>;
        onPause: Requireable<any>;
        onEnd: Requireable<any>;
        playableRef: Requireable<any>;
    };
    static defaultProps: {
        onPlay: () => any;
        onPause: () => any;
        onEnd: () => any;
        playableRef: () => any;
    };
    constructor(props: any);
    componentDidMount(): void;
    componentWillReceiveProps(nextProps: any): void;
    componentWillUnmount(): void;
    _isPlaying(): boolean;
    _play: () => void;
    render(): JSX.Element;
}
