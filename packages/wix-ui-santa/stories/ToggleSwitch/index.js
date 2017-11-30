import React from 'react';
import ToggleSwitch from '../../src/components/ToggleSwitch';

export default class Example extends React.Component {
  constructor(props) {
    super(props);
    this.state = {checked: true};
  }

  render() {
    return (
      <div style={{width: '500px', marginLeft: '20px', display: 'flex', justifyContent: 'space-between', flexDirection: 'column'}}>
        <h3>standard</h3><ToggleSwitch checked={this.state.checked} onChange={() => this.setState({checked: !this.state.checked})}/>
      </div>
    );
  }
}
