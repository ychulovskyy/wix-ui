import * as React from 'react';
import {renderToString} from 'react-dom/server';
import * as Components from './components';


function isReactComponent(value: any): value is React.ComponentType<any> {
    return value && value.prototype && value.prototype instanceof React.Component;
}

export function test() {
    const libExportNames = Object.keys(Components);

    libExportNames.forEach(exportName => {
        const ExportValue = (Components as any)[exportName];
        try {
            renderToString(<ExportValue/>)
        }
        catch(e) {
            throw new Error(`Failed to render <${exportName} /> component: ${e}`);
        }
        console.log(`<${exportName} /> renders on Node.js using React's server side rendering`) //eslint-disable-line no-console
    });
}
