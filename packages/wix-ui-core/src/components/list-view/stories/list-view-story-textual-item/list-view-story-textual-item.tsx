import * as React from 'react';
import {ListViewRenderItemProps} from '../../list-view-types';
import style from './list-view-story-textual-item.st.css';

export interface ListViewStoryTextualItemDataItem {
    id: number,
    text: string
}

export const ListViewStoryTextualItem: React.SFC<ListViewRenderItemProps<ListViewStoryTextualItemDataItem,{}>> = (renderProps => {

    const {
        isSelected,
        isCurrent,
        triggerInteractiveSelection,
        listViewItemRoot,
        dataItem
    } = renderProps;

    return (
        <div
            {...listViewItemRoot()}
            {...style('root', {selected: isSelected, current: isCurrent})}
            onClick={triggerInteractiveSelection}
        >
            {dataItem.text}
        </div>
    )

});
