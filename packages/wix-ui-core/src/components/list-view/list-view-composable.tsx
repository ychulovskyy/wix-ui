import * as React from 'react';
import {arrayFindIndex, arrayFlatten, domFindAncestor, isTypeAheadKey} from './list-view-utils';
import {
    CommonListViewProps,
    DefaultCommonListViewProps,
    KeyboardNavigationDirection,
    ListViewDataSource,
    ListViewDataSourceItem,
    ListViewItemId,
    ListViewSelectionType,
    ListViewState,
    ListViewStateUpdateFunction,
    NavigationOrientation,
    TypeAheadNavigationType
} from './list-view-types';
import * as ReactUpdatedTypesPolyfill from './react-updated-types-polyfill';
import {ListViewStateController} from './list-view-state-controller';

// -------------------------
// type Context<T> = React.Context<T>;
// const createContext = React.createContext;
type Context<T> = ReactUpdatedTypesPolyfill.Context<T>
const createContext = ((React as any).createContext as ReactUpdatedTypesPolyfill.createContext<ListViewContextData>);
// -------------------------

export const ListViewContext: Context<ListViewContextData> = createContext(null);

export interface ListViewContextData {
    selectedIdsSet: Set<ListViewItemId>,
    disabledIdsSet: Set<ListViewItemId>,
    typeAheadValue: string,
    listView: ListViewComposable,
    currentListViewItemId: ListViewItemId,
    typeAhead: boolean,
    isFocusable: boolean,
    navigationListId: string,
    onListViewItemFocus: (itemId: ListViewItemId) => void,
    handleItemRendered: (itemId: ListViewItemId) => void,
    isItemShouldBeFocusedWhenRendered: (itemId: ListViewItemId) => boolean,
}

export {ListViewItemsView} from './list-view-items-view';

export interface ListViewSharedProps extends CommonListViewProps {
    orientation?: NavigationOrientation,
    keyboardHandler?: (listView: ListViewComposable, event: React.KeyboardEvent<Element>) => boolean;
    onChange?: (event: ListViewState) => void,
}

interface ListViewComposableProps extends ListViewSharedProps {
    dataSourcesArray: Array<ListViewDataSource<any>>,
}

export class ListViewComposable extends React.Component<ListViewComposableProps> {
    static defaultProps = {
        ...DefaultCommonListViewProps,
        keyboardHandler: () => false,
        orientation: NavigationOrientation.Vertical
    };

    private static nextNavigationListId: number = 0;

    private listViewContextData: ListViewContextData;
    private currentTypeAheadTimeOut: number;
    private navigationListId: string = (ListViewComposable.nextNavigationListId++).toString();

    private listViewItemsIds: Array<ListViewItemId> = null;
    private navigatableItemsIds: Array<ListViewItemId> = null;
    private selectableItemsSet: Set<ListViewItemId> = null;
    private listViewItemsMap: Map<ListViewItemId, ListViewDataSourceItem<any>> = null;
    private listViewItemsArray: Array<ListViewDataSourceItem<any>>;
    private disabledIdsSet: Set<ListViewItemId>;
    private selectedIdsSet: Set<ListViewItemId>;

    private itemShouldBeFocusedWhenRendered: ListViewItemId = null;

    private _handleItemRendered = (itemId: ListViewItemId) => {
        if (this.itemShouldBeFocusedWhenRendered === itemId) {
            this.itemShouldBeFocusedWhenRendered = null;
        }
    };

    private _isItemShouldBeFocusedWhenRendered = (itemId: ListViewItemId) => {
        return this.itemShouldBeFocusedWhenRendered === itemId;
    };


    private _onNavigatableItemFocus = (itemId: ListViewItemId) => {

        this.updateState(stateController => {

            if (itemId !== stateController.getCurrentItemId()) {
                stateController.moveToItem(itemId);
            }
        })
    };

