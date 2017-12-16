import * as React from 'react';
import {mount} from 'enzyme';
import {withClasses} from '../src';
import {DomTestDriver} from './domTest.driver';
import {sheetMapper} from '../src/domStyleRenderer';

type Classes = {classes: {someClass: string}};

const styles = (theme: any = {}) => ({
  someClass: {
    color: theme.color || 'green'
  }
});

const Component: React.SFC<Classes> = ({classes, children}) => <div className={classes.someClass}>{children}</div>;

const StyledComponent = withClasses(Component, styles);

describe('withClasses', () => {
  let wrapper;

  afterEach(() => {
    wrapper.detach();
  });

  it('should pass classes prop to the rendered component', () => {
    wrapper = mount(<StyledComponent/>, {attachTo: document.createElement('div')});
    expect(wrapper.html()).toBe('<div class="someClass"></div>');
  });

  it('should preserve the component original props', () => {
    wrapper = mount(<StyledComponent>Hello</StyledComponent>, {attachTo: document.createElement('div')});
    expect(wrapper.html()).toContain('Hello');
  });

  it('should set an id for the componet', () => {
    wrapper = mount(<StyledComponent/>, {attachTo: document.createElement('div')});
    expect(wrapper.node.id).not.toBe(undefined);
  });

  it('should inject style tag to the DOM', () => {
    wrapper = mount(<StyledComponent/>, {attachTo: document.createElement('div')});
    const domTestDriver = new DomTestDriver({componentId: wrapper.node.id});
    expect(domTestDriver.getCssValue({className: 'someClass', property: 'color'})).toBe('green');
  });

  it('should calculate the style with respect to the theme prop', () => {
    wrapper = mount(<StyledComponent theme={{color: 'blue'}}/>, {attachTo: document.createElement('div')});
    const domTestDriver = new DomTestDriver({componentId: wrapper.node.id});
    expect(domTestDriver.getCssValue({className: 'someClass', property: 'color'})).toBe('blue');
  });

  it('should update the style tag when the theme changes', () => {
    wrapper = mount(<StyledComponent theme={{color: 'blue'}}/>, {attachTo: document.createElement('div')});
    const domTestDriver = new DomTestDriver({componentId: wrapper.node.id});
    const {styleElement} = sheetMapper[wrapper.node.id];

    wrapper.setProps({theme: {color: 'yellow'}});
    expect(styleElement).not.toBe(sheetMapper[wrapper.node.id].styleElement);
    expect(domTestDriver.getCssValue({className: 'someClass', property: 'color'})).toBe('yellow');
  });

  it('should not update the style tag when the component re-renders not due to a theme changes', () => {
    wrapper = mount(<StyledComponent theme={{color: 'blue'}}/>, {attachTo: document.createElement('div')});
    const domTestDriver = new DomTestDriver({componentId: wrapper.node.id});
    const {styleElement} = sheetMapper[wrapper.node.id];

    wrapper.setProps();
    expect(styleElement).toBe(sheetMapper[wrapper.node.id].styleElement);
    expect(domTestDriver.getCssValue({className: 'someClass', property: 'color'})).toBe('blue');
  });

  it('should remove the old style element and replace it with a new one when style should get updated', () => {
    wrapper = mount(<StyledComponent theme={{color: 'blue'}}/>, {attachTo: document.createElement('div')});
    const numberOfDomStyleElements = document.querySelectorAll('style').length;

    wrapper.setProps({theme: {color: 'yellow'}});
    const updatedNumberOfDomStyleElements = document.querySelectorAll('style').length;
    expect(numberOfDomStyleElements).toBe(updatedNumberOfDomStyleElements);
  });
});

it('should remove the style tag after component unmounts', () => {
  const wrapper = mount(<StyledComponent/>, {attachTo: document.createElement('div')});
  expect(document.querySelector('style').type).toBe('text/css');
  wrapper.detach();
  expect(document.querySelector('style')).toBeNull;
});
