import {core, VBoxTheme} from './theme';
import * as defaultsDeep from 'lodash/defaultsDeep';

export const styles = (theme: VBoxTheme) => {
  theme = (defaultsDeep(theme, core) as VBoxTheme);

  const alignmentMap = {
    left: 'flex-start',
    center: 'center',
    right: 'flex-end'
  };

  return {
    boxRoot: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: alignmentMap[theme.horizontalAlignment],
      width: theme.width,
      height: theme.height,
      '& *:not(:last-child)': {
        marginBottom: theme.spacing
      }
    }
  };
};
