export declare class IframesManager {
    _iframeMap: Map<any, any>;
    static getKey(apiKey: string, lang: string): string;
    addIframe(apiKey: string, lang: string): any;
    getIframe(apiKey: string, lang: string): any;
    hasIframe(apiKey: string, lang: string): boolean;
}
