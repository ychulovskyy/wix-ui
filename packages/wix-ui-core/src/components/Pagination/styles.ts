import {core, PaginationTheme} from './theme';
import * as defaultsDeep from 'lodash/defaultsDeep';

export const styles: (theme: PaginationTheme) => PaginationTheme = (theme) => {
  return defaultsDeep({}, theme, core);
};
