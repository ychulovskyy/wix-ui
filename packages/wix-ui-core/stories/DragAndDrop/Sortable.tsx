import * as React from 'react';
import {ListDropTarget, ListDragSource, DragDropContextProvider} from '../../src/components/DragAndDrop';
import * as s from './Sortable.scss';

export class Sortable extends React.Component {
  state = {
    items: [
      'Item #1',
      'Item #2',
      'Item #3',
      'Item #4',
      'Item #5',
      'Item #6',
    ]
  };

  render() {
    return (
      <div className={s.root}>
        <DragDropContextProvider>
          {this.state.items.map((item, index) => (
            <ListDropTarget
              key={index}
              id={index}
              onMove={this.onMove}
            >
              <ListDragSource
                key={index}
                id={index}
              >
                <div className={s.item}>{item}</div>
              </ListDragSource>
            </ListDropTarget>
          ))}
        </DragDropContextProvider>
      </div>
    );
  }

  onMove = (addedIndex, removedIndex) => {
    const nextItems = [...this.state.items];
    nextItems.splice(addedIndex, 0, ...nextItems.splice(removedIndex, 1));
    this.setState({
      items: nextItems
    });
  };
}
