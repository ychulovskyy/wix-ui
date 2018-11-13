import * as React from 'react';
import {
    DefaultTypeAheadStrategy,
    ListViewDefaultState,
    ListViewSelectionType,
    ListViewState,
    TypeAheadNavigationType
} from '../../list-view-types';
import {ListView} from '../../list-view';
import * as ListViewDataSource from '../../list-view-data-source';
import {
    ListViewStoryTextualItem,
    ListViewStoryTextualItemDataItem
} from '../list-view-story-textual-item/list-view-story-textual-item';
import {ListViewNavigationInputBehaviour} from '../../list-view-navigation-input-behaviour';


type DataItem = {
    id: number,
    text: string
};

const dataItems = arrayGenerate<ListViewStoryTextualItemDataItem>(10, index => {
    const id = index + 1;
    
    return {
        id,
        text: `Item ${id}`
    }
});

const dataSource = ListViewDataSource.createDataSource(dataItems, {
    idFunction: item => item.id,
    typeAheadTextFunction: item => item.text,
    isSelectable: () => true,
});

interface BasicListViewStoryState extends ListViewState
{
}

export class BasicListViewStory extends React.Component<{}, BasicListViewStoryState>
{
    state = {
        ...ListViewDefaultState
    };

    private listView = React.createRef<ListView<DataItem, any>>();

    render () {

        const {
            ...listViewStateProps
        } = this.state;

        const [group1, group2] = arraySplit(dataSource, [5, Infinity]);

        return (
            <div>
                <div
                    style={{
                        padding: 20,
                        borderBottom: '1px solid #ddd'
                    }}
                >
                    <ListViewNavigationInputBehaviour
                        listViewSelector={() => this.listView}
                    >
                        <input
                            type="text"
                            style={{
                                height: 24,
                                padding: '0 10px',
                                width: '300px',
                            }}
                        />
                    </ListViewNavigationInputBehaviour>
                </div>
                <div
                    style={{
                        padding: 20,
                    }}
                >
                    <ListView
                        ref={this.listView}
                        {...listViewStateProps}
                        onChange={updatedState => {
                            this.setState(updatedState)
                        }}
                        typeAheadStrategy={DefaultTypeAheadStrategy}
                        selectionType={ListViewSelectionType.Multiple}
                        renderItem={ListViewStoryTextualItem}
                    >
                        <h1>Group 1</h1>
                        {group1}
                        <h1>Group 2</h1>
                        {group2}
                    </ListView>
                </div>
            </div>
        )
    }
}

function arraySplit<T> (arr: Array<T>, groupItemsCount: number[]) : Array<Array<T>> {
    const result = [];

    let cursor = 0;

    for (let i = 0; i < groupItemsCount.length; i++)
    {
        const itemsCount = groupItemsCount[i];

        const group = [];

        result.push(group);

        for (let j = 0; j < itemsCount && cursor < arr.length; j++, cursor++)
        {
            group.push(arr[cursor]);
        }
    }

    return result;
}

export function arrayGenerate<T> (count: number, generator: (index: number) => T) : Array<T> {

    const result = [];

    for (let i = 0; i < count; i++)
    {
        result.push(generator(i));
    }

    return result;
}