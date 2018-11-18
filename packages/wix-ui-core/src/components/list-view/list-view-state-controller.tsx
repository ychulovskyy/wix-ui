import {ListViewComposable} from './list-view-composable';
import {ListViewItemId, ListViewState} from './list-view-types';
import {arrayClone} from './list-view-utils';
import * as React from 'react';

export class ListViewStateController {

    protected currentState: ListViewState;
    protected isDirty: boolean = false;

    constructor(private listView: ListViewComposable) {

        const {
            selectionStartId,
            currentNavigatableItemId,
            selectedIds,
            disabledIds,
            typeAheadValue
        } = listView.props.listViewState;

        this.setCurrentState({
            selectionStartId: selectionStartId !== null || listView.isNotSupportingSelection() ? selectionStartId : currentNavigatableItemId,
            currentNavigatableItemId,
            selectedIds,
            disabledIds,
            typeAheadValue
        });
    }

    private setCurrentState (currentState) {
        this.currentState = currentState;
        this.isDirty = true;
    };

    public done () {
        if (this.isDirty)
        {
            this.listView.props.onChange(this.currentState);
        }
    }

    public moveNext () {

        const currentState = this.currentState;

        const nextFocusedItemId = this.listView.getNextEnabledItemId(currentState.currentNavigatableItemId);

        if (nextFocusedItemId !== null && nextFocusedItemId !== undefined)
        {
            this.setCurrentState({
                ...currentState,
                currentNavigatableItemId: nextFocusedItemId,
            });
        }

        return this;
    }

    public movePrev () {

        const currentState = this.currentState;

        const nextFocusedItemId = this.listView.getPrevEnabledItemId(currentState.currentNavigatableItemId);

        if (nextFocusedItemId !== null && nextFocusedItemId !== undefined)
        {
            this.setCurrentState({
                ...currentState,
                currentNavigatableItemId: nextFocusedItemId,
            });
        }

        return this;
    }

    public moveToItem (itemId: ListViewItemId) {
        const isDisabled = this.listView.isDisabled(itemId);

        if (!isDisabled)
        {
            this.setCurrentState({
                ...this.currentState,
                currentNavigatableItemId: itemId,
            });
        }

        return this;
    }

    public setSelectionStartIdToCurrent () {
        return this.setSelectionStartId(this.getCurrentItemId());
    }

    public setSelectionStartId (itemId: ListViewItemId) {
        const isDisabled = this.listView.isDisabled(itemId);

        if (!isDisabled)
        {
            this.setCurrentState({
                ...this.currentState,
                selectionStartId: itemId,
            });
        }

        return this;
    }

    public addItemsInRangeToSelection (startId : ListViewItemId, endId: ListViewItemId) {

        this.assertMultiple();

        const currentState = this.currentState;

        let {
            selectedIds,
        } = currentState;

        selectedIds =  selectedIds ? selectedIds : [];

        const itemsInRange = this.listView.getItemsInRange(startId, endId, {
            selectableOnly: true,
            enabledOnly: true,
        });

        const itemsInRangeSet : Set<ListViewItemId> = new Set(itemsInRange);

        for (let i = 0; i < selectedIds.length; i++)
        {
            const selectedId = selectedIds[i];
            if (!itemsInRangeSet.has(selectedId))
            {
                itemsInRange.push(selectedId);
            }
        }

        this.setCurrentState({
            ...currentState,
            selectedIds: itemsInRange,
        });

        return this;
    }

    public toggleItemSelection (itemId : ListViewItemId) {

        this.assertSelectionSupported();

        let listView = this.listView;

        if (!listView.isSelected(itemId))
        {
            if (listView.isMultiSelection())
            {
                this.addItemToSelection(itemId);
            }
            else if (listView.isSingleSelection())
            {
                this.selectItem(itemId);
            }
        }
        else
        {
            this.removeItemFromSelection(itemId);
        }

        return this;
    }

    public selectItemsInRange (startId : ListViewItemId, endId: ListViewItemId) {

        this.assertMultiple();

        const itemsInRange = this.listView.getItemsInRange(startId, endId, {
            selectableOnly: true,
            enabledOnly: true,
        });

        this.setCurrentState({
            ...this.currentState,
            selectedIds: itemsInRange,
        });

        return this;
    }

