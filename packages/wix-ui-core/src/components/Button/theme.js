import {pallete} from '../../pallete';

export const core = {
  fontFamily: `"HelveticaNeueW01-45Ligh", "HelveticaNeueW02-45Ligh", "HelveticaNeueW10-45Ligh", "Helvetica Neue", "Helvetica", "Arial", "メイリオ, meiryo", "ヒラギノ角ゴ pro w3", "hiragino kaku gothic pro", "sans-serif"`,
  fontSize: '16px',
  lineHeight: '24px',
  fontStyle: 'normal',
  fontWeight: 'normal',
  textDecoration: 'none',

  height: '36px',
  padding: '0 23px',

  color: pallete.black,
  backgroundColor: pallete.grey,
  borderColor: pallete.black,
  borderRadius: '0',

  hover: {
    color: pallete.black,
    backgroundColor: pallete.grey,
    borderColor: pallete.black
  },

  disabled: {
    color: pallete.black,
    backgroundColor: pallete.grey,
    borderColor: pallete.black
  }
};
