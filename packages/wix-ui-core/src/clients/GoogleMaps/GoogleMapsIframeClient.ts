import {IframesManager} from './IframesManager/IframesManager';
import {autocompleteHandlerName, geocodeHandlerName, placeDetailsHandlerName} from './handlersName';
import {generateID} from './utils';
import {suggestionElement} from "../../components/GoogleAddressInput/GoogleAddressInput";

export class GoogleMapsIframeClient {
    _iframesManager = new IframesManager();
    _promisesMap = new Map();

    constructor() {
        window.addEventListener('message', this.handleMessage, false);
    }

    private handleMessage = event => {
        const {data} = event;
        if (data.requestId && this._promisesMap.has(data.requestId)) {
            const promise = this._promisesMap.get(data.requestId);
            data.status === 'OK' ? promise.resolve(data.results) : promise.reject();
        }
    };

    private generatePromiseObject() {
        const resolveRejectObject = {};
        const promise: Promise<suggestionElement[]> = new Promise((resolve, reject) => Object.assign(resolveRejectObject, {resolve, reject}));
        return Object.assign({}, {requestPromise: promise}, resolveRejectObject);
    }

    autocomplete(apiKey, lang, request): Promise<suggestionElement[]> {
        let requestIframe;
        if (this._iframesManager.hasIframe(apiKey, lang)) {
            requestIframe = this._iframesManager.getIframe(apiKey, lang);
        } else {
            requestIframe = this._iframesManager.addIframe(apiKey, lang);
        }

        const requestId = generateID();

        const promiseObject = this.generatePromiseObject();

        this._promisesMap.set(requestId, promiseObject);

        requestIframe.postMessage({request, requestId, method: autocompleteHandlerName}, '*');

        return promiseObject.requestPromise;
    }

    geocode(apiKey, lang, request): Promise<suggestionElement[]> {
        let requestIframe;
        if (this._iframesManager.hasIframe(apiKey, lang)) {
            requestIframe = this._iframesManager.getIframe(apiKey, lang);
        } else {
            requestIframe = this._iframesManager.addIframe(apiKey, lang);
        }

        const requestId = generateID();
        const promiseObject = this.generatePromiseObject();
        this._promisesMap.set(requestId, promiseObject);
        requestIframe.postMessage({request, requestId, method: geocodeHandlerName}, '*');

        return promiseObject.requestPromise;
    }

    placeDetails(apiKey, lang, request): Promise<suggestionElement[]> {
        let requestIframe;
        if (this._iframesManager.hasIframe(apiKey, lang)) {
            requestIframe = this._iframesManager.getIframe(apiKey, lang);
        } else {
            requestIframe = this._iframesManager.addIframe(apiKey, lang);
        }

        const requestId = generateID();
        const promiseObject = this.generatePromiseObject();

        this._promisesMap.set(requestId, promiseObject);

        requestIframe.postMessage({request, requestId, method: placeDetailsHandlerName}, '*');
        return promiseObject.requestPromise;
    }

    cancel(requestPromise) {
        for (let requestObj of Array.from(this._promisesMap.values())) {
            if (requestObj.requestPromise === requestPromise) {
                requestObj.reject({isCancelled: true, error: 'Request cancelled'});
                break;
            }
        }
    }
}
