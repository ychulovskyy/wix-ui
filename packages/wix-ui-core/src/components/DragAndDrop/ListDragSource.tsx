import * as React from 'react';
import {
  DragSource as ReactDragSource,
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
}

interface ListDragSourceClassCollectedProps {
  connectDragSource: ConnectDragSource;
  isDragging?: boolean;
}

class ListDragSourceClass extends React.Component<ListDragSourceClassProps & ListDragSourceClassCollectedProps> {
  render() {
    const {connectDragSource, isDragging, children} = this.props;
    const opacity = isDragging ? 0.2 : 1;

    return connectDragSource(<div style={{cursor: 'move', opacity}}>{children}</div>);
  }
}

export const ListDragSource = ReactDragSource<ListDragSourceClassProps, ListDragSourceClassCollectedProps>(
  ItemTypes.BOX,
  source,
  (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
  }),
)(ListDragSourceClass);
