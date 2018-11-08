import * as React from "react";
import {
    arrayClone,
    arrayFindIndex,
    arrayFlatten,
    domFindAncestor
} from "./list-view-utils";
import {
    CommonListViewProps,
    ListViewDataSource,
    ListViewDataSourceItem,
    ListViewItemId, NavigationOrientation,
    TypeAheadNavigationType
} from "./list-view-types";

// -------------------------

// type Context<T> = React.Context<T>;
// const createContext = React.createContext;

import * as ReactTypesHack from "./react-updated-types-polyfill";
type Context<T> = ReactTypesHack.Context<T>
const createContext = ((React as any).createContext as ReactTypesHack.createContext<ListViewContextData>);
// -------------------------

export const ListViewContext : Context<ListViewContextData> = createContext(null);

export enum ListViewItemAction {
    Select,
    AddToSelection,
    RemoveFromSelection,
    ToggleSelection,
    SelectRange,
    Disable,
    Enable,
    ToggleDisable,
}

type ListViewItemActionData = React.MouseEvent<Element> | ListViewItemAction;

export interface ListViewContextData {
    selectedIdsSet: Set<ListViewItemId>,
    disabledIdsSet: Set<ListViewItemId>,
    onAction: (itemId: ListViewItemId, data: ListViewItemActionData) => void,
    typeAheadValue: string,
    listView: ListView,
    currentNavigatableItemId: ListViewItemId,
    typeAhead: boolean,
    isFocusable: boolean,
    navigationListId: string,
    onNavigatableItemFocus: (itemId: ListViewItemId) => void,
    handleItemRendered: (itemId: ListViewItemId) => void,
    isItemShouldBeFocusedWhenRendered: (itemId: ListViewItemId) => boolean,
}

interface ListViewProps extends CommonListViewProps {
    dataSourcesArray: Array<ListViewDataSource<any>>,
    orientation?: NavigationOrientation,
}

export {ListViewItemsView} from './list-view-items-view';

export class ListView extends React.Component<ListViewProps>
{
    static defaultProps = {
        isFocusable: true,
        isMultiple: false,
        typeAhead: true,
        tagName: 'div',
        orientation: NavigationOrientation.Vertical,
        onChange: function () {}
    };

    private static nextNavigationListId: number = 0;

    private listViewContextData: ListViewContextData;
    private currentTypeAheadTimeOut : number;
    private navigationListId: string = (ListView.nextNavigationListId++).toString();

    private navigatableItemsIds: Array<ListViewItemId> = null;
    private navigatableItemsIdsEnabled: Array<ListViewItemId> = null;
    private selectableItemsSet: Set<ListViewItemId> = null;
    private navigatableItemsMap: Map<ListViewItemId,ListViewDataSourceItem<any>> = null;
    private navigatableItems: Array<ListViewDataSourceItem<any>>;
    private disabledIdsSet: Set<ListViewItemId>;

    private itemShouldBeFocusedWhenRendered : ListViewItemId = null;

    private _handleItemRendered = (itemId : ListViewItemId)  => {
        if(this.itemShouldBeFocusedWhenRendered === itemId){
            this.itemShouldBeFocusedWhenRendered = null;
        }
    };

    private _isItemShouldBeFocusedWhenRendered = (itemId : ListViewItemId)  => {
        return this.itemShouldBeFocusedWhenRendered === itemId;
    };


    private _onNavigatableItemFocus = (itemId: ListViewItemId) => {

        let {
            selectedIds,
            disabledIds,
            currentNavigatableItemId,
            onChange,
            selectionStartId,
            typeAheadValue,
        } = this.props;

        if (itemId !== currentNavigatableItemId)
        {
            onChange({
                selectionStartId: selectionStartId,
                selectedIds: selectedIds,
                disabledIds: disabledIds,
                currentNavigatableItemId: itemId,
                typeAheadValue: typeAheadValue
            });
        }
    };

