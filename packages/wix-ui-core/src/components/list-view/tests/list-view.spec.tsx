import * as React from 'react';
import {find, partition, times} from 'lodash';
import {
    createListViewTestingController,
    SimulateCtrlKey,
    SimulateCtrlShiftKey,
    SimulateShiftKey,
    ListViewTester,
    parseListViewInfo
} from './list-view-test-utils';
import {mount} from 'enzyme';
import {ListView} from '../list-view';
import {
    ListViewDataSourceDataItem,
    ListViewDefaultState,
    ListViewItemId,
    ListViewRenderItemProps,
    ListViewSelectionType,
    ListViewState,
    NavigationOrientation
} from '../list-view-types';
import Mock = jest.Mock;

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

enum Keys
{
    ArrowDown = 'ArrowDown',
    ArrowUp = 'ArrowUp',
    ArrowLeft = 'ArrowLeft',
    ArrowRight = 'ArrowRight',
    Home = 'Home',
    End = 'End',
    Space = ' ',
    a = 'a'
}

describe('ListViewNew', () => {

    let listViewTester;

    beforeAll(() => {
        listViewTester = new ListViewTester({
            generateItem: id => {

                const itemText = 'Item ' + id;

                return {
                    dataItem: {
                        text: itemText
                    },
                    typeAheadText: itemText
                }
            },
            renderItem: createListViewItem
        });
    });

    it ('"SELECTED(<{X}>),X" => MoveNext => "X,SELECTED(<{X}>)"', () => {

        listViewTester.testListView({
            testedInput: parseListViewInfo("SELECTED(<{X}>),X"),
            expectedOutput: parseListViewInfo("X,SELECTED(<{X}>)"),
            selectionType: ListViewSelectionType.Single,
            testExecution: driver => {
                driver.listKeyDown(Keys.ArrowDown);
            }
        })
    })
});

