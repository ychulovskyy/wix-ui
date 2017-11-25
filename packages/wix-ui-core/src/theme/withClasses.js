import React from 'react';
import {object} from 'prop-types';
import uniqueId from 'lodash/uniqueId';
import {generateClasses, detachStyleSheetFromDom} from './DOMStyleRenderer';

export function withClasses(CoreComponent, styles) {
  class ThemedComponent extends React.PureComponent {
    static propTypes = {theme: object};

    constructor(props) {
      super(props);
      this.id = uniqueId();
      this.state = {classes: generateClasses(styles(props.theme), this.id)};
    }

    componentWillReceiveProps(nextProps) {
      if (this.props.theme !== nextProps.theme) {
        this.setState({classes: generateClasses(styles(nextProps.theme), this.id)});
      }
    }

    componentWillUnmount() {
      detachStyleSheetFromDom(this.id);
    }

    render() {
      return (
        <CoreComponent {...this.props} classes={this.state.classes}/>
      );
    }
  }

  return ThemedComponent;
}
