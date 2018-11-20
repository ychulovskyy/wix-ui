import * as Loadable from 'react-loadable';
import * as React from 'react';

const LoadablePopover = Loadable({
  loader: () => import(/* webpackChunkName: "popover-lazy" */ './Popover'),
  render(loaded, props) {
    let PopoverComp = loaded.Popover;
    return (
      <PopoverComp shown>
        <PopoverComp.Element>
          {props[0].element}
        </PopoverComp.Element>
        <PopoverComp.Content>
          {props[0].content}
        </PopoverComp.Content>
      </PopoverComp>
    )
  },
  loading: () => <div>bblbla</div>
});

export const Popover: React.SFC<any> = (...props) => {
  return <LoadablePopover {...props}/>;
};

Popover.displayName = 'Popover';
