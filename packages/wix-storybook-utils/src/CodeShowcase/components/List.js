import React from 'react';
import styleclass from '../CodeShowcase.st.css';
import {node, bool} from 'prop-types';

const List = ({children, inverted}) => (
  <div {...styleclass('demoItems', {inverted})}>
    {Array.isArray(children) ?
      children.map((child, index) => (
        <div key={index} style={{marginRight: '8px', marginBottom: '12px'}}>
          {child}
        </div>
      )) :
      children}
  </div>
);

List.propTypes = {
  children: node,
  inverted: bool
};

List.defaultProps = {
  inverted: false
};

export default List;