describe('ListView', () => {

    const dataSourceItemsCount = 12;

    let testingController;
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
            isSelectable: id % 2 !== 0,
            dataItem: {
                text: `Item ${id}`
            }
        }
    });

    // We'll split the data source to 2 equal groups
    const [group1, group2] = partition(alternatingDataSource, item => item.id <= dataSourceItemsCount / 2);

    onChange = jest.fn(listViewState => {
        testingController.updateState(listViewState);
    });

    renderItem = jest.fn(createListViewItem);

    listView = mount(
        <ListView
            renderItem={renderItem}
            listViewState={ListViewDefaultState}
            onChange={onChange}
        >
            <div/>
            <div/>
        </ListView>
    );

    testingController = createListViewTestingController(listView);

    describe(`ListView generic test cases`, () => {
        listViewTestCasesArr = [
            {
                title: 'Alternating data source splitted to 2 groups with separator between them',
                dataSource: alternatingDataSource,
                getChildren() {
                    return [
                        group1,
                        <div className="separator"/>,
                        group2
                    ]
                },
                getNonNavigatableItem(listView) {
                    return listView.find('.separator');
                }
            },
            {
                title: 'Alternating data source surrounded with header and footer',
                dataSource: alternatingDataSource,
                getChildren() {
                    return [
                        <div className="header"/>,
                        alternatingDataSource,
                        <div className="footer"/>
                    ]
                },
                getNonNavigatableItem(listView) {
                    return listView.find('.footer');
                }
            },
            {
                title: 'Selectable Items DataSource',
                dataSource: selectableItemsDataSource,
                getChildren() {
                    return selectableItemsDataSource
                },
                getNonNavigatableItem(listView) {

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

            describe(`ListView test-case '${title}'`, () => {

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

                            testingController.itemClick(firstItemId);

                            expectStateChange(onChange, {
                                selectedIds: isSelectableItem(dataSource, firstItemId) ? [firstItemId] : [],
                                currentNavigatableItemId: firstItemId,
                            });
                        });

                        it(`User clicked the second item`, () => {

                            testingController.itemClick(secondItemId);

                            const itemIsSelectable = isSelectableItem(dataSource, secondItemId);

                            expectStateChange(onChange, {
                                selectedIds: itemIsSelectable ? [secondItemId] : testingController.getSelectedIds(),
                                currentNavigatableItemId: secondItemId,
                            });
                        });

                        if (separator) {
                            it(`User clicked on a non-selectable item`, () => {

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

                            for (let keysCombination of keysCombinationsArr) {
                                testingController.itemClick(1);

                                onChange.mockClear();
                                renderItem.mockClear();

                                testingController.itemClick(3, keysCombination);

                                expectStateChange(onChange, {
                                    selectedIds: [3],
                                    selectionStartId: 3,
                                    currentNavigatableItemId: 3,
                                });
                            }

                        });
                    });
                });

                const testedSelectionTypes = [
                    {
                        selectionType: ListViewSelectionType.Multiple,
                        title: 'Multiple Selection'
                    },
                    {
                        selectionType: ListViewSelectionType.Single,
                        title: 'Single Selection'
                    },
                ];

                for (var selectionTypeInfo of testedSelectionTypes) {
                    (function (selectionTypeInfo) {

                        describe(`ListView basic keyboard interaction with ${selectionTypeInfo.title}`, () => {

                            beforeAll(() => {
                                listView.setProps({
                                    selectionType: selectionTypeInfo.selectionType,
                                    listViewState: ListViewDefaultState
                                });
                            });

                            it(`Should select the first item when ArrowDown is pressed`, () => {

                                const firstItemId = getItemIdByIndex(dataSource, 0);

                                testingController.listKeyDown(Keys.ArrowDown);

                                expectStateChange(onChange, {
                                    selectedIds: isSelectableItem(dataSource, firstItemId) ? [firstItemId] : [],
                                    currentNavigatableItemId: firstItemId,
                                });

                            });

                            it(`Should move to the second item when ArrowDown is pressed.`, () => {

                                const secondItemId = getItemIdByIndex(dataSource, 1);

                                testingController.listKeyDown(Keys.ArrowDown);

                                expectStateChange(onChange, {
                                    selectedIds: isSelectableItem(dataSource, secondItemId) ? [secondItemId] : [],
                                    currentNavigatableItemId: secondItemId,
                                });

                            });

                            it(`Should navigate to the last item when 'End' key is pressed.`, () => {
                                testingController.listKeyDown(Keys.End);

                                expectStateChange(onChange, {
                                    selectedIds: isSelectableItem(dataSource, lastItemId) ? [lastItemId] : [],
                                    currentNavigatableItemId: lastItemId,
                                });
                            });

                            it(`Should navigate to the first item when 'Home' key is pressed.`, () => {
                                testingController.listKeyDown(Keys.Home);

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
    });

    describe(`ListView specific test cases`, () => {
        describe('Multiple selection', () => {

                beforeEach(() => {
                    listView.setProps({
                        selectionType: ListViewSelectionType.Multiple,
                    });
                });

                describe('Mixture of selectable and none selectable items', () => {
                    // We'll create a data source that will contain items for ListView.
                    // Items with odd ids will be selectable and the others will be only "navigatable"
                    const selectableAndNotSelectableDataSource = times(dataSourceItemsCount, index => {
                        const id = index + 1;

                        return {
                            id: id,
                            isSelectable: id % 2 !== 0,
                            dataItem: {
                                text: `Item ${id}`
                            }
                        }
                    });

                    beforeEach(() => {
                        listView.setProps({
                            children: selectableAndNotSelectableDataSource
                        });
                    });

                    describe('Mouse Interactions', () => {

                        const firstItemId = getItemIdByIndex(selectableAndNotSelectableDataSource, 0);
                        const secondItemId = getItemIdByIndex(selectableAndNotSelectableDataSource, 1);
                        const thirdItemId = getItemIdByIndex(selectableAndNotSelectableDataSource, 2);
                        const fifthItemId = getItemIdByIndex(selectableAndNotSelectableDataSource, 4);
                        const sevenItemId = getItemIdByIndex(selectableAndNotSelectableDataSource, 6);

                        beforeEach(() => {

                            listView.setProps({
                                listViewState: ListViewDefaultState
                            });

                            onChange.mockClear();
                        });


                        it(`Should select a selectable item when it's clicked`, () => {

                            testingController.itemClick(firstItemId);

                            expectStateChange(onChange, {
                                selectedIds: [firstItemId],
                                selectionStartId: firstItemId,
                                currentNavigatableItemId: firstItemId,
                            });
                        });

                        it(`Should add to selection when a different selectable item is clicked with ctrl`, () => {

                            testingController.itemClick(firstItemId);

                            onChange.mockClear();

                            testingController.itemClick(thirdItemId, SimulateCtrlKey);

                            expectStateChange(onChange, {
                                selectedIds: [firstItemId, thirdItemId],
                                selectionStartId: thirdItemId,
                                currentNavigatableItemId: thirdItemId,
                            });
                        });

                        it(`Should move the current item but leaves the selection intact when clicking with ctrl a non selectable item.`, () => {

                            testingController.itemClick(firstItemId);
                            testingController.itemClick(thirdItemId, SimulateCtrlKey);

                            onChange.mockClear();

                            testingController.itemClick(secondItemId, SimulateCtrlKey);

                            expectStateChange(onChange, {
                                selectedIds: [firstItemId, thirdItemId],
                                selectionStartId: thirdItemId,
                                currentNavigatableItemId: secondItemId,
                            });
                        });

                        it(`Should remove from selection when a selected item is clicked with ctrl and keep other selected items selected`, () => {

                            testingController.itemClick(firstItemId);
                            testingController.itemClick(thirdItemId, SimulateCtrlKey);
                            testingController.itemClick(secondItemId, SimulateCtrlKey);

                            onChange.mockClear();

                            testingController.itemClick(thirdItemId, SimulateCtrlKey);

                            expectStateChange(onChange, {
                                selectedIds: [firstItemId],
                                selectionStartId: thirdItemId,
                                currentNavigatableItemId: thirdItemId,
                            });
                        });

                        it(`Should keep current selection and add to selection selectable items from selection start to clicked item when item is clicked with ctrl+shift`, () => {
                            testingController.itemClick(firstItemId);
                            testingController.itemClick(thirdItemId, SimulateCtrlKey);

                            onChange.mockClear();

                            testingController.itemClick(sevenItemId, SimulateCtrlShiftKey);

                            expectStateChange(onChange, {
                                selectedIds: [firstItemId, thirdItemId, fifthItemId, sevenItemId],
                                selectionStartId: thirdItemId,
                                currentNavigatableItemId: sevenItemId,
                            });

                        });

                        it(`Should select all selectable items in range between selection start to last clicked item when item is clicked with shift`, () => {
                            testingController.itemClick(firstItemId);

                            onChange.mockClear();

                            testingController.itemClick(sevenItemId, SimulateShiftKey);

                            expectStateChange(onChange, {
                                selectedIds: [firstItemId, thirdItemId, fifthItemId, sevenItemId],
                                selectionStartId: firstItemId,
                                currentNavigatableItemId: sevenItemId,
                            });

                        });

                        it(`Should unselect all selectable items and select only clicked item`, () => {
                            testingController.itemClick(thirdItemId);
                            testingController.itemClick(sevenItemId, SimulateShiftKey);

                            onChange.mockClear();

                            testingController.itemClick(firstItemId);

                            expectStateChange(onChange, {
                                selectedIds: [firstItemId],
                                selectionStartId: firstItemId,
                                currentNavigatableItemId: firstItemId,
                            });

                        });
                    });

                    describe('Keyboard Interactions - mixture of selectable and none selectable items', () => {

                        const firstItemId = getItemIdByIndex(selectableAndNotSelectableDataSource, 0);
                        const secondItemId = getItemIdByIndex(selectableAndNotSelectableDataSource, 1);
                        const thirdItemId = getItemIdByIndex(selectableAndNotSelectableDataSource, 2);
                        const fifthItemId = getItemIdByIndex(selectableAndNotSelectableDataSource, 4);
                        const sevenItemId = getItemIdByIndex(selectableAndNotSelectableDataSource, 6);
                        const nineItemId = getItemIdByIndex(selectableAndNotSelectableDataSource, 8);
                        const elevenItemId = getItemIdByIndex(selectableAndNotSelectableDataSource, 10);
                        const lastItemId = getItemIdByIndex(selectableAndNotSelectableDataSource, 11);

                        beforeEach(() => {

                            listView.setProps({
                                listViewState: ListViewDefaultState,
                            });

                            onChange.mockClear();
                        });


                        const keyboardNavigations = [
                            {
                                next: Keys.ArrowDown,
                                prev: Keys.ArrowUp,
                                orientation: NavigationOrientation.Vertical
                            },
                            {
                                next: Keys.ArrowRight,
                                prev: Keys.ArrowLeft,
                                orientation: NavigationOrientation.Horizontal
                            }
                        ];

                        it(`"Next Key" - Should select items 1 & 3 and set the current to 3 with (Ctrl + Shift + Next Key)`, () => {

                            for (let i = 0; i < keyboardNavigations.length; i++)
                            {
                                let keyboardNavigation = keyboardNavigations[i];

                                listView.setProps({
                                    orientation: keyboardNavigation.orientation,
                                    listViewState: ListViewDefaultState,
                                });

                                testingController.listKeyDown(keyboardNavigation.next);
                                testingController.listKeyDown(keyboardNavigation.next, SimulateCtrlShiftKey);

                                onChange.mockClear();

                                testingController.listKeyDown(keyboardNavigation.next, SimulateCtrlShiftKey);

                                expectStateChange(onChange, {
                                    selectedIds: [firstItemId, thirdItemId],
                                    selectionStartId: firstItemId,
                                    currentNavigatableItemId: thirdItemId,
                                });

                                onChange.mockClear();
                            }
                        });

                        it(`"Prev Key" - Should select items 1 & 3 and set the current to 3 with (Ctrl + Shift + Prev Key)`, () => {

                            for (let i = 0; i < keyboardNavigations.length; i++)
                            {
                                let keyboardNavigation = keyboardNavigations[i];

                                listView.setProps({
                                    orientation: keyboardNavigation.orientation,
                                    listViewState: ListViewDefaultState,
                                });

                                testingController.itemClick(thirdItemId);
                                testingController.listKeyDown(keyboardNavigation.prev, SimulateCtrlShiftKey);

                                onChange.mockClear();

                                testingController.listKeyDown(keyboardNavigation.prev, SimulateCtrlShiftKey);

                                expectStateChange(onChange, {
                                    selectedIds: [firstItemId, thirdItemId],
                                    selectionStartId: thirdItemId,
                                    currentNavigatableItemId: firstItemId,
                                });

                                onChange.mockClear();
                            }
                        });

                        it(`"Next Key" - Should select items 1 & 3 and set the current to 3 with (Ctrl + Space + Next Key)`, () => {

                            for (let i = 0; i < keyboardNavigations.length; i++)
                            {
                                let keyboardNavigation = keyboardNavigations[i];

                                listView.setProps({
                                    orientation: keyboardNavigation.orientation,
                                    listViewState: ListViewDefaultState,
                                });

                                testingController.listKeyDown(keyboardNavigation.next);
                                testingController.listKeyDown(keyboardNavigation.next, SimulateCtrlKey);
                                testingController.listKeyDown(Keys.Space, SimulateCtrlKey);
                                testingController.listKeyDown(keyboardNavigation.next, SimulateCtrlKey);

                                onChange.mockClear();

                                testingController.listKeyDown(Keys.Space, SimulateCtrlKey);

                                expectStateChange(onChange, {
                                    selectedIds: [firstItemId, thirdItemId],
                                    selectionStartId: thirdItemId,
                                    currentNavigatableItemId: thirdItemId,
                                });

                                onChange.mockClear();
                            }
                        });

                        it(`"Prev Key" - Should select items 1 & 3 and set the current to 3 with (Ctrl + Space + Prev Key)`, () => {

                            for (let i = 0; i < keyboardNavigations.length; i++)
                            {
                                let keyboardNavigation = keyboardNavigations[i];

                                listView.setProps({
                                    orientation: keyboardNavigation.orientation,
                                    listViewState: ListViewDefaultState,
                                });

                                testingController.itemClick(thirdItemId);
                                testingController.listKeyDown(keyboardNavigation.prev, SimulateCtrlKey);
                                testingController.listKeyDown(Keys.Space, SimulateCtrlKey);
                                testingController.listKeyDown(keyboardNavigation.prev, SimulateCtrlKey);

                                onChange.mockClear();

                                testingController.listKeyDown(Keys.Space, SimulateCtrlKey);

                                expectStateChange(onChange, {
                                    selectedIds: [firstItemId, thirdItemId],
                                    selectionStartId: firstItemId,
                                    currentNavigatableItemId: firstItemId,
                                });

                                onChange.mockClear();
                            }
                        });

                        it(`"Next Key" - Should select items 1 & 3 & 7 & 9 (((Ctrl + Space) | (Ctrl + Shift)) + Next Key)`, () => {

                            for (let i = 0; i < keyboardNavigations.length; i++)
                            {
                                let keyboardNavigation = keyboardNavigations[i];

                                listView.setProps({
                                    orientation: keyboardNavigation.orientation,
                                    listViewState: ListViewDefaultState,
                                });

                                testingController.listKeyDown(keyboardNavigation.next);
                                testingController.listKeyDown(keyboardNavigation.next, SimulateCtrlKey);
                                testingController.listKeyDown(Keys.Space, SimulateCtrlKey);
                                testingController.listKeyDown(keyboardNavigation.next, SimulateCtrlKey);
                                testingController.listKeyDown(Keys.Space, SimulateCtrlKey);

                                testingController.listKeyDown(keyboardNavigation.next, SimulateCtrlKey);
                                testingController.listKeyDown(keyboardNavigation.next, SimulateCtrlKey);
                                testingController.listKeyDown(keyboardNavigation.next, SimulateCtrlKey);
                                testingController.listKeyDown(keyboardNavigation.next, SimulateCtrlKey);
                                testingController.listKeyDown(Keys.Space, SimulateCtrlKey);
                                testingController.listKeyDown(keyboardNavigation.next, SimulateCtrlShiftKey);

                                onChange.mockClear();

                                testingController.listKeyDown(keyboardNavigation.next, SimulateCtrlShiftKey);

                                expectStateChange(onChange, {
                                    selectedIds: [firstItemId, thirdItemId, sevenItemId, nineItemId],
                                    selectionStartId: sevenItemId,
                                    currentNavigatableItemId: nineItemId,
                                });

                                onChange.mockClear();
                            }
                        });

                        it(`"Prev Key" - Should select items 1 & 3 & 7 & 9 (((Ctrl + Space) | (Ctrl + Shift)) + Prev Key)`, () => {

                            for (let i = 0; i < keyboardNavigations.length; i++)
                            {
                                let keyboardNavigation = keyboardNavigations[i];

                                listView.setProps({
                                    orientation: keyboardNavigation.orientation,
                                    listViewState: ListViewDefaultState,
                                });

                                testingController.itemClick(nineItemId);
                                testingController.listKeyDown(keyboardNavigation.prev, SimulateCtrlKey);
                                testingController.listKeyDown(Keys.Space, SimulateCtrlKey);
                                testingController.listKeyDown(keyboardNavigation.prev, SimulateCtrlKey);
                                testingController.listKeyDown(Keys.Space, SimulateCtrlKey);

                                testingController.listKeyDown(keyboardNavigation.prev, SimulateCtrlKey);
                                testingController.listKeyDown(keyboardNavigation.prev, SimulateCtrlKey);
                                testingController.listKeyDown(keyboardNavigation.prev, SimulateCtrlKey);
                                testingController.listKeyDown(keyboardNavigation.prev, SimulateCtrlKey);
                                testingController.listKeyDown(Keys.Space, SimulateCtrlKey);
                                testingController.listKeyDown(keyboardNavigation.prev, SimulateCtrlShiftKey);

                                onChange.mockClear();

                                testingController.listKeyDown(keyboardNavigation.prev, SimulateCtrlShiftKey);

                                expectStateChange(onChange, {
                                    selectedIds: [firstItemId, thirdItemId, sevenItemId, nineItemId],
                                    selectionStartId: thirdItemId,
                                    currentNavigatableItemId: firstItemId,
                                });

                                onChange.mockClear();
                            }
                        });


                        it(`"Next Key + End" - Should select items 1 & 3 & 5 & 7 & 9 & 11 (((Ctrl + Space) | (Ctrl + Shift + End)) + Next Key)`, () => {

                            for (let i = 0; i < keyboardNavigations.length; i++)
                            {
                                let keyboardNavigation = keyboardNavigations[i];

                                listView.setProps({
                                    orientation: keyboardNavigation.orientation,
                                    listViewState: ListViewDefaultState,
                                });

                                testingController.listKeyDown(keyboardNavigation.next);
                                testingController.listKeyDown(keyboardNavigation.next, SimulateCtrlKey);
                                testingController.listKeyDown(Keys.Space, SimulateCtrlKey);
                                testingController.listKeyDown(keyboardNavigation.next, SimulateCtrlKey);
                                testingController.listKeyDown(Keys.Space, SimulateCtrlKey);

                                onChange.mockClear();

                                testingController.listKeyDown(Keys.End, SimulateCtrlShiftKey);

                                expectStateChange(onChange, {
                                    selectedIds: [firstItemId, thirdItemId, fifthItemId, sevenItemId, nineItemId, elevenItemId],
                                    selectionStartId: thirdItemId,
                                    currentNavigatableItemId: lastItemId,
                                });

                                onChange.mockClear();
                            }
                        });

                        it(`"Prev Key + Home" - Should select items 1 & 3 & 5 & 7 & 9 & 11 (((Ctrl + Space) | (Ctrl + Shift + Home)) + Prev Key)`, () => {

                            for (let i = 0; i < keyboardNavigations.length; i++)
                            {
                                let keyboardNavigation = keyboardNavigations[i];

                                listView.setProps({
                                    orientation: keyboardNavigation.orientation,
                                    listViewState: ListViewDefaultState,
                                });

                                testingController.itemClick(lastItemId);
                                testingController.listKeyDown(keyboardNavigation.prev, SimulateCtrlKey);
                                testingController.listKeyDown(Keys.Space, SimulateCtrlKey);

                                onChange.mockClear();

                                testingController.listKeyDown(Keys.Home, SimulateCtrlShiftKey);

                                expectStateChange(onChange, {
                                    selectedIds: [firstItemId, thirdItemId, fifthItemId, sevenItemId, nineItemId, elevenItemId],
                                    selectionStartId: elevenItemId,
                                    currentNavigatableItemId: firstItemId,
                                });

                                onChange.mockClear();
                            }
                        });


                        it(`"Next Key + End" - Should select items 3 & 5 & 7 & 9 & 11 (((Ctrl + Space) | (Shift + End)) + Next Key)`, () => {

                            for (let i = 0; i < keyboardNavigations.length; i++)
                            {
                                let keyboardNavigation = keyboardNavigations[i];

                                listView.setProps({
                                    orientation: keyboardNavigation.orientation,
                                    listViewState: ListViewDefaultState,
                                });

                                testingController.listKeyDown(keyboardNavigation.next);
                                testingController.listKeyDown(keyboardNavigation.next, SimulateCtrlKey);
                                testingController.listKeyDown(Keys.Space, SimulateCtrlKey);
                                testingController.listKeyDown(keyboardNavigation.next, SimulateCtrlKey);
                                testingController.listKeyDown(Keys.Space, SimulateCtrlKey);

                                onChange.mockClear();

                                testingController.listKeyDown(Keys.End, SimulateShiftKey);

                                expectStateChange(onChange, {
                                    selectedIds: [thirdItemId, fifthItemId, sevenItemId, nineItemId, elevenItemId],
                                    selectionStartId: thirdItemId,
                                    currentNavigatableItemId: lastItemId,
                                });

                                onChange.mockClear();
                            }
                        });

                        it(`"Prev Key + Home" - Should select items 3 & 5 & 7 & 9 & 11 (((Ctrl + Space) | (Shift + Home)) + Prev Key)`, () => {

                            for (let i = 0; i < keyboardNavigations.length; i++)
                            {
                                let keyboardNavigation = keyboardNavigations[i];

                                listView.setProps({
                                    orientation: keyboardNavigation.orientation,
                                    listViewState: ListViewDefaultState,
                                });

                                testingController.itemClick(lastItemId);
                                testingController.listKeyDown(keyboardNavigation.prev, SimulateCtrlKey);
                                testingController.listKeyDown(Keys.Space, SimulateCtrlKey);
                                testingController.listKeyDown(keyboardNavigation.prev, SimulateCtrlKey);
                                testingController.listKeyDown(Keys.Space, SimulateCtrlKey);
                                testingController.listKeyDown(keyboardNavigation.prev, SimulateCtrlKey);
                                testingController.listKeyDown(Keys.Space, SimulateCtrlKey);

                                onChange.mockClear();

                                testingController.listKeyDown(Keys.Home, SimulateShiftKey);

                                expectStateChange(onChange, {
                                    selectedIds: [firstItemId, thirdItemId, fifthItemId, sevenItemId, nineItemId],
                                    selectionStartId: nineItemId,
                                    currentNavigatableItemId: firstItemId,
                                });

                                onChange.mockClear();
                            }
                        });


                        it(`"Next Key + End" - Should select items 3 & 5 & 7 & 9 & 11 (((Ctrl + Space) | (Shift + End)) + Next Key)`, () => {

                            for (let i = 0; i < keyboardNavigations.length; i++)
                            {
                                let keyboardNavigation = keyboardNavigations[i];

                                listView.setProps({
                                    orientation: keyboardNavigation.orientation,
                                    listViewState: ListViewDefaultState,
                                });

                                testingController.listKeyDown(keyboardNavigation.next);
                                testingController.listKeyDown(keyboardNavigation.next, SimulateCtrlKey);
                                testingController.listKeyDown(Keys.Space, SimulateCtrlKey);
                                testingController.listKeyDown(keyboardNavigation.next, SimulateCtrlKey);
                                testingController.listKeyDown(Keys.Space, SimulateCtrlKey);

                                onChange.mockClear();

                                testingController.listKeyDown(Keys.End, SimulateShiftKey);

                                expectStateChange(onChange, {
                                    selectedIds: [thirdItemId, fifthItemId, sevenItemId, nineItemId, elevenItemId],
                                    selectionStartId: thirdItemId,
                                    currentNavigatableItemId: lastItemId,
                                });

                                onChange.mockClear();
                            }
                        });

                        it(`"Prev Key + Home" - Should select items 3 & 5 & 7 & 9 & 11 (((Ctrl + Space) | (Shift + Home)) + Prev Key)`, () => {

                            for (let i = 0; i < keyboardNavigations.length; i++)
                            {
                                let keyboardNavigation = keyboardNavigations[i];

                                listView.setProps({
                                    orientation: keyboardNavigation.orientation,
                                    listViewState: ListViewDefaultState,
                                });

                                testingController.itemClick(lastItemId);
                                testingController.listKeyDown(keyboardNavigation.prev, SimulateCtrlKey);
                                testingController.listKeyDown(Keys.Space, SimulateCtrlKey);
                                testingController.listKeyDown(keyboardNavigation.prev, SimulateCtrlKey);
                                testingController.listKeyDown(Keys.Space, SimulateCtrlKey);
                                testingController.listKeyDown(keyboardNavigation.prev, SimulateCtrlKey);
                                testingController.listKeyDown(Keys.Space, SimulateCtrlKey);

                                onChange.mockClear();

                                testingController.listKeyDown(Keys.Home, SimulateShiftKey);

                                expectStateChange(onChange, {
                                    selectedIds: [firstItemId, thirdItemId, fifthItemId, sevenItemId, nineItemId],
                                    selectionStartId: nineItemId,
                                    currentNavigatableItemId: firstItemId,
                                });

                                onChange.mockClear();
                            }
                        });

                    })

                });


            }
        );
    });

    function expectNoStateChange(onChangeMock: Mock) {
        expect(onChangeMock).toHaveBeenCalledTimes(0);
    }

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

    function expectRerendering(renderMock: Mock, renderItemsPropsArr: Array<Partial<ListViewRenderItemProps<any, any>>>) {
        expect(renderMock).toHaveBeenCalledTimes(renderItemsPropsArr.length);

        for (let renderItemProps of renderItemsPropsArr) {
            expect(renderMock).toBeCalledWith(expect.objectContaining(renderItemProps));
        }
    }

    function getItemIdByIndex(dataSource: Array<ListViewDataSourceDataItem<any>>, itemIndex: number) {
        return dataSource[itemIndex].id;
    }

    function getItemMetadata(dataSource: Array<ListViewDataSourceDataItem<any>>, itemId: ListViewItemId) {
        return find(dataSource, item => item.id === itemId);
    }

    function isSelectableItem(dataSource: Array<ListViewDataSourceDataItem<any>>, itemId: ListViewItemId) {
        return !!getItemMetadata(dataSource, itemId).isSelectable;
    }
});

function createListViewItem(renderProps: ListViewRenderItemProps<{ text: string }, void>) {

    return (
        <div
            {...renderProps.listViewItemRoot()}
            onClick={renderProps.triggerInteractiveSelection}
        >
            {renderProps.dataItem.text}
        </div>
    )
}