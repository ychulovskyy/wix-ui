import * as React from 'react';
import {ToggleSwitch as StylableToggleSwitch} from '../../src/components/StylableToggleSwitch';
import commonStyle from '../../src/components/StylableToggleSwitch/ToggleSwitchStyle.st.css';

export class StylableToggleSwitchStory extends React.Component<{}, {checked: boolean}> {
  state = {checked: false};

  render() {
    return (
      <div>
        <StylableToggleSwitch
          {...commonStyle('root')}
          style={{height: '100px', width: '200px'}}
          checked={this.state.checked}
          onChange={() => this.setState({checked: !this.state.checked})}
          />
          <StylableToggleSwitch
          {...commonStyle('root')}
          disabled={true}
          style={{height: '100px', width: '200px'}}
          checked={this.state.checked}
          onChange={() => this.setState({checked: !this.state.checked})}
          />
        </div>
    );
  }
}
