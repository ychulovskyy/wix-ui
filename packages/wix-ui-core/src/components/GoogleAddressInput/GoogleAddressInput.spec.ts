import 'react';
import {componentFactory} from './GoogleAddressInput.driver';
import _ from 'lodash/fp';
import {GoogleAddressInputHandler} from './GoogleAddressInput';

let client;
const apiKey = 'a';
const GEOCODE_RESULT = JSON.parse('{"formatted_address":"_formatted_address_","address_components":[{"types":["street_number"],"long_name":123}]}');
GEOCODE_RESULT.geometry = {
    location: {
        lat: () => 31.12,
        lng: () => 33.34
    }
};

const buildResult = originValue => {
    return {
        originValue,
        googleResult: GEOCODE_RESULT,
        address: {
            approximate: true,
            latLng: {
                lat: 31.12,
                lng: 33.34
            },
            number: 123,
            formatted: '_formatted_address_'
        }
    };
};

export class GmapsTestClient {
    autocomplete(apiKey, lang, {request}) {

        if (request.input === 'dontfind') {
            return Promise.resolve([]);
        }

        return Promise.resolve([
            {description: JSON.stringify(request) + ' - 1'},
            {description: JSON.stringify(request) + ' - 2'}
        ]);
    }

    geocode(apiKey, lang, {request}) {
        const {address, placeId} = request;
        if (address || placeId) {
            return Promise.resolve(
                [_.extend({}, GEOCODE_RESULT, {__called__: JSON.stringify(request)})]
            );
        }
        throw new Error('geocode() request params are malformed');
    }

    placeDetails(apiKey, lang, {request}) {
        const {placeId} = request;
        if (placeId) {
            return Promise.resolve(
                [_.extend({}, GEOCODE_RESULT, {__called__: JSON.stringify(request)})]
            );
        }
        throw new Error('placeDetails() request params are malformed');
    }
}

