import { Address, Geocode, PlaceDetails } from '../../clients/GoogleMaps/types';
export declare const API_KEY = "api-key";
export declare const ADDRESS_DESC_1 = "1 East Broadway, New York, NY, USA";
export declare const ADDRESS_DESC_2 = "114 N 6th St, Brooklyn, NY 11249, USA";
export declare const ADDRESS_1: Address;
export declare const ADDRESS_2: Address;
export declare const GEOCODE_1: Geocode;
export declare const GEOCODE_2: Geocode;
export declare const PLACE_DETAILS_1: PlaceDetails;
export declare const PLACE_DETAILS_2: PlaceDetails;
export declare const INTERNAL_ADDRESS_GEOCODE_1: {
    formatted: string;
    latLng: {
        lat: number;
        lng: number;
    };
    approximate: boolean;
};
export declare const INTERNAL_ADDRESS_GEOCODE_2: {
    formatted: string;
    latLng: {
        lat: number;
        lng: number;
    };
    approximate: boolean;
};
export declare const INTERNAL_ADDRESS_PLACE_DETAILS_1: {
    formatted: string;
    latLng: {
        lat: number;
        lng: number;
    };
    approximate: boolean;
};
export declare const INTERNAL_ADDRESS_PLACE_DETAILS_2: {
    formatted: string;
    latLng: {
        lat: number;
        lng: number;
    };
    approximate: boolean;
};
export declare const waitForSingleOption: (option: any, driver: any) => any;
export declare const getOptionsText: (driver: any) => any[];
