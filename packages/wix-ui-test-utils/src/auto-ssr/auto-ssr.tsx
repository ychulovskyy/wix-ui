import * as React from 'react';
import {renderToString} from 'react-dom/server';
import MetaDataTools from '../meta-data-tools';

// function isReactComponent(value: any): value is React.ComponentType<any> {
//     return value && value.prototype && value.prototype instanceof React.Component;
// }

export function autoSSR() {
    MetaDataTools.metaData.forEach((value, Key) => {
        try {
            renderToString(<Key />);
        } catch (e) {
            throw new Error(`Failed to render <${Key} /> component: ${e}`);
        }
    });
}
