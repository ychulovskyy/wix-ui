import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {LiveProvider, LiveEditor, LiveError, LivePreview} from 'react-live';
import classnames from 'classnames';
import {Collapse} from 'react-collapse';
import styles from './index.scss';

import ToggleSwitch from 'wix-style-react/ToggleSwitch';
import EmptyTrash from 'wix-ui-icons-common/EmptyTrash';
import Code from 'wix-ui-icons-common/Code';
import TextButton from '../TextButton';

const LiveCodeExamplesRow = props => (
  <div className={styles.examplesContainer} {...props}/>
);

export default class LiveCodeExample extends Component {

  static propTypes = {
    initialCode: PropTypes.string,
    title: PropTypes.string,
    scope: PropTypes.object,
    compact: PropTypes.bool
  };

  static defaultProps = {
    compact: false
  };

  static Row = LiveCodeExamplesRow;

  resetCode = () => {
    this.setState({
      code: this.props.initialCode
    });
  };

  onCodeChange = code => this.setState({code});

  onToggleRtl = isRtl => this.setState({isRtl});
  onToggleBackground = isDarkBackground => this.setState({isDarkBackground});

  onToggleCode = () => this.setState(state => ({
    isEditorOpened: !state.isEditorOpened
  }));

  constructor(props) {
    super(props);

    this.state = {
      code: props.initialCode,
      isRtl: false,
      isDarkBackground: false,
      isEditorOpened: !props.compact
    };
  }

  render() {
    const {compact} = this.props;
    const {code, isRtl, isDarkBackground, isEditorOpened} = this.state;

    return (
      <div
        className={classnames(styles.wrapper, {
          [styles.compact]: compact
        })}
      >

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

          {isEditorOpened && (
            <TextButton onClick={this.resetCode} prefixIcon={<EmptyTrash/>}>Reset</TextButton>
          )}

          {compact && (
            <TextButton onClick={this.onToggleCode} prefixIcon={<Code/>}>
              {this.state.isEditorOpened ? 'Hide' : 'Show'} code
            </TextButton>
          )}
        </div>

        <LiveProvider code={code.trim()} scope={this.props.scope} mountStylesheet={false}>
          <div className={styles.liveExampleWrapper}>

            <Collapse isOpened={isEditorOpened} className={styles.editor}>
              <LiveEditor className={styles.editorView} onChange={this.onCodeChange}/>
            </Collapse>

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
