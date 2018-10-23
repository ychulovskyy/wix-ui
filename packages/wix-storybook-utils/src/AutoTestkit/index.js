import React from 'react';
import PropTypes from 'prop-types';

class AutoTestkit extends React.Component {
  static displayName = 'AutoTestkit';

  static propTypes = {
    testkitMetadata: PropTypes.shape({
      file: PropTypes.string.isRequired,
      descriptor: PropTypes.arrayOf(
        PropTypes.shape({
          name: PropTypes.string.isRequired,
          args: PropTypes.array.isRequired,
          type: PropTypes.string.isRequired
        })
      )
    }).isRequired
  };

  static defaultProps = {
    testkitMetadata: {
      file: '',
      descriptor: []
    }
  };

  render() {
    return (
      <table>
        <tbody>
          {this.props.testkitMetadata.descriptor.map(method => (
            <tr key={method.name}>
              <td>{method.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

export default AutoTestkit;
