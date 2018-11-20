import {
    EqualityComparer,
    ListViewItemId, ListViewItemMetadata,
    ListViewRenderItem, ListViewSelectionType,
    ListViewState, NavigationOrientation, TypeAheadStrategy
} from "../list-view-types";
import {mount, ReactWrapper} from "enzyme";
import {ListView, ListViewProps} from "../list-view";
import * as React from "react";
import Mock = jest.Mock;
import {ListViewItemViewWrapper} from "../list-view-item-view-wrapper";
import {ReactElement} from "react";

type ListViewDataSourceItemTemplate = ListViewItemMetadata | ReactElement<any>;

interface ExtractedListViewInfo
{
    listViewState: Partial<ListViewState>,
    listViewDataSource: Array<ListViewDataSourceItemTemplate>
}

const isSelectedRegex = /^(?:S|SELECTED)\(([^)]+)\)$/;
const isDisabledRegex = /^(?:D|DISABLED)\(([^)]+)\)$/;
const isCurrentRegex = /^<([^)]+)>$/;
const isSelectionStartRegex = /^{([^)]+)}$/;
const isCurrentAndSelectionStartRegex = /^(?:{<([^)]+)>})|(?:<{([^)]+)}>)$/;

function extractItemStatus (regex, str) {

    regex.lastIndex = 0;

    const result = regex.exec(str);

    if (result)
    {
        return [true, result[2] !== undefined ? result[2] : result[1]]
    }
    else
    {
        return [false, str];
    }
}


function normalizeListViewInfoStr (str) {

    const supportedItemWrappers = ['Y','<Y>', '{Y}', '<{Y}>', '{<Y>}'];
    const supportedItems = ['X','NX','--'];
    const supportedFuncNames = ['D', 'S', 'DISABLED', 'SELECTED'];

    const combinations = [];
    for (let wrapper of supportedItemWrappers)
    {
        for (let item of supportedItems)
        {
            combinations.push('(?:' + wrapper.replace('Y', item) + ')')
        }
    }

    const itemRegexStr = '(?:' + combinations.join('|') + ')';
    const funcNamesRegexStr = supportedFuncNames.map(funcName => `(?:${funcName})`).join('|');

    const selectionRangeMatchRegexStr = `(${funcNamesRegexStr})\\(\\s*(${itemRegexStr}(?:\\s*,\\s*${itemRegexStr})*)\\s*\\)`;

    const regex = new RegExp(selectionRangeMatchRegexStr, 'g');

    return str.replace(regex, (match, funcName, matchingItemsStr) => {
        const matchingItemsArr = matchingItemsStr.split(',');

        return matchingItemsArr.map(matchingItem => funcName + '(' + matchingItem.trim() + ')').join(',');
    })
}

