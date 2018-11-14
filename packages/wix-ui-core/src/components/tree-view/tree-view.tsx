import * as React from 'react';
import {TreeViewItemsView, TreeViewItemViewProps} from './tree-view-items-view';
import {TreeViewComposable} from './tree-view-composable';
import {
    CommonListViewProps,
    ListViewItemId
} from '../list-view/list-view-types';
import {TreeNode, TreeViewDataSource, TreeViewState} from './tree-view-types';
import {IListView} from '../list-view/i-list-view';

interface TreeViewProps<T,S> extends CommonListViewProps, TreeViewItemViewProps<T,S>
{
    treeViewState: TreeViewState,
    children: Array<TreeNode<T>>,
    onChange?: (event: TreeViewState) => void,
}

export class TreeView<T,S> extends React.Component<TreeViewProps<T,S>> implements IListView
{
    private treeViewComposable = React.createRef<TreeViewComposable>();

    private flattenTreeDataSource: TreeViewDataSource<T>;

    render () {

        const {
            treeViewState,
            children,
            onChange,
            renderItem,
            dataItemEqualityComparer,
            ...listViewProps
        } = this.props;

        const {
            collapsedItemsIds,
        } = treeViewState;

        let treeDataSource = this.flattenTreeDataSource;
        if (!treeDataSource)
        {
            treeDataSource = this.flattenTreeDataSource = TreeViewComposable.createTreeDataSource<T>(children, collapsedItemsIds);
        }

        return (
            <TreeViewComposable
                ref={this.treeViewComposable}
                dataSourcesArray={[treeDataSource]}
                treeViewState={treeViewState}
                {...listViewProps}
                onChange={onChange}
            >
                <TreeViewItemsView
                    dataSource={treeDataSource}
                    renderItem={renderItem}
                    dataItemEqualityComparer={dataItemEqualityComparer}
                />
            </TreeViewComposable>
        )
    }

    handleKeyboardEvent (event: React.KeyboardEvent<Element>) {
        this.treeViewComposable.current.handleKeyboardEvent(event);
    }

    moveToItemBasedOnTypeAhead (updatedTypeAheadValue: string, options: {selectItem: boolean} = {selectItem: true}) {
        this.treeViewComposable.current.moveToItemBasedOnTypeAhead(updatedTypeAheadValue, options);
    }

    shouldComponentUpdate (nextProps, nextState) {

        const {
            children,
            treeViewState,
        } = this.props;

        const {
            children: nextChildren,
            collapsedItemsIds: nextCollapsedItemsIds
        } = nextProps;

        if (children !== nextChildren || treeViewState.collapsedItemsIds !== nextCollapsedItemsIds)
        {
            this.flattenTreeDataSource = undefined;
        }

        return true;
    }
}