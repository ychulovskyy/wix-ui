import * as React from 'react';
import {
  DragDropContext,
} from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

class ListDropTargetClass extends React.Component {
  render() {
    const {children} = this.props;
    return children;
  }
}

export const ListDropTarget = DragDropContext(HTML5Backend)(ListDropTargetClass);
