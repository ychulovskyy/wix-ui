import {vBoxDriverFactory} from '../../components/VBox/VBox.driver';
import {hBoxDriverFactory} from '../../components/HBox/HBox.driver';
import {ALIGNMENT} from './constants';

export const grouperDriverFactory = ({element}) => {
  const alignment = window.getComputedStyle(element).flexDirection === 'column' ?
  ALIGNMENT.vertical : ALIGNMENT.horizontal;

  const boxDriver = alignment === ALIGNMENT.vertical ?
    vBoxDriverFactory({element}) :
    hBoxDriverFactory({element});

  return {
    /** checks if element exists */
    exists: () => !!element,
    /** returns elements innerHtml */
    getContent: () => boxDriver.getChildren(),
    /** returns the alignment of the container */
    getAlignment: () => alignment
  };
};
