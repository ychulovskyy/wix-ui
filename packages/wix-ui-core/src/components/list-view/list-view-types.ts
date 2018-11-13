import {TriggerInteractiveSelectionFunction} from './list-view-composable';
import * as React from 'react';
import {ListViewStateController} from './list-view-state-controller';

export type ListViewItemId = string | number;

export interface ListViewItemMetadata
{
    id: ListViewItemId,
    typeAheadText?: string,
    isSelectable: boolean,
    isExcluded?: boolean
}

export interface ListViewDataSourceItem<T> extends ListViewItemMetadata
{
    dataItem: T,
}

export enum NavigationOrientation {
    Vertical = 1,
    Horizontal = 2,
}

export enum TypeAheadNavigationType {
    StayOnCurrent = 1,
    GoToNext = 2,
}

export enum KeyboardNavigationDirection {
    Forward = 1,
    Backward = 2
}

export enum ListViewSelectionType {
    None = 1,
    Single = 2,
    Multiple = 3
}

export type ListViewDataSource<T> = Array<ListViewDataSourceItem<T>>;

export interface CommonListViewProps {
    selectionType?: ListViewSelectionType,
    selectedIds?: Array<ListViewItemId>,
    disabledIds?: Array<ListViewItemId>,
    currentNavigatableItemId?: ListViewItemId,
    selectionStartId?: ListViewItemId,
    isFocusable?: boolean,
    tagName?: string,
    className?: string,
    typeAhead?: boolean,
    typeAheadValue?: string,
    forceRenderNavigatableItem?: (navigatableItemId: ListViewItemId) => void,
    isCyclic?: boolean,
    typeAheadNavigationType?: TypeAheadNavigationType,
    typeAheadClearTimeout?: number,
}

export const DefaultCommonListViewProps = {
    isFocusable: true,
    selectionType: ListViewSelectionType.None,
    typeAhead: true,
    tagName: 'div',
    isCyclic: false,
    typeAheadNavigationType: TypeAheadNavigationType.StayOnCurrent,
    typeAheadClearTimeout: 1000,
    onChange: () => {return;}
};

export interface ListViewCommonRenderItemProps<T> {
    dataItemId: ListViewItemId,
    dataItem: T,
    isSelected: boolean,
    isCurrent: boolean,
    isDisabled: boolean,
    listViewItemRoot: () => {[key: string]: any},
    innerFocusableItem: () => {tabIndex: number},
    triggerInteractiveSelection: TriggerInteractiveSelectionFunction
}

export type ListViewStateUpdateFunction = (stateController: ListViewStateController) => void;

export interface ListViewRenderItemProps<T, S> extends ListViewCommonRenderItemProps<T> {
    updateState: (updateFunction: ListViewStateUpdateFunction) => void,
    contextArg?: S,
}

export const ListViewDefaultState: ListViewState = {
    selectedIds: null,
    disabledIds: null,
    selectionStartId: null,
    currentNavigatableItemId: null,
    typeAheadValue: ''
};

export interface ListViewState {
    selectedIds: Array<ListViewItemId>,
    disabledIds: Array<ListViewItemId>,
    currentNavigatableItemId: ListViewItemId,
    selectionStartId: ListViewItemId,
    typeAheadValue: string
}

export type ListViewRenderItem<T, S> = React.SFC<ListViewRenderItemProps<T, S>>;

export type EqualityComparer<T> = (value1: T, value2: T) => boolean;

export function defaultDataItemsEqualityComparer<T> (dataItem1: T, dataItem2: T) {
    return dataItem1 === dataItem2;
}

export function defaultContextArgsEqualityComparer<T> (contextArg1: T, contextArg2: T) {
    return contextArg1 === contextArg2;
}

