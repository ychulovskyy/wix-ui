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

        if (isReactComponent(ExportValue)) {
            console.log(`<${exportName} /> renders on Node.js using React's server side rendering`)
            try {
                // renderToString(<div>{document.getElementsByTagName('input') ? 'bla' : 'bloo'}</div>)
                renderToString(<ExportValue/>)
            }
            catch(e) {
                throw new Error('Fail');
            }
        }
    });
}
// });