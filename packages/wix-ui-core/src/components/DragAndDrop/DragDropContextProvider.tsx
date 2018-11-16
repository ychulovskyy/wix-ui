import * as React from 'react';
import {DragDropContextProvider as ReactDragDropContextProvider} from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

export const DragDropContextProvider = props => {
  return ReactDragDropContextProvider({backend: HTML5Backend, ...props});
};
