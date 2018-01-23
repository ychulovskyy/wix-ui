import * as React from 'react';
import {shallow, mount} from 'enzyme';
import GoogleAddressInput, {GoogleAddressInputProps} from './GoogleAddressInput';

const componentFactory = () => {
    const createShallow = (props: GoogleAddressInputProps) => {
        return shallow(
            <GoogleAddressInput {...props}/>
        );
    };

    const createMount = (props: GoogleAddressInputProps) => {
        return mount(
            <GoogleAddressInput {...props}/>
        );
    };

    return {createShallow, createMount};
};

export {componentFactory};