/*
    Extracts list view data source and state from string, according to the following legend:

    X => Selectable List View Item
    NX => Non Selectable List View Item
    -- => An element that's not a list view item (usually a separator)
    {X} => SelectionStart - Optional - must appear at most one time in the string
    <X|NX> => Current - Optional - must appear at most one time in the string
    S(X,...,X) | SELECTED(X,...,X) => Range of selection - Can't Wrap non selectable or disabled items.
    D(X|NX,...,X|NX) | DISABLED(X|NX,...,X|NX) => Range of disabled items - can't wrap selected items.

    Example:
        X,S({X},X,X),NX,--,D(X,NX),<X>
*/
export function parseListViewInfo (str) : ExtractedListViewInfo {
    const normalizedListViewInfoStr = normalizeListViewInfoStr(str);

    const splittedListViewInfo = normalizedListViewInfoStr.split(',').map(item => item.trim());

    let nextItemId = 0;
    const listViewDataSource = [];
    const selectedIds = [];
    const disabledIds = [];
    let selectionStartId = null;
    let currentItemId = null;

    for (var i = 0; i < splittedListViewInfo.length; i++)
    {
        const listViewItemInfoStr = splittedListViewInfo[i];

        if (listViewItemInfoStr === '--')
        {
            listViewDataSource.push(<div className="separator"/>);
        }
        else
        {
            let plainListViewItemInfoStr = listViewItemInfoStr;
            let isSelected;
            let isDisabled;

            let isCurrent;
            let isSelectionStart;
            let isCurrentAndSelectionStart;

            [isSelected, plainListViewItemInfoStr] = extractItemStatus(isSelectedRegex, plainListViewItemInfoStr);
            [isDisabled, plainListViewItemInfoStr] = extractItemStatus(isDisabledRegex, plainListViewItemInfoStr);
            [isCurrentAndSelectionStart, plainListViewItemInfoStr] = extractItemStatus(isCurrentAndSelectionStartRegex, plainListViewItemInfoStr);

            if (isCurrentAndSelectionStart)
            {
                isCurrent = true;
                isSelectionStart = true;
            }
            else
            {
                [isCurrent, plainListViewItemInfoStr] = extractItemStatus(isCurrentRegex, plainListViewItemInfoStr);
                [isSelectionStart, plainListViewItemInfoStr] = extractItemStatus(isSelectionStartRegex, plainListViewItemInfoStr);
            }

            const itemId = nextItemId++;

            if (isSelected)
            {
                selectedIds.push(itemId);
            }

            if (isDisabled)
            {
                disabledIds.push(itemId);
            }

            if (isSelectionStart)
            {
                if (selectionStartId !== null)
                {
                    throw new Error(`Selection start was set on both items ${selectionStartId} and ${itemId}`);
                }

                selectionStartId = itemId;
            }

            if (isCurrent)
            {
                if (currentItemId !== null)
                {
                    throw new Error(`Current item was set both for item ${currentItemId} and ${itemId}`);
                }

                currentItemId = itemId;
            }

            const isSelectable = plainListViewItemInfoStr === 'X';

            if (!isSelectable && isSelected)
            {
                throw new Error(`Unselectable item ${itemId} marked as selection`);
            }

            if (isDisabled && isSelectionStart)
            {
                throw new Error(`Disabled item ${itemId} can't be marked as selection start`);
            }

            if (isDisabled && isCurrent)
            {
                throw new Error(`Disabled item ${itemId} can't be marked as current`);
            }

            listViewDataSource.push({
                id: itemId,
                isSelectable: isSelectable
            });
        }
    }

    return {
        listViewState: {
            selectedIds,
            selectionStartId,
            disabledIds,
            currentNavigatableItemId: currentItemId,
        },
        listViewDataSource
    };
}

type GenerateItemFunc<T> = (id: ListViewItemId) => {dataItem: T, typeAheadText: string | null};

interface ListViewTesterOptions<T,S>
{
    renderItem: ListViewRenderItem<T, S>,
    generateItem: GenerateItemFunc<T>,
    dataItemEqualityComparer?: EqualityComparer<T>;
}

class ExpectedListViewInfo
{
    private _ignoreSelectionStart: boolean = false;
    private _ignoreCurrentItem: boolean = false;

    constructor (private extractedListViewInfo: ExtractedListViewInfo) {

    }

    ignoreSelectionStart () {
        this._ignoreSelectionStart = true;
        return this;
    }

    ignoreCurrentItem () {
        this._ignoreCurrentItem = true;
        return this;
    }

    getExtractedListViewInfo () {
        return this.extractedListViewInfo;
    }

    shouldIgnoreSelectionStart () {
        return this._ignoreSelectionStart;
    }

    shouldIgnoreCurrentItem () {
        return this._ignoreCurrentItem;
    }
}

export function expectListViewInfo (extractedListViewInfo: ExtractedListViewInfo) {
    return new ExpectedListViewInfo(extractedListViewInfo);
}

interface TestListViewOptions<T,S>
{
    testedInput: ExtractedListViewInfo,
    expectedOutput: ExtractedListViewInfo | ExpectedListViewInfo,
    testExecution: (listViewTestingController: ListViewTestingController<T, S>) => void,
    orientation?: NavigationOrientation,
    contextArg?: S,
    contextArgEqualityComparer?: EqualityComparer<S>,
    isCyclic?: boolean,
    typeAheadStrategy?: TypeAheadStrategy,
    selectionType?: ListViewSelectionType,
}

