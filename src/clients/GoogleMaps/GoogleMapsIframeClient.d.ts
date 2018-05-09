import { IframesManager } from './IframesManager/IframesManager';
import { MapsClient } from './types';
export declare class GoogleMapsIframeClient implements MapsClient {
    _iframesManager: IframesManager;
    _promisesMap: Map<any, any>;
    constructor();
    handleMessage: (event: MessageEvent) => void;
    autocomplete(apiKey: string, lang: string, request: string): Promise<any>;
    geocode(apiKey: string, lang: string, request: string): Promise<any>;
    placeDetails(apiKey: string, lang: string, request: string): Promise<any>;
}