describe.skip('GoogleAddressInput', () => {
    beforeEach(() => client = new GmapsTestClient());
    const {createShallow, createMount} = componentFactory();

    describe('appearance', () => {
        it('should show magnifying glass by default', () => {
            const component = createShallow({Client: client, apiKey});
            expect(component.find('InputWithOptions').props().magnifyingGlass).toEqual(true);
        });

        it('should allow hiding magnifying glass', () => {
            const component = createShallow({Client: client, magnifyingGlass: false, apiKey});
            expect(component.find('InputWithOptions').props().magnifyingGlass).toEqual(false);
        });

        it('should allow setting theme for the nested input', () => {
            const component = createShallow({Client: client, theme: 'material', apiKey});
            expect(component.find('InputWithOptions').props().theme).toEqual('material');
        });

        it('should allow the input to be readOnly', () => {
            const component = createShallow({Client: client, readOnly: true, apiKey});
            expect(component.find('InputWithOptions').props().readOnly).toEqual(true);
        });

        it('should show a footer', () => {
            const component = createShallow({
                Client: client,
                readOnly: true,
                footer: 'fetchGeoData bar',
                footerOptions: {overrideStyle: true, disabled: true},
                apiKey
            });

            expect(component.find('InputWithOptions').props().options).toEqual([{
                id: 0,
                value: 'fetchGeoData bar',
                overrideStyle: true,
                disabled: true
            }]);
        });

        it('should not highlight selected option by default', () => {
            const component = createShallow({Client: client, apiKey});
            expect(component.find('InputWithOptions').props().selectedHighlight).toEqual(false);
        });
    });

    describe('when `props.poweredByGoogle`', () => {
        describe('is `true`', () => {
            it('should show google footer', () => {
                const component = createMount({Client: client, poweredByGoogle: true, apiKey});
                component.setState({suggestions: ['a', 'b', 'c'].map(s => ({description: s}))});
                expect(component.find('[data-hook="google-footer"]').exists()).toEqual(true);
            });

            it('should not show google footer if `state.suggestions.length === 0`', () => {
                const component = createMount({Client: client, poweredByGoogle: true, apiKey});
                component.setState({suggestions: []});
                expect(component.find('[data-hook="google-footer"]').exists()).toEqual(false);
            });
        });

        describe('is falsy', () => {
            it('should not show the powered by google footer', () => {
                const component = createShallow({Client: client, apiKey});
                expect(component.find('[data-hook="google-footer"]').exists()).toEqual(false);
            });
        });
    });

    describe('User Interactions', () => {

        it('should specify autoSelect as default option', () => {
            const component = createMount({Client: client, countryCode: 'XX', apiKey});
            expect(component.find('InputWithOptions').props().autoSelect).toEqual(true);
        });

        it('should allow to override autoSelect option', () => {
            const component = createMount({Client: client, countryCode: 'XX', autoSelect: false, apiKey});
            expect(component.find('InputWithOptions').props().autoSelect).toEqual(false);
        });

        it('should allow focusing input', () => {
            const component = createMount({Client: client, countryCode: 'XX', apiKey});
            const input = component.find('input').get(0);
            input.focus = jest.fn();

            component.instance().focus();
            expect(input.focus).toBeCalled();
        });

        it('should allow selecting input', () => {
            const component = createMount({Client: client, countryCode: 'XX', apiKey});
            const input = component.find('input').get(0);
            input.focus = jest.fn();
            component.instance().select();
            expect(input.select).toBeCalled();
        });

        it('If user changes the value in the autocomplete box, request suggestions from google.maps', done => {

            const component = createShallow({Client: client, countryCode: 'XX', apiKey});
            const event = {target: {value: 'Hatomer 49'}};
            component.find('InputWithOptions').props().onInput(event);

            // Defer to make sure all promises run
            _.defer(() => {
                try {
                    component.update();
                    expect(component.find('InputWithOptions').props().options).toEqual([
                        {id: 0, value: '{"components":"country:XX","input":"Hatomer 49"} - 1'},
                        {id: 1, value: '{"components":"country:XX","input":"Hatomer 49"} - 2'}
                    ]);
                    done();
                } catch (e) {
                    done.fail(e);
                }
            });
        });

        it('If user pressed <enter> with a suggested value, geocode the suggested value, and call the onSet callback  (with geocode handler)', done => {

            const onSet = jest.fn();

            const component = createShallow({Client: client, countryCode: 'XX', onSet, apiKey});
            component.setState({suggestions: [JSON.parse('{"description": "my address", "place_id": 123}')]});
            component.find('InputWithOptions').props().onSelect({id: 0, value: 'my address'});

            // Defer to make sure all promises run
            _.defer(() => {
                try {
                    expect(onSet.mock.calls[0][0]).toEqual(buildResult('my address'));
                    done();
                } catch (e) {
                    done.fail(e);
                }
            });
        });

        it('If user pressed <enter> with a suggested value, geocode the suggested value, and call the onSet callback (with places handler)', done => {

            const onSet = jest.fn();

            const component = createShallow({
                Client: client,
                countryCode: 'XX',
                onSet,
                handler: GoogleAddressInputHandler.places,
                apiKey
            });
            component.setState({suggestions: [JSON.parse('{"description": "my address", "place_id": 123}')]});
            component.find('InputWithOptions').props().onSelect({id: 0, value: 'my address'});

            // Defer to make sure all promises run
            _.defer(() => {
                try {
                    expect(onSet.mock.calls[0][0]).toEqual(buildResult('my address'));
                    done();
                } catch (e) {
                    done.fail(e);
                }
            });
        });

        it('If user pressed <enter> with a value that is not on the suggestions list, try to suggest it and geocode if successful', done => {
            const onSet = jest.fn();

            const component = createShallow({Client: client, countryCode: 'XX', onSet, apiKey});
            component.setState({suggestions: [JSON.parse('{"description": "my address", "place_id": 123}')]});
            component.find('InputWithOptions').props().onManuallyInput('my addr');

            // Defer to make sure all promises run
            _.defer(() => {
                try {
                    expect(onSet).not.toBeCalled();
                    done();
                } catch (e) {
                    done.fail(e);
                }
            });
        });

        it('If user pressed <enter> with a value that is not on the suggestions list, try to suggest it and return null if unsuccessful', done => {
            const onSet = jest.fn();
            const component = createShallow({Client: client, countryCode: 'YY', onSet, apiKey});
            component.setState({suggestions: [JSON.parse('{"description": "my address", "place_id": 123}')]});
            component.find('InputWithOptions').props().onManuallyInput('dontfind');

            // Defer to make sure all promises run
            _.defer(() => {
                try {
                    expect(onSet).not.toBeCalled();
                    done();
                } catch (e) {
                    done.fail(e);
                }
            });
        });

        it('If user pressed <enter> and there is no value on the suggestions list and fallbackToManual is set to true, search for the value anyway', done => {
            const onSet = jest.fn();
            const component = createShallow({Client: client, countryCode: 'YY', onSet, fallbackToManual: true, apiKey});
            component.setState({suggestions: []});
            component.find('InputWithOptions').props().onManuallyInput('dontfind');

            // Defer to make sure all promises run
            _.defer(() => {
                try {
                    expect(onSet.mock.calls[0][0]).toEqual(buildResult('dontfind'));
                    done();
                } catch (e) {
                    done.fail(e);
                }
            });
        });

        it('clear suggestions on blur', done => {
            const component = createShallow({Client: client, countryCode: 'XX', apiKey});
            component.setState({suggestions: [JSON.parse('{"description": "my address", "place_id": 123}')]});
            component.find('InputWithOptions').props().onBlur();
            expect(component.find('InputWithOptions').props().options.length).toEqual(0);
            setTimeout(() => {
                expect(component.find('InputWithOptions').props().options.length).toEqual(0);
                done();
            }, 300);
        });

        it('don\'t clear suggestions if clearSuggestionsOnBlur === false', done => {
            const component = createShallow({Client: client, countryCode: 'XX', clearSuggestionsOnBlur: false, apiKey});
            component.setState({suggestions: [JSON.parse('{"description": "my address", "place_id": 123}')]});
            component.find('InputWithOptions').props().onBlur();
            setTimeout(() => {
                expect(component.find('InputWithOptions').props().options.length).toEqual(1);
                done();
            }, 300);
        });

        it('should render new value once language was changed')
    });

    describe('Client API', () => {
        let mocksClient, autocompleteMock, geocodeMock, cancelMock;
        const defaultLang = 'en';
        beforeEach(() => {
            autocompleteMock = jest.fn();
            geocodeMock = jest.fn();
            cancelMock = jest.fn();
            mocksClient = {autocomplete: autocompleteMock, geocode: geocodeMock, cancel: cancelMock};
        });

        it('should call any client action with apiKey', () => {
            const component = createMount({Client: mocksClient, apiKey});
            component.setProps({value: 'newValue'});
            expect(autocompleteMock.mock.calls[0][0]).toEqual(apiKey);
            component.instance().onSet('newValue2');
            expect(geocodeMock.mock.calls[0][0]).toEqual(apiKey);
        });

        it('should call client action with lang if lang was passed as prop', () => {
            const component = createMount({Client: client, lang: defaultLang, apiKey});
            component.setProps({value: 'newValue'});
            expect(autocompleteMock.calls[0][1]).toEqual(defaultLang);
            component.instance().onSet('newValue');
            expect(geocodeMock.calls[0][1]).toEqual(defaultLang);
        });

        it('should request new results when lang changed', () => {
            const component = createMount({Client: client, lang: 'en', apiKey});
            component.setProps({value: 'newValue'});
            component.setProps({lang: 'fr'});
            expect(autocompleteMock.calls.length).toEqual(1);
            expect(geocodeMock.calls[0][1]).toEqual('en');
            expect(geocodeMock.calls[1][1]).toEqual('fr');
        });

        it('should cancel previous request before a new request is sent', () => {
            const component = createMount({Client: client, lang: 'en', apiKey});
            component.setProps({value: 'newValue'});
            component.setProps({value: 'newValue2'});
            expect(autocompleteMock.mock.calls.length).toEqual(2);
            expect(cancelMock).toBeCalled();
        });

        it('should render only the new suggestions', () => {
        });
    })
});
