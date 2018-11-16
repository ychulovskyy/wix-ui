import * as React from 'react';
import {
  DropTarget as ReactDropTarget,
  ConnectDropTarget,
  DropTargetMonitor,
  DragDropContext,
} from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import {ItemTypes} from './types';

const target = {
  drop(
    props: DropTargetClassProps,
    monitor: DropTargetMonitor,
    component: DropTargetClass | null,
  ) {
    if (!component) {
      return;
    }
    const {id} = monitor.getItem();
    const delta = monitor.getDifferenceFromInitialOffset();

    component.moveBox(id, delta.x, delta.y);
  },
};

export interface DropTargetClassProps {
  onMove: (id: any, deltaLeft: number, deltaTop: number) => void;
}

interface DropTargetClassCollectedProps {
  connectDropTarget: ConnectDropTarget
}

class DropTargetClass extends React.Component<DropTargetClassProps & DropTargetClassCollectedProps> {
  moveBox = (id, deltaLeft, deltaTop) => {
    this.props.onMove(id, deltaLeft, deltaTop);
  };

  render() {
    const {connectDropTarget, children} = this.props;
    return connectDropTarget(
      <div style={{position: 'relative', width: '100%', height: '100%'}}>{children}</div>
    );
  }
}

export const DropTarget = DragDropContext(HTML5Backend)(
  ReactDropTarget<DropTargetClassProps, DropTargetClassCollectedProps>(
    ItemTypes.BOX,
    target,
    (connect: any) => ({
      connectDropTarget: connect.dropTarget(),
    }),
  )(DropTargetClass)
);