export class ListViewTester<T,S>
{
    private renderItem: ListViewRenderItem<T, S>;
    private generateItem: GenerateItemFunc<T>;
    private dataItemEqualityComparer?: EqualityComparer<T> = undefined;

    constructor (options: ListViewTesterOptions<T,S>) {
        this.renderItem = options.renderItem;
        this.generateItem = options.generateItem;
        this.dataItemEqualityComparer = options.dataItemEqualityComparer;
    }

    testListView (options: TestListViewOptions<T,S>) {
        const {
            testedInput,
            expectedOutput,
            testExecution,
            ...listViewProps
        } = options;

        const {
            listViewState,
            listViewDataSource
        } = testedInput;

        let extractedListViewInfo;
        let shouldIgnoreSelectionStart: boolean = false;
        let shouldIgnoreCurrentItem: boolean = false;

        if (expectedOutput instanceof ExpectedListViewInfo)
        {
            extractedListViewInfo = expectedOutput.getExtractedListViewInfo();
            shouldIgnoreSelectionStart = expectedOutput.shouldIgnoreSelectionStart();
            shouldIgnoreCurrentItem = expectedOutput.shouldIgnoreCurrentItem();
        }
        else
        {
            extractedListViewInfo = expectedOutput;
        }

        const {
            listViewState: expectedListViewState
        } = extractedListViewInfo;

        if (shouldIgnoreSelectionStart)
        {
            delete expectedListViewState.selectionStartId;
        }

        if (shouldIgnoreCurrentItem)
        {
            delete expectedListViewState.currentNavigatableItemId;
        }


        const onChange = jest.fn(listViewState => {
        });

        const listView = mount(
            <ListView
                {...listViewProps}
                renderItem={this.renderItem}
                listViewState={listViewState}
                onChange={onChange}
                dataItemEqualityComparer={this.dataItemEqualityComparer}
            >
                {listViewDataSource.map(dataSourceItem => {

                    if (React.isValidElement(dataSourceItem))
                    {
                        return dataSourceItem;
                    }
                    else
                    {
                        const dataItemInfo = this.generateItem((dataSourceItem as ListViewItemMetadata).id);

                        return {
                            ...dataSourceItem,
                            ...dataItemInfo
                        }
                    }
                })}
            </ListView>
        );

        const listViewTestingController = createListViewTestingController<T,S>(listView);

        testExecution(listViewTestingController);

        expectStateChange(onChange, expectedListViewState);
    }

}

class ListViewTestingController<T, S>
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

    getListView () {
        return this.listView;
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

export function createListViewTestingController<T, S> (listViewWrapper: ReactWrapper<ListViewProps<T, S>>) {
    return new ListViewTestingController<T, S>(listViewWrapper);
}

expect.extend({
    toHaveSameItems(receivedArr, targetArr) {

        let pass = false;

        if (!receivedArr || !targetArr)
        {
            pass = receivedArr === targetArr;
        }
        else if (receivedArr.length === targetArr.length)
        {
            const targetSet = new Set(targetArr);

            pass = true;

            for (let item of receivedArr)
            {
                if (!targetSet.has(item))
                {
                    pass = false;
                    break;
                }
            }
        }

        return {
            message: () =>
                `expected ${receivedArr} to have the same items as ${targetArr}`,
            pass: pass,
        }
    },
});

function expectStateChange(onChangeMock: Mock, expectedListViewState: Partial<ListViewState>) {
    expect(onChangeMock).toHaveBeenCalledTimes(1);

    const {
        selectedIds: expectedSelectedIds,
        disabledIds: expectedDisabledIds,
        ...expectedShallowListViewStateProps
    } = expectedListViewState;

    const calls = onChangeMock.mock.calls;
    const singleCall = calls[0];
    const updatedState = singleCall[0];


    if (expectedSelectedIds !== undefined) {
        expect(expectedSelectedIds).toHaveSameItems(updatedState.selectedIds);
    }

    if (expectedDisabledIds !== undefined) {
        expect(expectedDisabledIds).toHaveSameItems(updatedState.disabledIds);
    }

    expect(onChangeMock).toBeCalledWith(expect.objectContaining(expectedShallowListViewStateProps));
}