    render () {

        let {
            selectedIds,
            disabledIds,
            currentNavigatableItemId,
            children,
            tagName,
            isMultiple,
            onChange,
            typeAhead,
            selectionStartId,
            isFocusable,
            typeAheadValue,
            forceRenderNavigatableItem,
            typeAheadClearTimeout,
            dataSourcesArray,
            typeAheadNavigationType,
            isCyclic,
            ...restProps
        } = this.props;

        const self = this;

        const disabledIdsSet = this.disabledIdsSet = new Set<ListViewItemId>(this.props.disabledIds);
        const selectedIdsSet = new Set<ListViewItemId>(selectedIds);

        this.navigatableItems = arrayFlatten(this.props.dataSourcesArray);
        this.navigatableItemsIds = this.navigatableItems.map(item => item.id);
        this.navigatableItemsIdsEnabled = this.navigatableItemsIds.filter(id => !disabledIdsSet.has(id));
        this.selectableItemsSet = new Set(this.navigatableItems.filter(item => item.isSelectable).map(item => item.id));
        this.navigatableItemsMap = new Map(this.navigatableItems.map((item) : [ListViewItemId, ListViewDataSourceItem<any>] => [item.id, item]));

        const listViewContextData = this.listViewContextData = {
            selectedIdsSet,
            disabledIdsSet,
            listView: this,
            onAction: this.handleAction,
            typeAheadValue: typeAheadValue,
            currentNavigatableItemId,
            typeAhead: typeAhead,
            isFocusable: isFocusable,
            navigationListId: this.navigationListId,
            onNavigatableItemFocus: this._onNavigatableItemFocus,
            handleItemRendered: this._handleItemRendered,
            isItemShouldBeFocusedWhenRendered: this._isItemShouldBeFocusedWhenRendered,
        };

        const listViewRootProps = {
            role: 'listbox',
            ...restProps,
            onKeyDown: (event: React.KeyboardEvent<Element>) => {

                if (findEnclosingNavigatableItemElement(event.target as HTMLElement, this.navigationListId))
                {
                    this.handleKeyboardEvent(event);
                }
            }
        };

        return (
            <ListViewContext.Provider value={listViewContextData}>
                {React.createElement(tagName, listViewRootProps, children)}
            </ListViewContext.Provider>
        )
    }

    componentDidUpdate (prevProps: ListViewProps) {
        const self = this;

        const forceRenderNavigatableItem = this.props.forceRenderNavigatableItem;

        if (forceRenderNavigatableItem)
        {
            const prevCurrentNavigatableItemId = prevProps.currentNavigatableItemId;
            const updatedCurrentNavigatableItemId = this.props.currentNavigatableItemId;

            if (updatedCurrentNavigatableItemId && prevCurrentNavigatableItemId !== updatedCurrentNavigatableItemId)
            {
                const activeElement = document.activeElement;

                if (activeElement instanceof HTMLElement)
                {
                    const navigationListId = this.navigationListId;

                    if (findEnclosingNavigatableItemElement(activeElement, navigationListId))
                    {
                        this.itemShouldBeFocusedWhenRendered = updatedCurrentNavigatableItemId;
                        forceRenderNavigatableItem(updatedCurrentNavigatableItemId);
                    }
                }
            }
        }

        const typeAheadClearTimeout = this.props.typeAheadClearTimeout;
        const useTypeAhead = this.props.typeAhead;

        if (typeAheadClearTimeout && useTypeAhead)
        {
            if(prevProps.typeAheadValue !== this.props.typeAheadValue){
                window.clearTimeout(self.currentTypeAheadTimeOut);
                self.currentTypeAheadTimeOut = window.setTimeout(function() {
                    window.clearTimeout(self.currentTypeAheadTimeOut);
                    self.props.onChange({
                        typeAheadValue: "",
                        selectionStartId: self.props.selectionStartId,
                        selectedIds: self.props.selectedIds,
                        disabledIds: self.props.disabledIds,
                        currentNavigatableItemId: self.props.currentNavigatableItemId,
                    });
                }, typeAheadClearTimeout);
            }
        }
    }

