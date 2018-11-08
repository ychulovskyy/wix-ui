import * as React from 'react';
import {ListView, ListViewItemsView} from "../list-view";
import * as ListViewDataSource from "../list-view-data-source";
import {ListViewDefaultState, ListViewState} from "../list-view-types";
import style from "./list-view-story.st.css";


interface ListViewStoryState extends ListViewState {

}

export class ListViewStory extends React.Component<{}, ListViewStoryState> {
    state = {
        ...ListViewDefaultState
    };

    private dataSource = ListViewDataSource.createSelectablePrimitiveValuesDataSource(["1", "2", "3"]);

    render() {

        const {
            ...listViewState
        } = this.state;

        return (
            <ListView
                dataSourcesArray={[this.dataSource]}
                {...listViewState}
                onChange={(listViewState) => {
                    this.setState(listViewState);
                }}
            >
                <ListViewItemsView
                    dataSource={this.dataSource}
                    renderItem={(renderProps) => {
                        return (
                            <div
                                {...renderProps.selectableItemRoot()}
                                {...style('listViewItem', {selected: renderProps.isSelected})}
                                onClick={(event) => {
                                    renderProps.triggerAction(event);
                                }}
                            >
                                {renderProps.dataItem}
                            </div>
                        )
                    }}
                />
            </ListView>
        );
    }
}
