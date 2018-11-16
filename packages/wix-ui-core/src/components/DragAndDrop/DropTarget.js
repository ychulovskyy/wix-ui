import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DropTarget, DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import {ItemTypes} from './../types';

const boxTarget = {
  drop(props, monitor, component) {
    const {index} = monitor.getItem();
    const delta = monitor.getDifferenceFromInitialOffset();

    component.moveBox(index, delta.x, delta.y);
  }
};

@DragDropContext(HTML5Backend)
@DropTarget(ItemTypes.BOX, boxTarget, connect => ({
  connectDropTarget: connect.dropTarget()
}))
export default class DropTarget extends Component {
  static propTypes = {
    connectDropTarget: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
    onMove: PropTypes.func.isRequired
  };

  moveBox = (index, deltaLeft, deltaTop) => {
    this.props.onMove(index, deltaLeft, deltaTop);
  };

  render() {
    const {connectDropTarget, children} = this.props;
    return connectDropTarget(
      <div style={{position: 'relative', width: '100%', height: '100%'}}>{children}</div>
    );
  }
}