    public selectItemsInRange (startId : ListViewItemId, endId: ListViewItemId) {
        const {
            onChange,
            disabledIds,
            typeAheadValue
        } = this.props;

        const itemsInRange = this.getItemsInRange(startId, endId, {
            selectableOnly: true,
            enabledOnly: true,
        });

        onChange({
            disabledIds: disabledIds,
            selectionStartId: startId,
            selectedIds: itemsInRange,
            currentNavigatableItemId: endId,
            typeAheadValue: typeAheadValue,
        });
    }

    public handleKeyboardEvent = (event: React.KeyboardEvent<Element>) : void => {

        const {
            currentNavigatableItemId,
            onChange,
            selectedIds,
            disabledIds,
            selectionStartId,
            typeAhead,
            typeAheadValue,
        } = this.props;

        const currentSelectionStartId = selectionStartId !== null ? selectionStartId : currentNavigatableItemId;
        const selectionState = this.listViewContextData;

        let updatedTypeAheadValue = typeAheadValue;

        const eventKey = event.key;
        const isTypeAheadKey = eventKey.length === 1 && !event.ctrlKey && !event.altKey;

        if (eventKey === ' ')
        {
            if (this.isSelectable(currentNavigatableItemId))
            {
                if (event.shiftKey)
                {
                    const itemsInRange = this.getItemsInRange(currentSelectionStartId, currentNavigatableItemId, {
                        selectableOnly: true,
                        enabledOnly: true,
                    });

                    onChange({
                        disabledIds: disabledIds,
                        selectionStartId: currentSelectionStartId,
                        selectedIds: itemsInRange,
                        currentNavigatableItemId: currentNavigatableItemId,
                        typeAheadValue: updatedTypeAheadValue,
                    });
                }
                else if (event.ctrlKey)
                {
                    const focusedItemIndexInArray = selectedIds.indexOf(currentNavigatableItemId);

                    let updatedSelectedIds = arrayClone(selectedIds);

                    if (focusedItemIndexInArray < 0)
                    {
                        updatedSelectedIds.push(currentNavigatableItemId);
                    }
                    else
                    {
                        updatedSelectedIds.splice(focusedItemIndexInArray, 1);
                    }

                    onChange({
                        disabledIds: disabledIds,
                        selectionStartId: currentNavigatableItemId,
                        selectedIds: updatedSelectedIds,
                        currentNavigatableItemId: currentNavigatableItemId,
                        typeAheadValue: updatedTypeAheadValue,
                    });
                }
                else
                {
                    const focusedItemIndexInArray = selectedIds.indexOf(currentNavigatableItemId);

                    if (focusedItemIndexInArray < 0)
                    {
                        let updatedSelectedIds = arrayClone(selectedIds);
                        updatedSelectedIds.push(currentNavigatableItemId);

                        onChange({
                            disabledIds: disabledIds,
                            selectionStartId: currentNavigatableItemId,
                            selectedIds: updatedSelectedIds,
                            currentNavigatableItemId: currentNavigatableItemId,
                            typeAheadValue: updatedTypeAheadValue,
                        });
                    }


                }

                event.preventDefault();

            }
        }
        else if (isTypeAheadKey)
        {
            if (typeAhead)
            {
                if (!updatedTypeAheadValue)
                {
                    updatedTypeAheadValue = "";
                }

                updatedTypeAheadValue += eventKey;

                const nextFocusedItemId = this.resolveNextFocusedItemByTypeAheadText(currentNavigatableItemId, updatedTypeAheadValue);

                if (nextFocusedItemId)
                {
                    onChange({
                        disabledIds: disabledIds,
                        selectionStartId: currentSelectionStartId,
                        selectedIds: [nextFocusedItemId],
                        currentNavigatableItemId: nextFocusedItemId,
                        typeAheadValue: updatedTypeAheadValue,
                    });
                }
                else
                {
                    onChange({
                        disabledIds: disabledIds,
                        selectionStartId: currentSelectionStartId,
                        selectedIds: selectedIds,
                        currentNavigatableItemId: currentNavigatableItemId,
                        typeAheadValue: updatedTypeAheadValue,
                    });
                }
            }
        }
        else if (this.isNavigationKeyboardEvent(event))
        {
            const nextFocusedItemId = this.resolveNextFocusedItem(currentNavigatableItemId, event);

            let updatedSelectedIds: Array<ListViewItemId>;
            let updatedSelectionStartId;

            if (event.ctrlKey)
            {
                updatedSelectedIds = selectedIds;
                updatedSelectionStartId = currentSelectionStartId;
            }
            else if (event.shiftKey)
            {
                updatedSelectedIds =
                    this.getItemsInRange(currentSelectionStartId, nextFocusedItemId, {selectableOnly: true, enabledOnly: true});
                updatedSelectionStartId = currentSelectionStartId;
            }
            else
            {
                if (this.isSelectable(nextFocusedItemId))
                {
                    updatedSelectedIds = [nextFocusedItemId];
                    updatedSelectionStartId = nextFocusedItemId;
                }
                else
                {
                    updatedSelectedIds = [];
                    updatedSelectionStartId = null;
                }

            }

            event.preventDefault();

            onChange({
                disabledIds: disabledIds,
                selectionStartId: updatedSelectionStartId,
                selectedIds: updatedSelectedIds,
                currentNavigatableItemId: nextFocusedItemId,
                typeAheadValue: updatedTypeAheadValue,
            });
        }
    };

