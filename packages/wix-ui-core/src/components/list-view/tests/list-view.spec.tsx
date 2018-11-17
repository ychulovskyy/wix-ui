import * as React from 'react';
import {times, partition} from 'lodash';
import {createDriver} from './list-view.driver';
import {mount} from "enzyme";
import {ListView} from "../list-view";
import {ListViewDefaultState, ListViewRenderItemProps, ListViewSelectionType, ListViewState} from "../list-view-types";
import Mock = jest.Mock;

describe('ListView', () => {

    const dataSource = times(10, index => {
        const id = index + 1;

        return {id: id, isSelectable: id % 2 !== 0 , dataItem: {text: `Item ${id}`}}
    });

    const [group1, group2] = partition(dataSource, item => item.id <= 5);

    describe('ListView with single selection', () => {



        const onChange = jest.fn(listViewState => {
            listViewDriver.updateState(listViewState);
        });

        const renderItem = jest.fn(createListViewItem);

        const listView = mount(
            <ListView
                renderItem={renderItem}
                listViewState={ListViewDefaultState}
                onChange={onChange}
                selectionType={ListViewSelectionType.Single}
            >
                {group1}
                <div className="separator"/>
                {group2}
            </ListView>
        );

        const separator = listView.find('.separator');

        const listViewDriver = createDriver(listView);

        beforeEach(() => {
            onChange.mockClear();
            renderItem.mockClear();
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