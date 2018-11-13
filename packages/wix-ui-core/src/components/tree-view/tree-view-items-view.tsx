import * as React from 'react';
import {ListViewItemsView} from '../list-view/list-view-composable';
import {
    ListViewCommonRenderItemProps,
    ListViewRenderItemProps,
    ListViewDataSource,
    EqualityComparer, defaultDataItemsEqualityComparer, defaultContextArgsEqualityComparer
} from '../list-view/list-view-types';
import {FlattenTreeNode, FlattenTreeNodeMetadata, TreeViewStateUpdateFunction} from './tree-view-types';
import {TreeViewComposable, TreeViewContext} from './tree-view-composable';

export interface TreeViewItemRenderProps<T,S> extends ListViewCommonRenderItemProps<T>, FlattenTreeNodeMetadata
{
    treeView: TreeViewComposable,
    updateTreeViewState: (updateFunction: TreeViewStateUpdateFunction) => void,
    contextArg?: S,
}

export interface TreeViewItemViewProps<T,S>
{
    renderItem: React.SFC<TreeViewItemRenderProps<T,S>>,
    dataItemEqualityComparer?: EqualityComparer<T>,
    contextArg?: S,
    contextArgEqualityComparer?: EqualityComparer<S>;
}

interface ComposableTreeViewItemsViewProps<T,S> extends TreeViewItemViewProps<T,S>
{
    dataSource: ListViewDataSource<FlattenTreeNode<T>>,
}

export class TreeViewItemsView<T,S> extends React.Component<ComposableTreeViewItemsViewProps<T,S>>
{
    static defaultProps = {
        dataItemEqualityComparer: defaultDataItemsEqualityComparer,
        contextArgEqualityComparer: defaultContextArgsEqualityComparer,
    };

    render () {

        const {
            dataSource,
            renderItem,
            contextArg,
            dataItemEqualityComparer,
            contextArgEqualityComparer
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
                            contextArg={contextArg}
                            contextArgEqualityComparer={contextArgEqualityComparer}
                            renderItem={(props: ListViewRenderItemProps<FlattenTreeNode<T>,S>) => {

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