    render() {

        let {
            selectedIds,
            disabledIds,
            currentNavigatableItemId,
            children,
            tagName,
            selectionType,
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
            keyboardHandler,
            ...restProps
        } = this.props;

        const disabledIdsSet = this.disabledIdsSet = new Set<ListViewItemId>(this.props.disabledIds);
        const selectedIdsSet = this.selectedIdsSet = new Set<ListViewItemId>(selectedIds);

        const listViewItems = this.listViewItemsArray = arrayFlatten(this.props.dataSourcesArray);
        const navigatableListViewItems = listViewItems
            .filter(listViewItem => !listViewItem.isExcluded && !disabledIdsSet.has(listViewItem.id));

        this.listViewItemsIds = listViewItems.map(item => item.id);
        this.navigatableItemsIds = navigatableListViewItems.map(item => item.id);

        this.selectableItemsSet = new Set(this.listViewItemsArray.filter(item => item.isSelectable).map(item => item.id));
        this.listViewItemsMap = new Map(this.listViewItemsArray.map((item): [ListViewItemId, ListViewDataSourceItem<any>] => [item.id, item]));

        const listViewContextData = this.listViewContextData = {
            selectedIdsSet,
            disabledIdsSet,
            listView: this,
            typeAheadValue,
            currentListViewItemId: currentNavigatableItemId,
            typeAhead,
            isFocusable,
            navigationListId: this.navigationListId,
            onListViewItemFocus: this._onNavigatableItemFocus,
            handleItemRendered: this._handleItemRendered,
            isItemShouldBeFocusedWhenRendered: this._isItemShouldBeFocusedWhenRendered,
        };

        const listViewRootProps = {
            role: 'listbox',
            ...restProps,
            onKeyDown: (event: React.KeyboardEvent<Element>) => {

                if (findEnclosingNavigatableItemElement(event.target as HTMLElement, this.navigationListId)) {
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

    public updateState(updateFunction: ListViewStateUpdateFunction) {

        const stateController = new ListViewStateController(this);

        updateFunction(stateController);

        stateController.done();
    }

    componentDidUpdate(prevProps: ListViewComposableProps) {
        const self = this;

        const forceRenderNavigatableItem = this.props.forceRenderNavigatableItem;

        if (forceRenderNavigatableItem) {
            const prevCurrentNavigatableItemId = prevProps.currentNavigatableItemId;
            const updatedCurrentNavigatableItemId = this.props.currentNavigatableItemId;

            if (updatedCurrentNavigatableItemId && prevCurrentNavigatableItemId !== updatedCurrentNavigatableItemId) {
                const activeElement = document.activeElement;

                if (activeElement instanceof HTMLElement) {
                    const navigationListId = this.navigationListId;

                    if (findEnclosingNavigatableItemElement(activeElement, navigationListId)) {
                        this.itemShouldBeFocusedWhenRendered = updatedCurrentNavigatableItemId;
                        forceRenderNavigatableItem(updatedCurrentNavigatableItemId);
                    }
                }
            }
        }

        const typeAheadClearTimeout = this.props.typeAheadClearTimeout;
        const useTypeAhead = this.props.typeAhead;

        if (typeAheadClearTimeout && useTypeAhead) {
            if (prevProps.typeAheadValue !== this.props.typeAheadValue) {
                window.clearTimeout(self.currentTypeAheadTimeOut);
                self.currentTypeAheadTimeOut = window.setTimeout(() => {
                    window.clearTimeout(self.currentTypeAheadTimeOut);
                    self.props.onChange({
                        typeAheadValue: '',
                        selectionStartId: self.props.selectionStartId,
                        selectedIds: self.props.selectedIds,
                        disabledIds: self.props.disabledIds,
                        currentNavigatableItemId: self.props.currentNavigatableItemId,
                    });
                }, typeAheadClearTimeout);
            }
        }
    }

    public getListViewItemById(listViewItemId: ListViewItemId) {
        return this.listViewItemsMap.get(listViewItemId);
    }

    public containsItem(listViewItmId: ListViewItemId) {
        return this.listViewItemsMap.has(listViewItmId);
    }


    public moveToItemBasedOnTypeAhead = (updatedTypeAheadValue: string, options: { selectItem: boolean } = {selectItem: true}): void => {
        const {
            selectItem,
        } = options;

        this.updateState(stateController => {

            stateController
                .setTypeAheadValue(updatedTypeAheadValue)
                .navigateToItemBasedOnCurrentTypeAhead(selectItem);
        });
    };

    public isMultiSelection = () : boolean => {
        return this.props.selectionType === ListViewSelectionType.Multiple;
    };

    public isSingleSelection = () : boolean => {
        return this.props.selectionType === ListViewSelectionType.Single;
    };

    public isNotSupportingSelection = () : boolean => {
        return this.props.selectionType === ListViewSelectionType.None;
    };

    public isSupportingSelection = () : boolean => {
        return this.props.selectionType !== ListViewSelectionType.None;
    };

    public handleKeyboardEvent = (event: React.KeyboardEvent<Element>): void => {
        const isHandled = this.props.keyboardHandler(this, event);

        if (!isHandled) {
            const {
                currentNavigatableItemId,
                selectionStartId,
                typeAhead,
                typeAheadValue,
                orientation,
            } = this.props;

            const eventKey = event.key;

            if (isSelectAllEvent(event)) {
                if (this.isMultiSelection())
                {
                    this.updateState(stateController => {
                        let navigatableItemsLength = this.navigatableItemsIds.length;
                        stateController.selectItemsInRange(this.navigatableItemsIds[0], this.navigatableItemsIds[navigatableItemsLength - 1]);

                    });

                    event.preventDefault();
                }
            }
            else if (isHomeEvent(event)) {
                this.updateState(stateController => {

                    const firstItemId = this.navigatableItemsIds[0];

                    if (isSelectToHomeEvent(event) && this.isMultiSelection())
                    {
                        stateController.selectItemsInRange(firstItemId, stateController.getSelectionStartId());
                    }
                    else if (this.isSingleSelection())
                    {
                        stateController.selectItem(firstItemId);
                    }

                    stateController.moveToItem(firstItemId);

                });

                event.preventDefault();
            }
            else if (isEndEvent(event)) {
                this.updateState(stateController => {

                    let navigatableItemsLength = this.navigatableItemsIds.length;
                    const lastItemId = this.navigatableItemsIds[navigatableItemsLength - 1];

                    if (isSelectToEndEvent(event) && this.isMultiSelection())
                    {
                        stateController.selectItemsInRange(stateController.getSelectionStartId(), lastItemId);
                    }
                    else if (this.isSingleSelection())
                    {
                        stateController.selectItem(lastItemId);
                    }

                    stateController.moveToItem(lastItemId);
                });

                event.preventDefault();
            }
            else if (isSpaceKeyEvent(event)) {
                this.handleSpaceKeyboardEvent(event);

                event.preventDefault();
            }
            else if (isTypeAheadKey(event)) {
                if (typeAhead) {
                    let updatedTypeAheadValue = typeAheadValue;

                    this.updateState((stateController => {
                        if (!updatedTypeAheadValue) {
                            updatedTypeAheadValue = '';
                        }

                        updatedTypeAheadValue += eventKey;

                        stateController
                            .setTypeAheadValue(updatedTypeAheadValue)
                            .navigateToItemBasedOnCurrentTypeAhead(true);
                    }));
                }
            }
            else {
                const navigationDirection = this.getNavigationDirectionFromEvent(event);
                if (navigationDirection) {
                    this.handleKeyboardNavigation(navigationDirection, event);
                    event.preventDefault();
                }
            }
        }
    };

    private getNavigationDirectionFromEvent(event: React.KeyboardEvent<Element>) {
        const {
            orientation,
        } = this.props;

        const eventKey = event.key;

        let navigationDirection;
        if (orientation === NavigationOrientation.Vertical) {
            if (eventKey === 'ArrowDown') {
                navigationDirection = KeyboardNavigationDirection.Forward;
            }
            else if (eventKey === 'ArrowUp') {
                navigationDirection = KeyboardNavigationDirection.Backward;
            }
        }
        else {
            if (eventKey === 'ArrowRight') {
                navigationDirection = KeyboardNavigationDirection.Forward;
            }
            else if (eventKey === 'ArrowLeft') {
                navigationDirection = KeyboardNavigationDirection.Backward;
            }
        }

        return navigationDirection;
    }

    // ---------------------------------------------------------

    public isSelectable(itemId: ListViewItemId): boolean {
        return this.selectableItemsSet.has(itemId);
    }

    public isDisabled(itemId: ListViewItemId): boolean {
        return this.disabledIdsSet.has(itemId);
    }

    public isSelected(itemId: ListViewItemId): boolean {
        return this.selectedIdsSet.has(itemId);
    }

    public getItemsInRange(
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

        const navigatableItemsIds = this.listViewItemsIds;

        const fromIndex = navigatableItemsIds.indexOf(fromItemId);
        const toIndex = navigatableItemsIds.indexOf(toItemId);

        const minIndex = Math.min(fromIndex, toIndex);
        const maxIndex = Math.max(fromIndex, toIndex);

        const navigatableItemsInRange = navigatableItemsIds.slice(minIndex, maxIndex + 1);

        if (selectableOnly || enabledOnly) {
            return navigatableItemsInRange.filter(id => (!selectableOnly || this.selectableItemsSet.has(id)) &&
                (!enabledOnly || !this.disabledIdsSet.has(id)));
        }
        else {
            return navigatableItemsInRange;
        }
    }

    public getItemIdByIndex(index: number): ListViewItemId {
        const navigatableItemsIds = this.listViewItemsIds;

        if (index < navigatableItemsIds.length) {
            return navigatableItemsIds[index];
        }
        else {
            return null;
        }
    }

    public getCurrentItemId() {
        return this.props.currentNavigatableItemId;
    }

    public handleKeyboardNavigation(direction: KeyboardNavigationDirection, event: React.KeyboardEvent<Element>) {

        this.updateState(stateController => {
            let currentItemId = stateController.getCurrentItemId();
            if (currentItemId === null || currentItemId === undefined) {
                stateController.moveToItem(this.getItemIdByIndex(0));
            }
            else {
                if (direction === KeyboardNavigationDirection.Forward) {
                    stateController.moveNext();
                }
                else {
                    stateController.movePrev();
                }
            }

            // if only ctrl pressed don't select , only navigate
            if (event.ctrlKey && !event.shiftKey) {
                // do nothing, prev code was navigating to next focused item based on the keyboard key
            }
            else
            {
                if (this.isMultiSelection())
                {
                    // when ctrl & shift pressed always add to selection
                    if (event.ctrlKey && event.shiftKey) {
                        stateController.addItemsInRangeToSelection(stateController.getSelectionStartId(), stateController.getCurrentItemId());
                    }
                    // if only shift pressed select range to new current item
                    else if (event.shiftKey) {
                        stateController.selectItemsInRange(stateController.getSelectionStartId(), stateController.getCurrentItemId());
                    }
                    // if no ctrl or shift press try to select next item
                    else {
                        stateController.selectItem(stateController.getCurrentItemId(), {
                            clearSelectionWhenNotSelectable: true
                        });
                    }
                }
                else if (this.isSingleSelection())
                {
                    stateController.selectItem(stateController.getCurrentItemId(), {
                        clearSelectionWhenNotSelectable: true
                    });
                }
            }
        });
    }

    public getNextEnabledItemId(itemId: ListViewItemId): ListViewItemId {

        const navigatableItemsIdsEnabled = this.navigatableItemsIds;

        const focusedItemIndex = navigatableItemsIdsEnabled.indexOf(itemId);

        if (focusedItemIndex >= 0) {
            let nextItemIndex = focusedItemIndex;

            nextItemIndex++;

            if (nextItemIndex >= navigatableItemsIdsEnabled.length) {
                if (this.props.isCyclic) {
                    nextItemIndex = 0;
                }
                else {
                    nextItemIndex = navigatableItemsIdsEnabled.length - 1;
                }
            }

            return navigatableItemsIdsEnabled[nextItemIndex];
        }

        return;
    }

    public getPrevEnabledItemId(itemId: ListViewItemId): ListViewItemId {

        const navigatableItemsIdsEnabled = this.navigatableItemsIds;

        const focusedItemIndex = navigatableItemsIdsEnabled.indexOf(itemId);

        if (focusedItemIndex >= 0) {
            let nextItemIndex = focusedItemIndex;

            nextItemIndex--;

            if (nextItemIndex < 0) {
                if (this.props.isCyclic) {
                    nextItemIndex = navigatableItemsIdsEnabled.length + nextItemIndex;
                }
                else {
                    nextItemIndex = 0;
                }
            }

            return navigatableItemsIdsEnabled[nextItemIndex];
        }

        return;
    }

    public resolveNextFocusedItemByTypeAheadText(currentNavigatableItemId: ListViewItemId, typeAheadText: string): ListViewItemId {

        if (typeAheadText) {
            const navigatableItemsIdsEnabled = this.navigatableItemsIds;

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
                let currentItem = this.listViewItemsMap.get(cursorId);

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

    private handleSpaceKeyboardEvent(event: React.KeyboardEvent<Element>) {

        this.updateState(stateController => {

            if (this.isSupportingSelection() && this.isSelectable(stateController.getCurrentItemId())) {

                if (this.isSingleSelection())
                {
                    // TODO:: add support in last ctrl + shift behaviour based on last space (space is toggling betaween select to unselect)
                    if (event.ctrlKey && event.shiftKey) {
                        stateController.selectItem(stateController.getCurrentItemId());
                    }
                    if (event.ctrlKey) {
                        stateController.toggleItemSelection(stateController.getCurrentItemId());
                    }
                    else {
                        stateController.selectItem(stateController.getCurrentItemId());
                    }
                }
                else if (this.isMultiSelection())
                {
                    // when ctrl & shift pressed always add to selection
                    // TODO:: add support in last ctrl + shift behaviour based on last space (space is toggling betaween select to unselect)
                    if (event.ctrlKey && event.shiftKey) {
                        stateController.addItemsInRangeToSelection(stateController.getSelectionStartId(), stateController.getCurrentItemId());
                    }
                    if (event.shiftKey) {
                        stateController.selectItemsInRange(stateController.getSelectionStartId(), stateController.getCurrentItemId());
                    }
                    else if (event.ctrlKey) {
                        stateController.toggleItemSelection(stateController.getCurrentItemId());
                    }
                    else {
                        stateController.addItemToSelection(stateController.getCurrentItemId());
                    }
                }
            }

        });
    }


}

function isHomeEvent(event) {
    const eventKey = event.key;
    return (eventKey && eventKey.toLowerCase() === 'home')
}

function isEndEvent(event) {
    const eventKey = event.key;
    return (eventKey && eventKey.toLowerCase() === 'end')
}

function isSelectToHomeEvent(event) {
    const eventKey = event.key;
    return isHomeEvent(event) && event.shiftKey && (!event.ctrlKey && !event.altKey);
}

function isSelectToEndEvent(event) {
    const eventKey = event.key;
    return isEndEvent(event) && event.shiftKey && (!event.ctrlKey && !event.altKey);
}

function isSelectAllEvent(event) {
    const eventKey = event.key;
    return event.ctrlKey && (!event.shiftKey && !event.altKey) && (eventKey && eventKey.toLowerCase() === 'a');
}

function isSpaceKeyEvent(event) {
    const eventKey = event.key;

    return eventKey === ' ';
}

export type TriggerInteractiveSelectionFunction = (event: React.MouseEvent<Element>) => void;


function findEnclosingNavigatableItemElement(htmlElement: HTMLElement, navigationListId: string) {
    return domFindAncestor(
        htmlElement,
        element => element && element.getAttribute('data-navigatable-item') === navigationListId);
}