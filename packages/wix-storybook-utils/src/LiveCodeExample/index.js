import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {LiveProvider, LiveEditor, LiveError, LivePreview} from 'react-live';
import classnames from 'classnames';
import styles from './index.scss';

import ToggleSwitch from 'wix-style-react/ToggleSwitch';
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

  onToggleRtl = isRtl => this.setState({isRtl});
  onToggleBackground = isDarkBackground => this.setState({isDarkBackground});

  constructor(props) {
    super(props);

    this.state = {
      code: props.initialCode,
      isRtl: false,
      isDarkBackground: false
    };
  }

  render() {
    const {code, isRtl, isDarkBackground} = this.state;

    return (
      <div className={styles.wrapper}>

        <div className={styles.header}>
          <h2>{this.props.title}</h2>

          <div className={styles.spacer}/>

          <div className={styles.headerControl}>
            Imitate RTL:&nbsp;

            <ToggleSwitch
              size="small"
              checked={isRtl}
              onChange={e => this.onToggleRtl(e.target.checked)}
            />
          </div>

          <div className={styles.headerControl}>
            Dark Background:&nbsp;

            <ToggleSwitch
              size="small"
              checked={isDarkBackground}
              onChange={e => this.onToggleBackground(e.target.checked)}
            />
          </div>

          <TextButton onClick={this.resetCode} prefixIcon={<EmptyTrash/>}>Reset</TextButton>
        </div>

        <LiveProvider code={code.trim()} scope={this.props.scope} mountStylesheet={false}>
          <div className={styles.liveExampleWrapper}>

            <div className={styles.editor}>
              <LiveEditor className={styles.editorView} onChange={this.onCodeChange}/>
            </div>

            <div
              className={classnames({
                [styles.preview]: true,
                rtl: isRtl,
                [styles.darkPreview]: isDarkBackground
              })}
              dir={isRtl ? 'rtl' : ''}
            >
              <LivePreview/>
              <LiveError className={styles.error}/>
            </div>
          </div>
        </LiveProvider>
      </div>
    );
  }

}
