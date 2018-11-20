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

    findItem (itemId: ListViewItemId) {
        return this.listView.find(ListViewItemViewWrapper).filter({id: itemId})
    }

    itemClick (itemId: ListViewItemId, metaDataKeyBoard? : SimulateKeyboardMetaData) {
        this.findItem(itemId).simulate('click', metaDataKeyBoard)
    }

    listKeyDown (key: string, metaDataKeyBoard? : SimulateKeyboardMetaData) {

        this.listView.find(ListViewItemViewWrapper).first().simulate('keyDown', {
            ...metaDataKeyBoard,
            key: key
        });
    }

    getSelectedIds () {
        return this.listView.props().listViewState.selectedIds;
    }

    selectItem (itemId: ListViewItemId) {
        this.updateState({
            selectedIds: [itemId]
        })
    }
}

export const SimulateCtrlKey = {ctrlKey: true};
export const SimulateCtrlShiftKey = {ctrlKey: true, shiftKey: true};
export const SimulateShiftKey = {shiftKey: true};

export interface SimulateKeyboardMetaData  {
    ctrlKey?: boolean,
    shiftKey?: boolean,
    altKey?: boolean
}

export function createDriver<T, S> (listViewWrapper: ReactWrapper<ListViewProps<T, S>>) {
    return new ListViewDriver<T, S>(listViewWrapper);
}