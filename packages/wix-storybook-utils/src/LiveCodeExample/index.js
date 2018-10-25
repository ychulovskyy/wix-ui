import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {LiveProvider, LiveEditor, LiveError, LivePreview} from 'react-live';
import styles from './index.scss';

import EmptyTrash from 'wix-ui-icons-common/EmptyTrash';
import TextButton from '../TextButton';

export default class LiveCodeExample extends Component {

  static propTypes = {
    initialCode: PropTypes.string,
    title: PropTypes.string,
    scope: PropTypes.object
  };

  resetCode = () => {
    // We'll need to update the state twice in order to cause react-live to
    // update the code
    this.setState({
      code: ''
    }, () => {
      this.setState({
        code: this.props.initialCode
      });
    });
  };

  constructor(props) {
    super(props);

    this.state = {
      code: props.initialCode
    };
  }

  render() {
    return (
      <div className={styles.wrapper}>

        <div className={styles.header}>
          <h2>{this.props.title}</h2>

          <div className={styles.spacer}/>
          <TextButton onClick={this.resetCode} prefixIcon={<EmptyTrash/>}>Reset</TextButton>
        </div>

        <LiveProvider code={this.state.code.trim()} scope={this.props.scope} mountStylesheet={false}>
          <div className={styles.liveExampleWrapper}>

            <div className={styles.editor}>
              <LiveEditor className={styles.editorView} onChange={this.onCodeChange}/>
            </div>

            <div className={styles.preview}>
              <LivePreview/>
              <LiveError className={styles.error}/>
            </div>
          </div>
        </LiveProvider>
      </div>
    );
  }

}
