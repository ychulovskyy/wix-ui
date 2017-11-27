import {isClassExists} from '../src/helpers';

describe('helpers', () => {
  describe('isClassExists function', () => {
    const classes = 'class class2 class3';
    const element = {className: classes};

    describe('existing class', () => {
      classes.split(' ').forEach(className =>
        it(`should return true for className ${className}`, () => {
          expect(isClassExists(element, className)).toBe(true);
        })
      );
    });

    describe('none existing classes', () => {
      [undefined, 'cla', 'class4'].forEach(className =>
        it(`should return false for className ${className}`, () => {
          expect(isClassExists(element, className)).toBe(false);
        })
      );
    });
  });
});
