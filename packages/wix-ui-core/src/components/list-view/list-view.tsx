import * as React from 'react';
import {ListViewComposable, ListViewSharedProps, ListViewItemsView} from './list-view-composable';
import {ListViewDataSource} from './list-view-types';
import {ListViewItemsViewProps} from './list-view-items-view';

interface ListViewProps<T> extends ListViewSharedProps, ListViewItemsViewProps<T>
{
    dataSource: ListViewDataSource<T>
}

export class ListView<T> extends React.Component<ListViewProps<T>>
{
    private listViewComposable = React.createRef<ListViewComposable>();

    render () {

        const {
            dataSource,
            renderItem,
            dataItemEqualityComparer,
            ...listViewComposableProps
        } = this.props;

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