import * as React from 'react';
import {
  DragSource as ReactDragSource,
  ConnectDragSource,
} from 'react-dnd';
import {ItemTypes} from './types';

const source = {
  beginDrag({id}: DragSourceClassProps) {
    return {id};
  },
};

export interface DragSourceClassProps {
  id: any;
  left: number;
  top: number;
}

interface DragSourceClassCollectedProps {
  connectDragSource: ConnectDragSource;
  isDragging?: boolean;
}

class DragSourceClass extends React.Component<DragSourceClassProps & DragSourceClassCollectedProps> {
  render() {
    const {connectDragSource, isDragging, children, left, top} = this.props;
    if (isDragging) {
      return null;
    }

    return connectDragSource(<div style={{position: 'absolute', left, top, cursor: 'move'}}>{children}</div>);
  }
}

export const DragSource = ReactDragSource<DragSourceClassProps, DragSourceClassCollectedProps>(
  ItemTypes.BOX,
  source,
  (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
  }),
)(DragSourceClass);
