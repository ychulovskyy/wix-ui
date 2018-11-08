import {
    DataItemsEqualityComparer,
    ListViewDataSource,
    ListViewItemId,
    ListViewRenderItem,
    ListViewRenderItemProps
} from "./list-view-types";
import * as React from "react";
import {ListViewContext, ListViewContextData} from "./list-view";
import {ListViewItemViewWrapper, ListViewItemViewWrapperProps} from "./list-view-item-view-wrapper";

interface ListViewItemsViewProps<T> {
    dataSource: ListViewDataSource<T>,
    renderItem: ListViewRenderItem<T>,
    dataItemEqualityComparer?: DataItemsEqualityComparer<T>;
}

export class ListViewItemsView<T> extends React.Component<ListViewItemsViewProps<T>>
{
    render () {

        const {
            dataSource,
            renderItem,
            dataItemEqualityComparer
        } = this.props;

        return (
            <ListViewContext.Consumer>
                {
                    (listViewContextData) => {
                        return dataSource.map(dataSourceItem => {

                            const dataItemId = dataSourceItem.id;

                            const isSelected = listViewContextData.selectedIdsSet.has(dataItemId);
                            const isDisabled = listViewContextData.disabledIdsSet.has(dataItemId);
                            const isCurrentNavigatableItem = listViewContextData.currentNavigatableItemId === dataItemId;

                            const renderItemProps: ListViewRenderItemProps<T> = {
                                dataItemId: dataItemId,
                                dataItem: dataSourceItem.dataItem,
                                isSelected: isSelected,
                                isCurrent: isCurrentNavigatableItem,
                                isDisabled: isDisabled,
                                selectableItemRoot: () => {
                                    return {
                                        disabled: isDisabled ? true : null,
                                        'aria-selected': isSelected ? "true" : null,
                                        'aria-disabled': isDisabled ? "true" : null,
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
                                triggerAction: (data) => {
                                    listViewContextData.onAction(dataItemId, data)
                                }
                            };

                            const listViewItemViewWrapperProps: ListViewItemViewWrapperProps<any> = {
                                key: dataItemId,
                                id: dataItemId,
                                isCurrentNavigatableItem: isCurrentNavigatableItem,
                                listViewContextData: listViewContextData,
                                renderProps: renderItemProps,
                                renderItem: renderItem,
                                dataItemEqualityComparer: dataItemEqualityComparer,
                            };

                            return React.createElement(ListViewItemViewWrapper, listViewItemViewWrapperProps);
                        })
                    }
                }
            </ListViewContext.Consumer>
        )
    }
}

function resolveListViewItemRootProps (itemId: ListViewItemId, listViewContextData: ListViewContextData, isDisabled: boolean) : {[key: string]: any} {

    return {
        'tabIndex': resolveTabIndex(itemId, listViewContextData, isDisabled),
        'data-navigatable-item': listViewContextData.navigationListId,
        onFocus: function (event: React.FocusEvent<Element>) {

            if (event.target.getAttribute('data-navigatable-item') === listViewContextData.navigationListId)
            {
                listViewContextData.onNavigatableItemFocus(itemId);
            }

        }
    }
}

function resolveTabIndex (itemId: ListViewItemId, listViewContextData: ListViewContextData, isDisabled: boolean) : number {

    if (isDisabled) {
        return null;
    }

    const listView = listViewContextData.listView;

    let currentNavigatableItemId = listViewContextData.currentNavigatableItemId;
    if (currentNavigatableItemId === null)
    {
        currentNavigatableItemId = listView.getItemIdByIndex(0);
    }

    const isFocusable = listViewContextData.isFocusable;
    const isCurrent = currentNavigatableItemId === itemId;

    return isFocusable ? (isCurrent ? 0 : -1) : null
}