    private handleListViewItemAction = (itemId: ListViewItemId, data: ListViewItemActionData) => {
        const {
            selectedIds,
            disabledIds,
            onChange,
            selectionStartId,
            currentNavigatableItemId,
            typeAheadValue
        } = this.props;

        const currentSelectionStartId = selectionStartId !== null ? selectionStartId : currentNavigatableItemId;
        const selectedIdsArr = selectedIds ? arrayClone(selectedIds) : [];
        const disabledIdsArr = disabledIds ? arrayClone(disabledIds) : [];

        const itemIndexInSelectionArr = selectedIdsArr.indexOf(itemId);
        const itemIndexInDisabledArr = disabledIdsArr.indexOf(itemId);
        const isSelected = itemIndexInSelectionArr >= 0;
        const isDisabled = itemIndexInDisabledArr >= 0;

        if (data === ListViewItemAction.ToggleSelection)
        {
            data = isSelected ? ListViewItemAction.RemoveFromSelection : ListViewItemAction.AddToSelection;
        }

        if (data === ListViewItemAction.ToggleDisable)
        {
            data = isDisabled ? ListViewItemAction.Enable: ListViewItemAction.Disable;
        }

        let updatedFocusedId = isDisabled ? null : itemId;
        let updatedSelectionStartId: ListViewItemId;
        let updatedSelectedIds: ListViewItemId[];
        let updatedDisabledIds: ListViewItemId[];

        switch (data)
        {
            case ListViewItemAction.AddToSelection:

                if (!isSelected && !isDisabled)
                {
                    selectedIdsArr.push(itemId);
                }

                updatedSelectedIds = selectedIdsArr;
                updatedDisabledIds = disabledIdsArr;
                updatedSelectionStartId = isDisabled ? null : itemId;

                break;
            case ListViewItemAction.Select:

                // TODO:: should return []?
                updatedSelectedIds = isDisabled ? selectedIdsArr : [itemId];
                updatedSelectionStartId = isDisabled ? null : itemId;
                updatedDisabledIds = disabledIdsArr;

                break;
            case ListViewItemAction.RemoveFromSelection:

                if (isSelected)
                {
                    selectedIdsArr.splice(itemIndexInSelectionArr, 1)
                }

                updatedSelectedIds = selectedIdsArr;
                updatedSelectionStartId = isDisabled ? null : itemId;
                updatedDisabledIds = disabledIdsArr;

                break;
            case ListViewItemAction.SelectRange:

                updatedSelectedIds = this.getItemsInRange(currentSelectionStartId, itemId, {selectableOnly: true, enabledOnly: true});
                updatedSelectionStartId = currentSelectionStartId;
                updatedDisabledIds = disabledIdsArr;

                break;
            case ListViewItemAction.Enable:

                if (isDisabled)
                {
                    disabledIdsArr.splice(itemIndexInDisabledArr, 1)
                }

                updatedSelectedIds = selectedIdsArr;
                updatedSelectionStartId = itemId;
                updatedDisabledIds = disabledIdsArr;
                updatedFocusedId = itemId;

                break;
            case ListViewItemAction.Disable:

                if (!isDisabled)
                {
                    disabledIdsArr.push(itemId);
                }

                if (isSelected)
                {
                    selectedIdsArr.splice(itemIndexInSelectionArr, 1)
                }

                updatedSelectedIds = selectedIdsArr;
                updatedDisabledIds = disabledIdsArr;

                updatedSelectionStartId = null;
                updatedFocusedId = null;

                break;
        }

        onChange({
            disabledIds: updatedDisabledIds,
            selectedIds: updatedSelectedIds,
            currentNavigatableItemId: updatedFocusedId,
            selectionStartId: updatedSelectionStartId,
            typeAheadValue: typeAheadValue,
        });
    };

