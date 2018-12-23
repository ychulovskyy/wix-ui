import * as React from 'react';
import { ReactDOMTestContainer } from '../../../test/dom-test-container';
import { imageDriverFactory } from './image.driver';
import { Image } from './image';
import { EMPTY_PIXEL, TEST_SRC, BROKEN_SRC, ERROR_SRC} from './fixtures';
import * as eventually from 'wix-eventually';

describe('Image', () => {
    const testContainer = new ReactDOMTestContainer().unmountAfterEachTest()
    const createDriver = testContainer.createUniRenderer(imageDriverFactory);
    
    it('renders image element to dom', async() => {
        const image = createDriver(<Image />);

        const imageElement = await image.element();
        expect((imageElement).tagName).toBe('IMG');
    });

    it('displays provided src or srcset', async () => {
        const image = createDriver(<Image src={TEST_SRC} srcSet={TEST_SRC}/>);
        
        expect(await image.getSrc()).toEqual(TEST_SRC);
        expect(await image.getSrcSet()).toEqual(TEST_SRC);
    });

    it('displays empty pixel when src is not provided', async() => {
        const image = createDriver(<Image src=''/>);

        expect(await image.getSrc()).toEqual(EMPTY_PIXEL);
    });

    it('displays a provided alt prop', async () => {
        const image = createDriver(<Image alt='blabla'/>);
        
        expect(await image.getAlt()).toEqual('blabla');
    });

    it('when the src is broken, it displays the provided errorImage src', async (done) => {
        const onErrorSpy = jest.fn();
        const image = createDriver(<Image src={BROKEN_SRC} errorImage={ERROR_SRC} onError={onErrorSpy}/>);
        
        expect(onErrorSpy).toHaveBeenCalledTimes(1);


        // return await eventually(() => {
        //     expect( onErrorSpy).toHaveBeenCalledTimes(1);
        // }, {interval: 1});

        // expect(await image.getSrc()).toEqual(ERROR_SRC);
    });

    
});