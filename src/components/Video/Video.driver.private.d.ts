import { ReactWrapper } from 'enzyme';
export declare const createDriver: (Component: any) => {
    hasCover: () => boolean;
    getRootDOMNode: () => HTMLElement;
    getSrc: () => any;
    getTitle: () => string;
    getWidth: () => any;
    getHeight: () => any;
    isAutoPlaying: () => any;
    isMuted: () => any;
    setProp: (prop: any, value: any) => ReactWrapper<{
        playableRef: (r: any) => any;
    }, any>;
};
