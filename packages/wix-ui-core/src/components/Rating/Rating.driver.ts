// import styles from './Rating.st.css';
// import {StylableDOMUtil} from 'stylable/test-utils';

// const utils = new StylableDOMUtil(styles);
// const hasStyleState = (element, state) => utils.hasStyleState(element, state);

export const ratingDriverFactory = ({element}) => {
  console.log('element ', element);

  return {
    exists: () => !!element
  };
};
