import { Address, Geocode, MapsClient, PlaceDetails } from '../../clients/GoogleMaps/types';
export declare function createAddress(description: string, types?: Array<string>): Address;
export declare function createGeocode(placeId: string, formattedAddress: string): Geocode;
export declare function createPlaceDetails(placeId: string, formattedAddress: string): PlaceDetails;
export declare class GoogleMapsClientStub implements MapsClient {
    static addresses: Array<Address>;
    static addressesDelay: number;
    static addressesPromise: Promise<any>;
    static geocode: Array<Geocode>;
    static geocodeDelay: number;
    static geocodePromise: Promise<any>;
    static placeDetails: PlaceDetails;
    static placeDetailsDelay: number;
    static placeDetailsPromise: Promise<any>;
    autocomplete(apiKey: string, lang: string, request: string): Promise<Address[]>;
    geocode(apiKey: string, lang: string, request: string): Promise<Geocode[]>;
    placeDetails(apiKey: string, lang: string, request: string): Promise<PlaceDetails>;
    static setAddresses(addresses: Array<Address>, addressesDelay?: number): void;
    static setAddressesPromise(addresses: Array<Address>): {
        resolve: any;
        reject: any;
    };
    static setGeocode(geocode: Geocode, geocodeDelay?: number): void;
    static setGeocodePromise(geocode: Geocode): {
        resolve: any;
        reject: any;
    };
    static setPlaceDetails(placeDetails: PlaceDetails, placeDetailsDelay?: number): void;
    static setPlaceDetailsPromise(placeDetails: PlaceDetails): {
        resolve: any;
        reject: any;
    };
    static reset(): void;
}
