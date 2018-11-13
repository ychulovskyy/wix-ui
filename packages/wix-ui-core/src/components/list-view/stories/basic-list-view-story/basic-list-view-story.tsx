import * as React from 'react';
import {
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

const dataItems = arrayGenerate<ListViewStoryTextualItemDataItem>(100, index => {
    
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

    private listView = React.createRef<ListView<DataItem>>();

    render () {

        const {
            ...listViewStateProps
        } = this.state;

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
                        dataSource={dataSource}
                        typeAheadClearTimeout={1000}
                        {...listViewStateProps}
                        onChange={updatedState => {
                            this.setState(updatedState)
                        }}
                        typeAheadNavigationType={TypeAheadNavigationType.StayOnCurrent}
                        selectionType={ListViewSelectionType.Multiple}
                        renderItem={ListViewStoryTextualItem}
                    />
                </div>
            </div>
        )
    }
}

export function arrayGenerate<T> (count: number, generator: (index: number) => T) : Array<T> {

    const result = [];

    for (let i = 0; i < count; i++)
    {
        result.push(generator(i));
    }

    return result;
}