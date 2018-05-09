/// <reference types="react" />
import * as React from 'react';
import { Requireable } from 'prop-types';
import { Option } from '../../baseComponents/DropdownOption';
import { AddressOutput, MapsClient, MapsClientConstructor, Handler } from '../../clients/GoogleMaps/types';
export { Handler };
export interface AddressInputProps {
    /** Maps client, should implement autocomplete, geocode and placeDetails methods */
    Client: MapsClientConstructor;
    /** Handler for when an option is selected */
    onSelect: (raw: AddressOutput) => void;
    /** Maps API key */
    apiKey: string;
    /** Maps language */
    lang: string;
    /** Address handler - geocode or places */
    handler?: Handler;
    /** Limit addresses to certain country */
    countryCode?: string;
    /** Placeholder to display */
    placeholder?: string;
    /** Sets the input to readOnly */
    readOnly?: boolean;
    /** Standard input onChange callback */
    onChange?: React.ChangeEventHandler<HTMLInputElement>;
    /** Standard input onKeyDown callback */
    onKeyDown?: React.KeyboardEventHandler<HTMLInputElement>;
    /** Standard input onFocus callback */
    onFocus?: () => void;
    /** Standard input onBlur callback */
    onBlur?: () => void;
    /** Remove previously fetched addresses upon blur */
    clearSuggestionsOnBlur?: boolean;
    /** Callback when the user pressed the Enter key or Tab key after he wrote in the Input field - meaning the user selected something not in the list  */
    onManualInput?: (value: string) => void;
    /** Lower level filtering of autocomplete result types (see [here](https://developers.google.com/places/supported_types) for list)  */
    filterTypes?: Array<string>;
    /** Limit the autocomplete to specific types (see [here](https://developers.google.com/places/supported_types#table3) for list) */
    types?: Array<string>;
    /** Inputs value */
    value?: string;
    /** If set to `true`, we will attempt to get a Google location from the input's text if there are no suggestions. This is useful when looking for locations for which google does not give suggestions - for example: Apartment/Apt  */
    fallbackToManual?: boolean;
    /** If set to true, content element will always be visible, used for preview mode */
    forceContentElementVisibility?: boolean;
    /** Options to override default one, used for preview mode */
    forceOptions?: Array<Partial<Option>>;
    /** Options to override default throttle value, 0 used to disable throttle */
    throttleInterval?: number;
    /** Node to be rendered in front of each suggestion */
    locationIcon?: React.ReactNode;
}
export interface AddressInputState {
    options: Array<Option>;
    inputValue: string;
}
/**
 * AddressInput
 */
export declare class AddressInput extends React.PureComponent<AddressInputProps, AddressInputState> {
    static displayName: string;
    static propTypes: {
        Client: (object: any, key: string, componentName: string, ...rest: any[]) => Error;
        onSelect: (object: any, key: string, componentName: string, ...rest: any[]) => Error;
        apiKey: (object: any, key: string, componentName: string, ...rest: any[]) => Error;
        lang: (object: any, key: string, componentName: string, ...rest: any[]) => Error;
        handler: Requireable<any>;
        countryCode: Requireable<any>;
        placeholder: Requireable<any>;
        readOnly: Requireable<any>;
        onChange: Requireable<any>;
        onKeyDown: Requireable<any>;
        onFocus: Requireable<any>;
        onBlur: Requireable<any>;
        clearSuggestionsOnBlur: Requireable<any>;
        onManualInput: Requireable<any>;
        filterTypes: Requireable<any>;
        types: Requireable<any>;
        value: Requireable<any>;
        fallbackToManual: Requireable<any>;
        forceContentElementVisibility: Requireable<any>;
        forceOptions: Requireable<any>;
        throttleInterval: Requireable<any>;
        locationIcon: Requireable<any>;
    };
    static defaultProps: {
        handler: Handler;
        throttleInterval: number;
    };
    client: MapsClient;
    addressRequestId: any;
    geocodeRequestId: any;
    placeDetailsRequestId: any;
    currentAddressRequest: any;
    constructor(props: any);
    componentDidMount(): void;
    _getAddressOptions(input: string): Promise<void>;
    _getGeocode(placeId: string | number, description: string, rawInputValue: string): Promise<void>;
    _getPlaceDetails(placeId: string | number, description: string, rawInputValue: string): Promise<void>;
    _onSelect(option: Option | null): void;
    _handleOnChange(e: React.ChangeEvent<HTMLInputElement>): void;
    _handleOnManualInput(value: string): Promise<void>;
    _handleOnBlur(): void;
    _renderOption(val: any): JSX.Element;
    _createOptionFromAddress(address: any): Option;
    _options(): any;
    render(): JSX.Element;
}
