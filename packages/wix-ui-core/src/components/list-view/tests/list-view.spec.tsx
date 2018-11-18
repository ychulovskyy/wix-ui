import * as React from 'react';
import {times, partition} from 'lodash';
import {createDriver, SimulateCtrlKey} from './list-view.driver';
import {mount} from "enzyme";
import {ListView} from "../list-view";
import {ListViewDefaultState, ListViewRenderItemProps, ListViewSelectionType, ListViewState} from "../list-view-types";
import Mock = jest.Mock;

describe('ListView', () => {

    let listViewDriver;
    let separator;
    let listView;
    let renderItem;
    let onChange;

    beforeAll(() => {
        const dataSourceItemsCount = 12;

        // We'll create a data source that will contain items for ListView.
        // Items with odd ids will be selectable and the others will be only "navigatable"
        const dataSource = times(dataSourceItemsCount, index => {
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
        const [group1, group2] = partition(dataSource, item => item.id <= dataSourceItemsCount / 2);

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
                {group1}
                <div className="separator"/>
                {group2}
            </ListView>
        );

        separator = listView.find('.separator');

        listViewDriver = createDriver(listView);
    });

    beforeEach(() => {
        onChange.mockClear();
        renderItem.mockClear();
    });

    describe('ListView with single selection', () => {

        beforeAll(() => {
            listView.setProps({
                selectionType: ListViewSelectionType.Single,
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

        it(`Should change selection when a different selectable item is clicked`, () => {
            listViewDriver.itemClick(3);

            expectStateChange(onChange, {
                selectedIds: [3],
                selectionStartId: 3,
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
                    isSelected: true,
                    isCurrent: true
                }
            ])
        });

        it (`Should ignore clicking on a separator`, () => {

            separator.simulate('click');

            expectNoStateChange(onChange)
        });

        it (`Should move the current item but leaves the selection intact when clicking a non selectable item.`, () => {

            listViewDriver.itemClick(2);

            expectStateChange(onChange, {
                selectedIds: [3],
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

    function expectStateChange (onChangeMock: Mock, listViewState: Partial<ListViewState>) {
        expect(onChangeMock).toHaveBeenCalledTimes(1);
        expect(onChangeMock).toBeCalledWith(expect.objectContaining(listViewState));
    }

    function expectRerendering (renderMock: Mock, renderItemsPropsArr: Array<Partial<ListViewRenderItemProps<any, any>>>) {
        expect(renderMock).toHaveBeenCalledTimes(renderItemsPropsArr.length);

        for (let renderItemProps of renderItemsPropsArr)
        {
            expect(renderMock).toBeCalledWith(expect.objectContaining(renderItemProps));
        }
    }
});