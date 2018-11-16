import * as React from 'react';
import {ListDropTarget, ListDragSource} from '../../src/components/DragAndDrop';
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
        <ListDropTarget>
          {this.state.items.map((item, index) => (
            <ListDragSource
              key={index}
              id={index}
              onMove={this.onMove}
            >
              <div className={s.item}>{item}</div>
            </ListDragSource>
          ))}
        </ListDropTarget>
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
