import * as React from 'react';
import { findDOMNode } from 'react-dom';
import {
  DropTarget as ReactDropTarget,
  DragSource as ReactDragSource,
  ConnectDropTarget,
  DropTargetMonitor,
  ConnectDragSource,
} from 'react-dnd';
import {ItemTypes} from './types';

const source = {
  beginDrag({id}: ListDragSourceClassProps) {
    return {id};
  },
};

export interface ListDragSourceClassProps {
  id: any;
  onMove: (dragIndex: number, hoverIndex: number) => void;
}

interface ListDragSourceClassCollectedProps {
  connectDragSource: ConnectDragSource;
  isDragging?: boolean;
}

const target = {
  hover(props: ListDragSourceClassProps, monitor: DropTargetMonitor, component: ListDragSourceClass | null) {
    console.info('!!!', {props, item: monitor.getItem(), component});
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
    const hoverBoundingRect = findDOMNode(component).getBoundingClientRect();

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

interface ListDropTargetClassCollectedProps {
  connectDropTarget: ConnectDropTarget;
}

class ListDragSourceClass extends React.Component<ListDragSourceClassProps & ListDragSourceClassCollectedProps & ListDropTargetClassCollectedProps> {
  onMove = (dragIndex, hoverIndex) => {
    this.props.onMove(dragIndex, hoverIndex);
  };

  render() {
    const {connectDragSource, connectDropTarget, isDragging, children} = this.props;
    const opacity = isDragging ? 0.2 : 1;

    return connectDragSource(connectDropTarget(<div style={{cursor: 'move', opacity}}>{children}</div>));
  }
}

export const ListDragSource = ReactDropTarget<ListDragSourceClassProps, ListDropTargetClassCollectedProps>(
  ItemTypes.LIST,
  target,
  (connect) => ({
    connectDropTarget: connect.dropTarget(),
  }),
)(
  ReactDragSource<ListDragSourceClassProps, ListDragSourceClassCollectedProps>(
    ItemTypes.LIST,
    source,
    (connect, monitor) => ({
      connectDragSource: connect.dragSource(),
      isDragging: monitor.isDragging(),
    }),
  )(ListDragSourceClass),
);
