import * as React from 'react';
import {GoogleMapsIframeClient} from '../../src/clients/GoogleMaps';
import GoogleAddressInput from '../../src/components/GoogleAddressInput/GoogleAddressInput';

export class GoogleAddressInputStory extends React.Component<{}, {lang: string}> {
    state = {lang: 'en'};
    client = new GoogleMapsIframeClient();
    apiKey = 'AIzaSyD62EDVK-7ssPsChsfBiSjEnix4oZHjSsU';

    constructor() {
        super();
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        console.log(event.target.value);
        this.setState({lang: event.target.value})
    }

    render() {
        return (
            <div>
                <select onChange={this.handleChange}>
                    <option value="en">English</option>
                    <option value="fr">French</option>
                </select>
            <GoogleAddressInput apiKey={this.apiKey} Client={this.client} lang={this.state.lang}></GoogleAddressInput>
            </div>
        )
    }
}
