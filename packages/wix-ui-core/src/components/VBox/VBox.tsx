import * as React from 'react';
import {createHOC} from '../../createHOC';

interface VBoxProps {
  children: any;
  classes: {
    boxRoot: string
  };
}

class VBox extends React.PureComponent<VBoxProps> {
  render() {
    const {children, classes} = this.props;
    return (
      <div className={classes.boxRoot}>{children}</div>
    );
  }
}

export default createHOC(VBox);
