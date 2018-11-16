import * as React from 'react';
import { findDOMNode } from 'react-dom';
import {
  DropTarget as ReactDropTarget,
  ConnectDropTarget,
  DropTargetMonitor,
} from 'react-dnd';
import {ItemTypes} from './types';

const target = {
  hover(props: ListDropTargetClassProps, monitor: DropTargetMonitor, component: ListDropTargetClass | null) {
    if (!component) {
      return null;
    }
    const dragIndex = monitor.getItem().index;
    const hoverIndex = props.id;

    // Don't replace items with themselves
    if (dragIndex === hoverIndex) {
      return;
    }

    // Determine rectangle on screen
    const hoverBoundingRect = (findDOMNode(component) as any).getBoundingClientRect();

    // Get vertical middle
    const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

    // Determine mouse position
    const clientOffset = monitor.getClientOffset();

    // Get pixels to the top
    const hoverClientY = clientOffset.y - hoverBoundingRect.top;

    // Only perform the move when the mouse has crossed half of the items height
    // When dragging downwards, only move when the cursor is below 50%
    // When dragging upwards, only move when the cursor is above 50%

    // Dragging downwards
    if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
      return
    }

    // Dragging upwards
    if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
      return
    }

    // Time to actually perform the action
    props.onMove(dragIndex, hoverIndex);

    // Note: we're mutating the monitor item here!
    // Generally it's better to avoid mutations,
    // but it's good here for the sake of performance
    // to avoid expensive index searches.
    monitor.getItem().index = hoverIndex;
  },
};

export interface ListDropTargetClassProps {
  onMove: (dragIndex: number, hoverIndex: number) => void;
  id: number;
}

interface ListDropTargetClassCollectedProps {
  connectDropTarget: ConnectDropTarget
}

class ListDropTargetClass extends React.Component<ListDropTargetClassProps & ListDropTargetClassCollectedProps> {
  onMove = (dragIndex, hoverIndex) => {
    this.props.onMove(dragIndex, hoverIndex);
  };

  render() {
    const {connectDropTarget, children} = this.props;
    return connectDropTarget(<div>{children}</div>);
  }
}

export const ListDropTarget = ReactDropTarget<ListDropTargetClassProps, ListDropTargetClassCollectedProps>(
  ItemTypes.BOX,
  target,
  (connect: any) => ({
    connectDropTarget: connect.dropTarget(),
  }),
)(ListDropTargetClass);
