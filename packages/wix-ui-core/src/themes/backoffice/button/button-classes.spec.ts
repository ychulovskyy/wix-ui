import {button, SizeType, SkinType} from './button-classes';

describe('button-styles', () => {

  /*
   * Parses classes string, and constructs a class name array.
   * Class names are stripped from their namespace prefix.
   */
  function parseClasses(classes: string) {
    return classes.split(' ').map(c => c.split('--')[1]);
  } 

  function testProp<T extends string>(propName: string, values: T[], defaultValue?: T) {
    values.forEach((value)=>{
      const classes = button({[propName]: value});
      if (value === defaultValue) {
        expect(parseClasses(classes)).not.toContain(value);;
      } else {
        expect(parseClasses(classes)).toContain(value);
      }
    });
  }

  it('button', () => {
    const classes = button();
    expect(parseClasses(classes)).toContain('button');
  });
  
  it('size', () => {
    testProp<SizeType>('size', ['tiny', 'small', 'medium', 'large'], 'medium');
  });

  it('skin', () => {
    testProp<SkinType>('skin', ['destructive', 'premium', 'transparent']);
  });
  
  it('light', ()=> {
    const classes = button({light: true});
    expect(parseClasses(classes)).toContain('light');
  });

  it('dark', ()=> {
    const classes = button({dark: true});
    expect(parseClasses(classes)).toContain('dark');
  });

  it('secondary', ()=> {
    const classes = button({secondary: true});
    expect(parseClasses(classes)).toContain('secondary');
  });
})

