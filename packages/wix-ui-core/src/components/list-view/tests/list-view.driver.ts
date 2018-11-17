import * as React from "react";
import {mount, ReactWrapper} from "enzyme";
import {ListView, ListViewProps} from "../list-view";
import {ListViewItemId, ListViewState} from "../list-view-types";
import {ListViewItemViewWrapper} from "../list-view-item-view-wrapper";

class ListViewDriver<T, S>
{
    private listView: ReactWrapper<ListViewProps<T, S>>;

    constructor(listViewWrapper: ReactWrapper<ListViewProps<T, S>>) {
        this.listView = listViewWrapper;
    }

    public updateState (listViewState: Partial<ListViewState>) {
        const listView = this.listView;
        const currentProps = listView.props();

        const updatedListViewState = {
            ...currentProps.listViewState,
            ...listViewState
        };

        listView.setProps({
            listViewState: updatedListViewState
        })
    }

    getWrapper () {
        return this.listView;
    }

    findItem (itemId: ListViewItemId) {
        return this.listView.find(ListViewItemViewWrapper).filter({id: itemId})
    }

    itemClick (itemId: ListViewItemId) {
        this.findItem(itemId).simulate('click')
    }

    itemCtrlClick (itemId: ListViewItemId) {
        this.findItem(itemId).simulate('click', {
            ctrlKey: true
        })
    }

    itemShiftClick (itemId: ListViewItemId) {
        this.findItem(itemId).simulate('click', {
            shiftKey: true
        })
    }

    itemCtrlShiftClick (itemId: ListViewItemId) {
        this.findItem(itemId).simulate('click', {
            shiftKey: true
        })
    }

    // findItemById (itemId: ListViewItemId) {
    //     const listView = this.listView;
    //
    //     listView.find(ListViewItemViewWrapper).
    // }

    selectItem (itemId: ListViewItemId) {
        this.updateState({
            selectedIds: [itemId]
        })
    }
}

export function createDriver<T, S> (listViewWrapper: ReactWrapper<ListViewProps<T, S>>) {
    return new ListViewDriver<T, S>(listViewWrapper);
}