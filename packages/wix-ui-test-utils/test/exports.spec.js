import {
  createDriverFactory, isClassExists, getStoryUrl, scrollToElement,
  waitForVisibilityOf, testkitFactoryCreator, isTestkitExists,
  enzymeTestkitFactoryCreator, isEnzymeTestkitExists, protractorTestkitFactoryCreator
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
    enzymeTestkitFactoryCreator,
    isEnzymeTestkitExists,
    protractorTestkitFactoryCreator
  };

  Object.keys(modules).forEach(key =>
    it(`should export ${key}`, () =>
      expect(typeof modules[key]).toBe('function')
    )
  );
});