    public removeItemFromSelection (itemId : ListViewItemId) {

        this.assertSelectionSupported();

        const currentState = this.currentState;

        const {
            selectedIds,
            selectionStartId,
        } = currentState;

        const listView = this.listView;

        const isSelected = listView.isSelected(itemId);
        const isDisabled = listView.isDisabled(itemId);
        const isSelectable = listView.isSelectable(itemId);

        let updatedSelectedIds = selectedIds ? selectedIds : [];

        const focusedItemIndexInArray = updatedSelectedIds.indexOf(itemId);

        if (isSelected)
        {
            updatedSelectedIds = arrayClone(updatedSelectedIds);
            updatedSelectedIds.splice(focusedItemIndexInArray, 1);
        }

        this.setCurrentState({
            ...currentState,
            selectionStartId: isSelectable && !isDisabled ? itemId : selectionStartId,
            selectedIds: updatedSelectedIds,
        });

        return this;
    }

    public handleInteractiveSelection (itemId: ListViewItemId, event: React.MouseEvent<Element>) {

        const listView = this.listView;

        if (event.ctrlKey && event.shiftKey) {
            if (listView.isMultiSelection())
            {
                this.addItemsInRangeToSelection(this.getSelectionStartId(), itemId);
            }
            else if(listView.isSingleSelection())
            {
                this.selectItem(itemId);
            }
        }
        else if (event.shiftKey)
        {
            if (listView.isMultiSelection())
            {
                this.selectItemsInRange(this.getSelectionStartId(), itemId);
            }
            else if(listView.isSingleSelection())
            {
                this.selectItem(itemId);
            }
        }
        else if (event.ctrlKey)
        {
            if (!listView.isNotSupportingSelection())
            {
                this.toggleItemSelection(itemId);
            }
        }
        else
        {

            if (!listView.isNotSupportingSelection())
            {
                this.selectItem(itemId);
            }
        }

        this.moveToItem(itemId);

    }

    public selectItem (
        itemId : ListViewItemId,
        options: {
            clearSelectionWhenNotSelectable?: boolean
        } = {}
    ) {

        this.assertSelectionSupported();

        const {
            clearSelectionWhenNotSelectable = false
        } = options;

        const currentState = this.currentState;

        const {
            selectionStartId,
            selectedIds,
        } = currentState;

        const listView = this.listView;

        const isSelectableAndEnabled = listView.isSelectable(itemId) && !listView.isDisabled(itemId);

        if (!isSelectableAndEnabled && clearSelectionWhenNotSelectable)
        {
            this.clearSelection();
        }
        else
        {
            this.setCurrentState({
                ...currentState,
                selectionStartId: isSelectableAndEnabled ? itemId : selectionStartId,
                selectedIds: isSelectableAndEnabled ? [itemId] : selectedIds,
            });
        }

        return this;
    }

    public clearSelection () {
        this.setCurrentState({
            ...this.currentState,
            selectionStartId: null,
            selectedIds: [],
        });

        return this;
    }

    public clearCurrentItem () {
        this.setCurrentState({
            ...this.currentState,
            currentNavigatableItemId: null,
            selectionStartId: null,
        });

        return this;
    }

    public disableItem (itemId : ListViewItemId) {

        const currentState = this.currentState;

        const {
            disabledIds,
        } = currentState;

        const listView = this.listView;

        const isSelected = listView.isSelected(itemId);
        const isDisabled = listView.isDisabled(itemId);
        const isSelectable = listView.isSelectable(itemId);

        let updateDisabledIds =  disabledIds ? disabledIds : [];

        if (!isDisabled)
        {
            updateDisabledIds = arrayClone(updateDisabledIds);
            updateDisabledIds.push(itemId);
        }

        if(this.listView.isSupportingSelection() && isSelected)
        {
            // when disable remove item from selection
            this.removeItemFromSelection(itemId);
        }
        const updatedState = this.currentState;

        // if item is selectionStart clear
        let newSelectionStartId = updatedState.selectionStartId;
        if (newSelectionStartId === itemId)
        {
            newSelectionStartId = null;
        }

        // if item is currentNavigatableItem clear
        let newCurrentNavigatableItemId = updatedState.currentNavigatableItemId;
        if (newCurrentNavigatableItemId === itemId)
        {
            newCurrentNavigatableItemId = null;
        }

        this.setCurrentState({
            ...updatedState,
            selectionStartId: newSelectionStartId,
            currentNavigatableItemId: newCurrentNavigatableItemId,
            disabledIds: updateDisabledIds,
        });

        return this;
    }

