import {create, SheetsManager} from 'jss';
import preset from 'jss-preset-default';

const jss = create(preset());
const sheetManager = new SheetsManager();
const sheetMapper = {};

const atachStyleSheetToDom = (styles, componentName) => {
  const newSheet = jss.createStyleSheet(styles);

  if (sheetMapper[componentName]) {
    sheetManager.unmanage(sheetMapper[componentName]);
  }

  sheetMapper[componentName] = styles;

  sheetManager.add(styles, newSheet);
  sheetManager.manage(styles);

  return newSheet;
};

export const generateClasses = (styles, componentName) => {
  const {classes} = atachStyleSheetToDom(styles, componentName);
  return classes;
};

export const detachStyleSheetFromDom = componentName => {
  sheetManager.unmanage(sheetMapper[componentName]);
  delete sheetMapper[componentName];
};
