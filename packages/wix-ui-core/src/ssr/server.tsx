import * as express from 'express';
import * as React from 'react';
import {renderToString} from 'react-dom/server';
import * as Components from './components';

function isReactComponent(value: any): value is React.ComponentType<any> {
  return value && value.prototype && value.prototype instanceof React.Component;
}

export function start(port = 6006) {
  const app = express();

  app.use('/', (req, res) => {
    const libExportNames = Object.keys(Components);
    let response = '';

    libExportNames.forEach(exportName => {
        const ExportValue = (Components as any)[exportName];    
        if (isReactComponent(ExportValue)) {
          response += renderToString(<ExportValue/>);
        }
    });
    res.send(response);
  });

  return new Promise(resolve => 
      app.listen(port, () => {
        console.info(`Fake server is running on port ${port}`);
        resolve();
      }));
}



    