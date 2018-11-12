import * as React from 'react';
import {ListViewItemsView} from '../list-view/list-view-composable';
import {
    ListViewCommonRenderItemProps,
    ListViewRenderItemProps,
    ListViewDataSource,
    DataItemsEqualityComparer, defaultDataItemsEqualityComparer
} from '../list-view/list-view-types';
import {FlattenTreeNode, FlattenTreeNodeMetadata, TreeViewStateUpdateFunction} from './tree-view-types';
import {TreeViewComposable, TreeViewContext} from './tree-view-composable';

interface TreeViewItemRenderProps<T> extends ListViewCommonRenderItemProps<T>, FlattenTreeNodeMetadata
{
    treeView: TreeViewComposable,
    updateTreeViewState: (updateFunction: TreeViewStateUpdateFunction) => void
}

export interface TreeViewItemViewProps<T>
{
    renderItem: React.SFC<TreeViewItemRenderProps<T>>,
    dataItemEqualityComparer?: DataItemsEqualityComparer<T>;
}

interface ComposableTreeViewItemsViewProps<T> extends TreeViewItemViewProps<T>
{
    dataSource: ListViewDataSource<FlattenTreeNode<T>>,
}

export class TreeViewItemsView<T> extends React.Component<ComposableTreeViewItemsViewProps<T>>
{
    static defaultProps = {
        dataItemEqualityComparer: defaultDataItemsEqualityComparer
    };

    render () {

        const {
            dataSource,
            renderItem,
            dataItemEqualityComparer
        } = this.props;

        return (
            <TreeViewContext.Consumer>
                {treeViewContext => {
                    return (
                        <ListViewItemsView
                            dataSource={dataSource}
                            dataItemEqualityComparer={(dataItem1: FlattenTreeNode<T>, dataItem2: FlattenTreeNode<T>) => {
                                return (
                                    dataItemEqualityComparer(dataItem1.treeNodeDataItem, dataItem2.treeNodeDataItem) &&
                                    dataItem1.level === dataItem2.level &&
                                    dataItem1.isExpanded === dataItem2.isExpanded &&
                                    dataItem1.hasChildren === dataItem2.hasChildren
                                );
                            }}
                            renderItem={(props: ListViewRenderItemProps<FlattenTreeNode<T>>) => {

                                const {
                                    dataItem,
                                    ...restRenderProps
                                } = props;

                                const {
                                    treeNodeDataItem,
                                    ...restFlattenTreeNodeProps
                                } = dataItem;

                                return renderItem({
                                    dataItem: treeNodeDataItem,
                                    treeView: treeViewContext.treeView,
                                    updateTreeViewState (updateFunction) {
                                        treeViewContext.treeView.updateState(updateFunction);
                                    },
                                    ...restFlattenTreeNodeProps,
                                    ...restRenderProps
                                })
                            }}
                        />
                    )
                }}
            </TreeViewContext.Consumer>
        )
    }
}