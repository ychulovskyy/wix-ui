import {inputWithOptionsDriverFactory} from '../InputWithOptions/InputWithOptions.driver';

export const autocompleteDriverFactory = (args) => {
  const driver = inputWithOptionsDriverFactory(args);
  return {
    ...driver
  };
};
