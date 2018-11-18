import * as React from 'react';
import {times, partition, find} from 'lodash';
import {createDriver, SimulateCtrlKey, SimulateCtrlShiftKey, SimulateShiftKey} from './list-view.driver';
import {mount} from "enzyme";
import {ListView} from "../list-view";
import {
    ListViewDataSourceDataItem,
    ListViewDefaultState,
    ListViewItemId,
    ListViewRenderItemProps,
    ListViewSelectionType,
    ListViewState
} from "../list-view-types";
import Mock = jest.Mock;

expect.extend({
    toHaveSameItems (receivedArr, targetArr) {

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


enum Keys
{
    ArrowDown = 'ArrowDown',
    ArrowUp = 'ArrowUp',
    ArrowLeft = 'ArrowLeft',
    ArrowRight = 'ArrowRight',
    Home = 'Home',
    End = 'End',
    Space = ' '
}

describe('ListView', () => {

    const dataSourceItemsCount = 12;

    let listViewDriver;
    let listView;
    let renderItem;
    let onChange;

    let listViewTestCasesArr;

    const firstItemId = 1;
    const lastItemId = dataSourceItemsCount;

    const selectableItemsDataSource = times(dataSourceItemsCount, index => {
        const id = index + 1;

        return {
            id: id,
            isSelectable: true,
            dataItem: {
                text: `Item ${id}`
            }
        }
    });

    // We'll create a data source that will contain items for ListView.
    // Items with odd ids will be selectable and the others will be only "navigatable"
    const alternatingDataSource = times(dataSourceItemsCount, index => {
        const id = index + 1;

        return {
            id: id,
            isSelectable: id % 2 !== 0 ,
            dataItem: {
                text: `Item ${id}`
            }
        }
    });

    // We'll split the data source to 2 equal groups
    const [group1, group2] = partition(alternatingDataSource, item => item.id <= dataSourceItemsCount / 2);

    onChange = jest.fn(listViewState => {
        listViewDriver.updateState(listViewState);
    });

    renderItem = jest.fn(createListViewItem);

    listView = mount(
        <ListView
            renderItem={renderItem}
            listViewState={ListViewDefaultState}
            onChange={onChange}
        >
            <div/>
        </ListView>
    );

    listViewDriver = createDriver(listView);

    listViewTestCasesArr = [
        {
            title: "Alternating data source splitted to 2 groups with separator between them",
            dataSource: alternatingDataSource,
            getChildren () {
                return [
                    group1,
                    <div className="separator"/>,
                    group2
                ]
            },
            getNonNavigatableItem (listView) {
                return listView.find('.separator');
            }
        },
        {
            title: "Alternating data source surrounded with header and footer",
            dataSource: alternatingDataSource,
            getChildren () {
                return [
                    <div className="header"/>,
                    alternatingDataSource,
                    <div className="footer"/>
                ]
            },
            getNonNavigatableItem (listView) {
                return listView.find('.footer');
            }
        },
        {
            title: "Selectable Items DataSource",
            dataSource: selectableItemsDataSource,
            getChildren () {
                return selectableItemsDataSource
            },
            getNonNavigatableItem (listView) {

            }
        }
    ];

    beforeEach(() => {
        onChange.mockClear();
        renderItem.mockClear();
    });

    for (let testCase of listViewTestCasesArr) {
        const {
            dataSource,
            title,
            getChildren,
            getNonNavigatableItem
        } = testCase;

        describe (`ListView test-case '${title}'`, () => {

            let separator;

            beforeAll(() => {
                listView.setProps({
                    children: getChildren()
                });

                separator = getNonNavigatableItem(listView);
            });

            describe(`ListView mouse interaction`, () => {
                describe('ListView with single selection', () => {

                    beforeAll(() => {
                        listView.setProps({
                            selectionType: ListViewSelectionType.Single,
                            listViewState: ListViewDefaultState
                        });
                    });

                    const firstItemId = getItemIdByIndex(dataSource, 0);
                    const secondItemId = getItemIdByIndex(dataSource, 1);

                    it(`User clicked the first item`, () => {

                        listViewDriver.itemClick(firstItemId);

                        expectStateChange(onChange, {
                            selectedIds: isSelectableItem(dataSource, firstItemId) ? [firstItemId] : [],
                            currentNavigatableItemId: firstItemId,
                        });
                    });

                    it(`User clicked the second item`, () => {

                        listViewDriver.itemClick(secondItemId);

                        const itemIsSelectable = isSelectableItem(dataSource, secondItemId);

                        expectStateChange(onChange, {
                            selectedIds: itemIsSelectable ? [secondItemId] : listViewDriver.getSelectedIds(),
                            currentNavigatableItemId: secondItemId,
                        });
                    });

                    if (separator)
                    {
                        it (`User clicked on a non-selectable item`, () => {

                            separator.simulate('click');

                            expectNoStateChange(onChange)
                        });
                    }

                    it(`Should ignore ctrl/shift key combinations when item should be selected as a result of a mouse clicke`, () => {

                        const keysCombinationsArr = [
                            SimulateCtrlKey,
                            SimulateCtrlShiftKey,
                            SimulateShiftKey
                        ];

                        for (let keysCombination of keysCombinationsArr)
                        {
                            listViewDriver.itemClick(1);

                            onChange.mockClear();
                            renderItem.mockClear();

                            listViewDriver.itemClick(3, keysCombination);

                            expectStateChange(onChange, {
                                selectedIds: [3],
                                selectionStartId: 3,
                                currentNavigatableItemId: 3,
                            });
                        }

                    });
                });

                describe('ListView with multiple selection', () => {

                    beforeAll(() => {
                        listView.setProps({
                            selectionType: ListViewSelectionType.Multiple,
                            listViewState: ListViewDefaultState
                        });
                    });

                    it(`Should select a selectable item when it's clicked`, () => {

                        listViewDriver.itemClick(1);

                        expectStateChange(onChange, {
                            selectedIds: [1],
                            selectionStartId: 1,
                            currentNavigatableItemId: 1,
                        });

                        expectRerendering(renderItem, [
                            {
                                dataItemId: 1,
                                isSelected: true,
                                isCurrent: true
                            }
                        ])
                    });

                    it(`Should add to selection when a different selectable item is clicked with ctrl`, () => {
                        listViewDriver.itemClick(3, SimulateCtrlKey);

                        expectStateChange(onChange, {
                            selectedIds: [1,3],
                            selectionStartId: 3,
                            currentNavigatableItemId: 3,
                        });

                        expectRerendering(renderItem, [
                            {
                                dataItemId: 1,
                                isSelected: true,
                                isCurrent: false
                            },
                            {
                                dataItemId: 3,
                                isSelected: true,
                                isCurrent: true
                            }
                        ])
                    });

                    it (`Should move the current item but leaves the selection intact when clicking witch ctrl a non selectable item.`, () => {

                        listViewDriver.itemClick(2, SimulateCtrlKey);

                        expectStateChange(onChange, {
                            selectedIds: [1,3],
                            selectionStartId: 3,
                            currentNavigatableItemId: 2,
                        });

                        expectRerendering(renderItem, [
                            {
                                dataItemId: 2,
                                isSelected: false,
                                isCurrent: true
                            },
                            {
                                dataItemId: 3,
                                isSelected: true,
                                isCurrent: false
                            }
                        ])
                    });

                    it(`Should remove from selection when a selected item is clicked with ctrl`, () => {
                        listViewDriver.itemClick(3, SimulateCtrlKey);

                        expectStateChange(onChange, {
                            selectedIds: [1],
                            selectionStartId: 3,
                            currentNavigatableItemId: 3,
                        });

                        expectRerendering(renderItem, [
                            {
                                dataItemId: 2,
                                isSelected: false,
                                isCurrent: false
                            },
                            {
                                dataItemId: 3,
                                isSelected: false,
                                isCurrent: true
                            }
                        ])
                    });

                    it(`Should keep current selection and add to selection selectable items from selection start to clicked item when item is clicked with ctrl+shift`, () => {
                        listViewDriver.itemClick(7, SimulateCtrlShiftKey);

                        expectStateChange(onChange, {
                            selectedIds: [1, 3, 5, 7],
                            selectionStartId: 3,
                            currentNavigatableItemId: 7,
                        });

                        expectRerendering(renderItem, [
                            {
                                dataItemId: 3,
                                isSelected: true,
                                isCurrent: false
                            },
                            {
                                dataItemId: 5,
                                isSelected: true,
                                isCurrent: false
                            },
                            {
                                dataItemId: 7,
                                isSelected: true,
                                isCurrent: true
                            }
                        ])
                    });

                    it(`Should select all selectable items in range between selection start to last clicked item when item is clicked with shift`, () => {
                        listViewDriver.itemClick(11, SimulateShiftKey);

                        expectStateChange(onChange, {
                            selectedIds: [3, 5, 7, 9, 11],
                            selectionStartId: 3,
                            currentNavigatableItemId: 11,
                        });

                        expectRerendering(renderItem, [
                            {
                                dataItemId: 1,
                                isSelected: false,
                                isCurrent: false
                            },
                            {
                                dataItemId: 7,
                                isSelected: true,
                                isCurrent: false
                            },
                            {
                                dataItemId: 9,
                                isSelected: true,
                                isCurrent: false
                            },
                            {
                                dataItemId: 11,
                                isSelected: true,
                                isCurrent: true
                            }
                        ])
                    });

                    it(`Should unselect all selectable items and select only clicked item`, () => {
                        listViewDriver.itemClick(1);

                        expectStateChange(onChange, {
                            selectedIds: [1],
                            selectionStartId: 1,
                            currentNavigatableItemId: 1,
                        });

                        expectRerendering(renderItem, [
                            {
                                dataItemId: 1,
                                isSelected: true,
                                isCurrent: true
                            },
                            {
                                dataItemId: 3,
                                isSelected: false,
                                isCurrent: false
                            },
                            {
                                dataItemId: 5,
                                isSelected: false,
                                isCurrent: false
                            },
                            {
                                dataItemId: 7,
                                isSelected: false,
                                isCurrent: false
                            },
                            {
                                dataItemId: 9,
                                isSelected: false,
                                isCurrent: false
                            },
                            {
                                dataItemId: 11,
                                isSelected: false,
                                isCurrent: false
                            }
                        ])
                    });
                });

                describe('ListView with none selection', () => {

                    beforeAll(() => {
                        listView.setProps({
                            selectionType: ListViewSelectionType.None,
                            listViewState: ListViewDefaultState
                        });
                    });

                    it(`Should not select a selectable item when it's clicked`, () => {

                        listViewDriver.itemClick(1);

                        expectStateChange(onChange, {
                            selectedIds: null,
                            selectionStartId: null,
                            currentNavigatableItemId: 1,
                        });

                        expectRerendering(renderItem, [
                            {
                                dataItemId: 1,
                                isSelected: false,
                                isCurrent: true
                            }
                        ])
                    });

                    it(`Should change current Navigatable when a different item is clicked and keep selectionStartId as null`, () => {
                        listViewDriver.itemClick(3);

                        expectStateChange(onChange, {
                            selectedIds: null,
                            selectionStartId: null,
                            currentNavigatableItemId: 3,
                        });

                        expectRerendering(renderItem, [
                            {
                                dataItemId: 1,
                                isSelected: false,
                                isCurrent: false
                            },
                            {
                                dataItemId: 3,
                                isSelected: false,
                                isCurrent: true
                            }
                        ])
                    });
                });
            });

            const testedSelectionTypes = [
                {
                    selectionType: ListViewSelectionType.Multiple,
                    title: "Multiple Selection"
                },
                {
                    selectionType: ListViewSelectionType.Single,
                    title: "Single Selection"
                },
            ];

            for (var selectionTypeInfo of testedSelectionTypes)
            {
                (function (selectionTypeInfo) {

                    describe(`ListView basic keyboard interaction with ${selectionTypeInfo.title}`, () => {

                        beforeAll(() => {
                            listView.setProps({
                                selectionType: selectionTypeInfo.selectionType,
                                listViewState: ListViewDefaultState
                            });
                        });

                        it (`Should select the first item when ArrowDown is pressed`, () => {

                            const firstItemId = getItemIdByIndex(dataSource, 0);

                            listViewDriver.listKeyDown(Keys.ArrowDown);

                            expectStateChange(onChange, {
                                selectedIds: isSelectableItem(dataSource, firstItemId) ? [firstItemId] : [],
                                currentNavigatableItemId: firstItemId,
                            });

                        });

                        it (`Should move to the second item when ArrowDown is pressed.`, () => {

                            const secondItemId = getItemIdByIndex(dataSource, 1);

                            listViewDriver.listKeyDown(Keys.ArrowDown);

                            expectStateChange(onChange, {
                                selectedIds: isSelectableItem(dataSource, secondItemId) ? [secondItemId] : [],
                                currentNavigatableItemId: secondItemId,
                            });

                        });

                        it (`Should navigate to the last item when 'End' key is pressed.`, () => {
                            listViewDriver.listKeyDown(Keys.End);

                            expectStateChange(onChange, {
                                selectedIds: isSelectableItem(dataSource, lastItemId) ? [lastItemId] : [],
                                currentNavigatableItemId: lastItemId,
                            });
                        });

                        it (`Should navigate to the first item when 'Home' key is pressed.`, () => {
                            listViewDriver.listKeyDown(Keys.Home);

                            expectStateChange(onChange, {
                                selectedIds: isSelectableItem(dataSource, firstItemId) ? [firstItemId] : [],
                                currentNavigatableItemId: firstItemId,
                            });
                        });
                    });
                })(selectionTypeInfo);
            }
        });
    }


    function createListViewItem (renderProps: ListViewRenderItemProps<{text: string}, void>) {

        return (
            <div
                {...renderProps.listViewItemRoot()}
                onClick={renderProps.triggerInteractiveSelection}
            >
                {renderProps.dataItem.text}
            </div>
        )
    }

    function expectNoStateChange (onChangeMock: Mock) {
        expect(onChangeMock).toHaveBeenCalledTimes(0);
    }

    function expectStateChange (onChangeMock: Mock, expectedListViewState: Partial<ListViewState>) {
        expect(onChangeMock).toHaveBeenCalledTimes(1);

        const {
            selectedIds: expectedSelectedIds,
            disabledIds: expectedDisabledIds,
            ...expectedShallowListViewStateProps
        } = expectedListViewState;

        const calls = onChangeMock.mock.calls;
        const singleCall = calls[0];
        const updatedState = singleCall[0];


        if (expectedSelectedIds !== undefined)
        {
            expect(expectedSelectedIds).toHaveSameItems(updatedState.selectedIds);
        }


        if (expectedDisabledIds !== undefined)
        {
            expect(expectedDisabledIds).toHaveSameItems(updatedState.disabledIds);
        }

        expect(onChangeMock).toBeCalledWith(expect.objectContaining(expectedShallowListViewStateProps));
    }

    function expectRerendering (renderMock: Mock, renderItemsPropsArr: Array<Partial<ListViewRenderItemProps<any, any>>>) {
        expect(renderMock).toHaveBeenCalledTimes(renderItemsPropsArr.length);

        for (let renderItemProps of renderItemsPropsArr)
        {
            expect(renderMock).toBeCalledWith(expect.objectContaining(renderItemProps));
        }
    }

    function getItemIdByIndex (dataSource: Array<ListViewDataSourceDataItem<any>>, itemIndex: number) {
        return dataSource[itemIndex].id;
    }

    function getItemMetadata (dataSource: Array<ListViewDataSourceDataItem<any>>, itemId: ListViewItemId) {
        return find(dataSource, item => item.id === itemId);
    }

    function isSelectableItem (dataSource: Array<ListViewDataSourceDataItem<any>>, itemId: ListViewItemId) {
        return !!getItemMetadata(dataSource, itemId).isSelectable;
    }
});