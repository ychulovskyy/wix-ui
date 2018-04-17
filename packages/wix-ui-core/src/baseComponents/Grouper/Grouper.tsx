import * as React from 'react';
import {oneOf, node, Requireable} from 'prop-types';
import {VBox} from '../../components/VBox';
import {HBox} from '../../components/HBox';
import {Alignment, ALIGNMENT} from './constants';
import style from './Grouper.st.css';

export interface GrouperProps {
  /** The items to group together */
  children?: React.ReactNode[];
  /** The layout of the items */
  alignment?: Alignment;
}

export interface GrouperState {}

export class Grouper extends React.PureComponent<GrouperProps, GrouperState> {
  static displayName = 'Grouper';

  static propTypes = {
    /** The items to group together */
    children: node,
    /** The layout of the items */
    alignment: oneOf(Object.keys(ALIGNMENT))
  };

  static defaultProps = {
    alignment: ALIGNMENT.horizontal
  };

  render() {
    const {children, alignment} = this.props;

    return this.props.alignment === ALIGNMENT.horizontal ?
      <HBox {...style('root', {}, this.props)}>{children}</HBox> :
      <VBox {...style('root', {}, this.props)}>{children}</VBox>;
  }
}
