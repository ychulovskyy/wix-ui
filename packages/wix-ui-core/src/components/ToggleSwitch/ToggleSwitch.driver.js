import ReactTestUtils from 'react-dom/test-utils';
import $ from 'jquery';

const toggleSwitchDriverFactory = ({element}) => {

  const toggleSwitch = $(element).find('input')[0];

  return {
    exists: () => !!element,
    click: () => ReactTestUtils.Simulate.change(toggleSwitch),
    isChecked: () => $(toggleSwitch).is(':checked'),
    isDisabled: () => $(toggleSwitch).is(':disabled')
  };
};

export default toggleSwitchDriverFactory;