    private handleAction = (itemId: ListViewItemId, data: ListViewItemActionData) => {

        let listViewItemAction: ListViewItemAction;

        // When data is a number, we assume that it's a ListViewItemAction enum value.
        if (typeof data === "number")
        {
            listViewItemAction = data;
        }
        else
        {
            const event = data as React.MouseEvent<Element>;

            if (event.shiftKey)
            {
                listViewItemAction = ListViewItemAction.SelectRange;
            }
            else if (event.ctrlKey)
            {
                listViewItemAction = ListViewItemAction.ToggleSelection;
            }
            else
            {
                listViewItemAction = ListViewItemAction.Select;
            }
        }

        this.handleListViewItemAction(itemId, listViewItemAction);
    }

    // ---------------------------------------------------------

    private isSelectable(itemId: ListViewItemId): boolean {
        return this.selectableItemsSet.has(itemId);
    }

    private getItemsInRange(
        fromItemId: ListViewItemId,
        toItemId: ListViewItemId,
        options: {
            selectableOnly?: boolean,
            enabledOnly?: boolean,
        }
    ): Array<ListViewItemId> {

        const {
            selectableOnly = false,
            enabledOnly = true,
        } = options;

        const navigatableItemsIds = this.navigatableItemsIds;

        const fromIndex = navigatableItemsIds.indexOf(fromItemId);
        const toIndex = navigatableItemsIds.indexOf(toItemId);

        const minIndex = Math.min(fromIndex, toIndex);
        const maxIndex = Math.max(fromIndex, toIndex);

        const navigatableItemsInRange = navigatableItemsIds.slice(minIndex, maxIndex + 1);

        if (selectableOnly || enabledOnly) {
            return navigatableItemsInRange.filter((id) => (!selectableOnly || this.selectableItemsSet.has(id)) &&
                (!enabledOnly || !this.disabledIdsSet.has(id)));
        }
        else {
            return navigatableItemsInRange;
        }
    }

    private isNavigationKeyboardEvent(event: React.KeyboardEvent<Element>): boolean {
        const eventKey = event.key;

        if (this.props.orientation === NavigationOrientation.Vertical) {
            return eventKey === "ArrowDown" || eventKey === "ArrowUp";
        }
        else {
            return eventKey === "ArrowLeft" || eventKey === "ArrowRight";
        }

    }

