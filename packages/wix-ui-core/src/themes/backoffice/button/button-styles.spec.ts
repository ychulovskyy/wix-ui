import button, {SizeType} from './button-styles';

describe('button-styles', () => {

  /*
  * Gets the 2nd class name and strips aways the namespace
  * That is, assumming the 1st class name is the 'button'
  */
  const getClassName = (classes) => classes.split(' ')[1].split('--')[1];

  it('button', () => {
    const classes = button();
    expect(classes.split('--')[1]).toBe('button');
  });
  
  it('size', () => {
    ['tiny', 'small', 'large'].forEach((size)=>{
      const classes = button({size: size as SizeType});
      expect(getClassName(classes)).toBe(size);
    });
  });
  
  it('light', ()=> {
    const classes = button({light: true});
    expect(getClassName(classes)).toBe('light');
  });
})

