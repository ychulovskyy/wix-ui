import * as React from 'react';
import {ListViewComposable, ListViewSharedProps, ListViewItemsView} from './list-view-composable';
import {ListViewDataSource, ListViewDataSourceItem} from './list-view-types';
import {ListViewItemsViewProps} from './list-view-items-view';
import {IListView} from './i-list-view';
import {arrayFlatten} from './list-view-utils';

export interface ListViewProps<T,S = any> extends ListViewSharedProps, ListViewItemsViewProps<T,S>
{
    children: Array<ListViewDataSourceItem<T> | ListViewDataSource<T>>
}

export class ListView<T,S = any> extends React.Component<ListViewProps<T,S>> implements IListView
{
    private listViewComposable = React.createRef<ListViewComposable>();

    render () {

        const {
            children,
            renderItem,
            dataItemEqualityComparer,
            ...listViewComposableProps
        } = this.props;

        const dataSource = Array.isArray(children) ? arrayFlatten(children as Array<any>) as ListViewDataSource<T> : [children];

        return (
            <ListViewComposable
                ref={this.listViewComposable}
                dataSourcesArray={[dataSource]}
                {...listViewComposableProps}
            >
                <ListViewItemsView
                    dataSource={dataSource}
                    renderItem={renderItem}
                    dataItemEqualityComparer={dataItemEqualityComparer}
                />
            </ListViewComposable>
        )
    }

    handleKeyboardEvent (event: React.KeyboardEvent<Element>) {
        this.listViewComposable.current.handleKeyboardEvent(event);
    }

    moveToItemBasedOnTypeAhead (updatedTypeAheadValue: string, options: {selectItem: boolean} = {selectItem: true}) {
        this.listViewComposable.current.moveToItemBasedOnTypeAhead(updatedTypeAheadValue, options);
    }
}