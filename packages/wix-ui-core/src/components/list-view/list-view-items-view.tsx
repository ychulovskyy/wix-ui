import {
    DataItemsEqualityComparer,
    ListViewDataSource, ListViewDataSourceItem,
    ListViewItemId,
    ListViewRenderItem,
} from './list-view-types';
import * as React from 'react';
import {ListViewContext, ListViewContextData} from './list-view-composable';
import {ListViewItemViewWrapper} from './list-view-item-view-wrapper';

export interface ListViewItemsViewProps<T> {
    renderItem: ListViewRenderItem<T>,
    dataItemEqualityComparer?: DataItemsEqualityComparer<T>;
}

interface ComposableListViewItemsViewProps<T> extends ListViewItemsViewProps<T> {
    dataSource: ListViewDataSource<T>
}

export class ListViewItemsView<T> extends React.Component<ComposableListViewItemsViewProps<T>>
{
    render () {

        const {
            dataSource,
            renderItem,
            dataItemEqualityComparer
        } = this.props;

        return (
            <ListViewContext.Consumer>
                {listViewContextData => {
                    return dataSource.map((dataSourceItem: ListViewDataSourceItem<T>) => {

                        if (dataSourceItem.isExcluded)
                        {
                            return null;
                        }

                        const dataItemId = dataSourceItem.id;

                        const isSelected = listViewContextData.selectedIdsSet.has(dataItemId);
                        const isDisabled = listViewContextData.disabledIdsSet.has(dataItemId);
                        const isCurrentListViewItem = listViewContextData.currentListViewItemId === dataItemId;

                        const renderItemProps = {
                            dataItemId,
                            dataItem: dataSourceItem.dataItem,
                            isSelected,
                            isCurrent: isCurrentListViewItem,
                            isDisabled,
                            listViewItemRoot: () => {
                                return {
                                    disabled: isDisabled ? true : null,
                                    'aria-selected': isSelected ? 'true' : null,
                                    'aria-disabled': isDisabled ? 'true' : null,
                                    role: 'option',
                                    ...resolveListViewItemRootProps(dataItemId, listViewContextData, isDisabled)
                                }
                            },
                            innerFocusableItem: () => {
                                return {
                                    disabled: isDisabled ? true : null,
                                    tabIndex: resolveTabIndex(dataItemId, listViewContextData, isDisabled)
                                }
                            },
                            updateState: updateFunction => {
                                listViewContextData.listView.updateState(updateFunction);
                            },
                            triggerInteractiveSelection (event: React.MouseEvent<Element>) {
                                listViewContextData.listView.updateState(stateController => {
                                    stateController.handleInteractiveSelection(dataItemId, event);
                                })
                            }
                        };

                        return ListViewItemViewWrapper.create({
                            key: dataItemId,
                            id: dataItemId,
                            listViewContextData,
                            renderProps: renderItemProps,
                            renderItem,
                            dataItemEqualityComparer
                        });
                    })
                }}
            </ListViewContext.Consumer>
        )
    }
}

function resolveListViewItemRootProps (itemId: ListViewItemId, listViewContextData: ListViewContextData, isDisabled: boolean) : {[key: string]: any} {

    return {
        'tabIndex': resolveTabIndex(itemId, listViewContextData, isDisabled),
        'data-navigatable-item': listViewContextData.navigationListId,
        onFocus (event: React.FocusEvent<Element>) {

            if (event.target.getAttribute('data-navigatable-item') === listViewContextData.navigationListId)
            {
                listViewContextData.onListViewItemFocus(itemId);
            }

        }
    }
}

function resolveTabIndex (itemId: ListViewItemId, listViewContextData: ListViewContextData, isDisabled: boolean) : number {

    if (isDisabled) {
        return null;
    }

    let currentNavigatableItemId = listViewContextData.currentListViewItemId;

    const isFocusable = listViewContextData.isFocusable;
    const isCurrent = currentNavigatableItemId === itemId;

    return isFocusable ? (isCurrent ? 0 : -1) : null
}
