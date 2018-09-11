import React from 'react';
import {string, node, bool} from 'prop-types';
import style from './CodeShowcase.st.css';
import Markdown from '../Markdown';

const toCodeBlock = (code, type = 'html') =>
  ['```' + type, code.trim(), '```'].join('\n');

export default class CodeShowcase extends React.Component {
  static propTypes = {
    title: string,
    children: node,
    code: string,
    inverted: bool
  };
  static defaultProps = {
    title: 'Example'
  };

  render() {
    const {title, children, code} = this.props;
    return (
      <div className={style.root}>
        <h3 className={style.title}>{title}</h3>
        <div className={style.content}>
          <div className={style.show}>{children}</div>
          <Markdown className={style.markdown} source={toCodeBlock(code)}/>
        </div>
      </div>
    );
  }
}