    public getItemIdByIndex(index: number): ListViewItemId {
        const navigatableItemsIds = this.navigatableItemsIds;

        if (index < navigatableItemsIds.length) {
            return navigatableItemsIds[index];
        }
        else {
            return null;
        }
    }

    private resolveNextFocusedItem(currentNavigatableItemId: ListViewItemId, event: React.KeyboardEvent<Element>): ListViewItemId {

        if (this.isNavigationKeyboardEvent(event))
        {
            const navigatableItemsIdsEnabled = this.navigatableItemsIdsEnabled;

            const focusedItemIndex = navigatableItemsIdsEnabled.indexOf(currentNavigatableItemId);

            if (focusedItemIndex >= 0)
            {
                let nextItemIndex = focusedItemIndex;
                const orientation = this.props.orientation;
                const isVerticalOrientation = orientation === NavigationOrientation.Vertical;
                const isHorizontalOrientation = orientation === NavigationOrientation.Horizontal;

                if( (isVerticalOrientation && event.key === "ArrowDown") ||
                    (isHorizontalOrientation && event.key === "ArrowRight")
                )
                {
                    nextItemIndex++;

                    if (nextItemIndex >= navigatableItemsIdsEnabled.length)
                    {
                        if (this.props.isCyclic)
                        {
                            nextItemIndex = 0;
                        }
                        else
                        {
                            nextItemIndex = navigatableItemsIdsEnabled.length - 1;
                        }
                    }
                }
                else if(
                    (isVerticalOrientation && event.key === "ArrowUp") ||
                    (isHorizontalOrientation && event.key === "ArrowLeft"))
                {
                    nextItemIndex = nextItemIndex - 1;

                    if (nextItemIndex < 0)
                    {
                        if (this.props.isCyclic)
                        {
                            nextItemIndex = navigatableItemsIdsEnabled.length + nextItemIndex;
                        }
                        else
                        {
                            nextItemIndex = 0;
                        }
                    }
                }

                return navigatableItemsIdsEnabled[nextItemIndex];
            }
        }

        return currentNavigatableItemId;
    }

    private resolveNextFocusedItemByTypeAheadText(currentNavigatableItemId: ListViewItemId, typeAheadText: string): ListViewItemId {

        if (typeAheadText) {
            const navigatableItemsIdsEnabled = this.navigatableItemsIdsEnabled;

            const navigatableItemsIdsEnabledLength = navigatableItemsIdsEnabled.length;

            let currentItemIndex = arrayFindIndex(navigatableItemsIdsEnabled, id => id === currentNavigatableItemId);

            let searchStartingIndex;
            if (this.props.typeAheadNavigationType === TypeAheadNavigationType.GoToNext) {
                searchStartingIndex = currentItemIndex >= 0 ? (currentItemIndex + 1) % navigatableItemsIdsEnabledLength : 0;
            }
            else if (this.props.typeAheadNavigationType === TypeAheadNavigationType.StayOnCurrent) {
                searchStartingIndex = currentItemIndex >= 0 ? currentItemIndex : 0;
            }

            for (let i = 0, cursor = searchStartingIndex; i < navigatableItemsIdsEnabledLength; i++, cursor = (cursor + 1) % navigatableItemsIdsEnabledLength) {
                const cursorId = navigatableItemsIdsEnabled[cursor];
                let currentItem = this.navigatableItemsMap.get(cursorId);

                if (typeAheadText) {
                    const itemTypeAheadText = currentItem.typeAheadText;

                    if (itemTypeAheadText && itemTypeAheadText.toLowerCase().startsWith(typeAheadText.toLowerCase())) {
                        return currentItem.id;
                    }
                }
            }
        }

        return null;
    }

}

export type TriggerActionFunction = (data: ListViewItemActionData) => void;






function findEnclosingNavigatableItemElement (htmlElement: HTMLElement, navigationListId: string) {
    return domFindAncestor(
        htmlElement,
        element => element && element.getAttribute('data-navigatable-item') === navigationListId);
}