    public enableItem (itemId : ListViewItemId) {

        const currentState = this.currentState;

        const {
            disabledIds,
        } = currentState;

        const listView = this.listView;

        const isSelected = listView.isSelected(itemId);
        const isDisabled = listView.isDisabled(itemId);
        const isSelectable = listView.isSelectable(itemId);

        let updateDisabledIds =  disabledIds ? disabledIds : [];
        const disabledItemIndexInArray = updateDisabledIds.indexOf(itemId);

        if (isDisabled)
        {
            updateDisabledIds = arrayClone(updateDisabledIds);
            updateDisabledIds.splice(disabledItemIndexInArray, 1);
        }

        this.setCurrentState({
            ...currentState,
            disabledIds: updateDisabledIds,
        });

        return this;
    }

    public toggleItemDisabled (itemId : ListViewItemId) {

        if (!this.listView.isDisabled(itemId))
        {
            this.disableItem(itemId);
        }
        else
        {
            this.enableItem(itemId);
        }

        return this;
    }

    public isDisabled (itemId : ListViewItemId) {
        return this.listView.isDisabled(itemId)
    }

    public addItemToSelection (itemId : ListViewItemId) {

        this.assertMultiple();

        const currentState = this.currentState;

        const {
            selectedIds,
            selectionStartId,
        } = currentState;

        const listView = this.listView;

        const isSelected = listView.isSelected(itemId);
        const isDisabled = listView.isDisabled(itemId);
        const isSelectable = listView.isSelectable(itemId);

        let updatedSelectedIds = selectedIds ? selectedIds : [];;

        if (!isSelected && !isDisabled && isSelectable)
        {
            updatedSelectedIds = arrayClone(updatedSelectedIds);
            updatedSelectedIds.push(itemId);
        }

        this.setCurrentState({
            ...currentState,
            selectionStartId: isSelectable && !isDisabled ? itemId : selectionStartId,
            selectedIds: updatedSelectedIds,
        });

        return this;
    }

    public setTypeAheadValue (typeAheadValue) {

        const currentState = this.currentState;

        this.setCurrentState({
            ...currentState,
            typeAheadValue,
        });

        return this;
    }

    public navigateToItemBasedOnCurrentTypeAhead (selectItem: boolean) {

        return this.navigateToItemBasedOnTypeAhead(this.currentState.typeAheadValue, selectItem)

    }

    public navigateToItemBasedOnTypeAhead (newTypeAheadValue: string = '', selectItem: boolean) {
        const nextFocusedItemId = this.listView.resolveNextFocusedItemByTypeAheadText(this.getCurrentItemId(), newTypeAheadValue);

        if (nextFocusedItemId !== null && nextFocusedItemId !== undefined)
        {
            if (selectItem && this.listView.isSupportingSelection())
            {
                this.selectItem(nextFocusedItemId);
            }

            this.setCurrentState({
                ...this.currentState,
                currentNavigatableItemId: nextFocusedItemId,
            });
        }

        return this;
    }

    public getSelectionStartId () {
        return this.currentState.selectionStartId;
    }

    public getCurrentItemId () {
        return this.currentState.currentNavigatableItemId;
    }


    private assertMultiple() : void {
        if (!this.listView.isMultiSelection())
        {
            throw new Error('Supported Only In Multiple Selection');
        }
    }

    private assertSelectionSupported() : void {
        if (this.listView.isNotSupportingSelection())
        {
            throw new Error('Supported Only In List View With Selection');
        }
    }

}