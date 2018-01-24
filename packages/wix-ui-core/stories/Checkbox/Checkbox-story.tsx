import * as React from 'react';
import Checkbox from '../../src/components/Checkbox/Checkbox';
// import { ToggleSwitch } from '../../src/components/StylableToggleSwitch/backoffice/ToggleSwitch';
import commonStyle from '../../src/components/Checkbox/CheckboxStyle.st.css';

export class CheckboxStory extends React.Component<{}, { checked: boolean }> {
  state = {checked: false};

  render() {
    return (
      <div style={{height: '100px', width: '100px'}}>
        <Checkbox
          {...commonStyle('root') }
          checked={this.state.checked}
          onChange={() => this.setState({checked: !this.state.checked})}
          data-hook="story-Checkbox"
        />
      </div>
    );
  }
}

// export class BOStylableToggleSwitchStory extends React.Component<{}, { checked: boolean }> {
//   state = {checked: false};

//   render() {
//     return (
//       <Checkbox
//         checked={this.state.checked}
//         onChange={() => this.setState({checked: !this.state.checked})}
//         data-hook="story-StylableToggleSwitch"
//         size="small"
//         skin="success"
//       />
//     );
//   }
// }
