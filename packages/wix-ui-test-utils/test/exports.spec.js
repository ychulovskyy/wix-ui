import {
  createDriverFactory, isClassExists, getStoryUrl, scrollToElement,
  waitForVisibilityOf, testkitFactoryCreator, isTestkitExists,
  protractorTestkitFactoryCreator
} from '../src/index';

describe('exports', () => {
  const modules = {
    createDriverFactory,
    isClassExists,
    getStoryUrl,
    scrollToElement,
    waitForVisibilityOf,
    testkitFactoryCreator,
    isTestkitExists,
    protractorTestkitFactoryCreator
  };

  Object.keys(modules).forEach(key =>
    it(`should export ${key}`, () =>
      expect(typeof modules[key]).toBe('function')
    )
  );
});
