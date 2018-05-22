import * as React from 'react';
import MetaDataTools, {MetaData} from '../src/meta-data-tools';
// import { MetaData } from '../src/meta-data-tools/types';

class TestComp extends React.Component {
  testMember: string = 'cool';

  render () {
    return <h1>Hey {this.testMember} person</h1>;
  }
}

let metaDataTools: MetaDataTools;

describe('MetaData Tools', () => {
  beforeEach(() => {
    metaDataTools = new MetaDataTools();
  })

  describe('The Describe method', () => {
    it('adds a new component\'s metadata to the registry, and returns its meta data', () => {
      const myCompMetaData = metaDataTools.describe(TestComp);
      expect(myCompMetaData).toBeInstanceOf(MetaData);
    });
  })
});
