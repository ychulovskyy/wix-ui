import {TriggerActionFunction} from "./list-view";
import * as React from "react";

export type ListViewItemId = string | number;

export interface ListViewDataSourceItem<T>
{
    dataItem: T,
    id: ListViewItemId,
    typeAheadText?: string,
    isSelectable: boolean,
}

export enum NavigationOrientation {
    Vertical = 1,
    Horizontal = 2,
}

export enum TypeAheadNavigationType {
    StayOnCurrent = 1,
    GoToNext = 2,
}

export type ListViewDataSource<T> = Array<ListViewDataSourceItem<T>>;

export interface CommonListViewProps {
    isMultiple?: boolean,
    selectedIds: Array<ListViewItemId>,
    disabledIds?: Array<ListViewItemId>,
    currentNavigatableItemId?: ListViewItemId,
    selectionStartId?: ListViewItemId,
    isFocusable?: boolean,
    tagName?: string,
    className?: string,
    typeAhead?: boolean,
    typeAheadValue?: string,
    onChange?: (event: ListViewState) => void,
    forceRenderNavigatableItem?: (navigatableItemId: ListViewItemId) => void,
    isCyclic?: boolean,
    typeAheadNavigationType?: TypeAheadNavigationType,
    typeAheadClearTimeout?: number,
}

export const DefaultCommonListViewProps = {
    isFocusable: true,
    isMultiple: false,
    typeAhead: true,
    tagName: 'div',
    onChange: function () {}
};

export interface ListViewCommonRenderItemProps<T> {
    dataItemId: ListViewItemId,
    dataItem: T,
    isSelected: boolean,
    isCurrent: boolean,
    isDisabled: boolean,
    selectableItemRoot: () => {[key: string]: any},
    innerFocusableItem: () => {tabIndex: number},
    triggerAction: TriggerActionFunction
}

export interface ListViewRenderItemProps<T> extends ListViewCommonRenderItemProps<T> {
}

export const ListViewDefaultState: ListViewState = {
    selectedIds: null,
    disabledIds: null,
    selectionStartId: null,
    currentNavigatableItemId: null,
    typeAheadValue: ""
};

export interface ListViewState {
    selectedIds: Array<ListViewItemId>,
    disabledIds: Array<ListViewItemId>,
    currentNavigatableItemId: ListViewItemId,
    selectionStartId: ListViewItemId,
    typeAheadValue: string
}

export type ListViewRenderItem<T> = React.SFC<ListViewRenderItemProps<T>>;

export type DataItemsEqualityComparer<T> = (dataItem1: T, dataItem2: T) => boolean;

export function defaultDataItemsEqualityComparer<T> (dataItem1: T, dataItem2: T) {
    return dataItem1 === dataItem2;
}