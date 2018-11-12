import {
    ListViewDataSource,
    ListViewDefaultState,
    ListViewItemId,
    ListViewItemMetadata,
    ListViewState
} from '../list-view/list-view-types';
import {TreeViewComposable} from './tree-view-composable';
import {ListViewStateController} from '../list-view/list-view-state-controller';
import {TreeViewStateController} from './tree-view-state-controller';

export interface TreeNode<T>
{
    id: ListViewItemId,
    dataItem: T,
    typeAheadText?: string,
    isSelectable: boolean,
    children?: Array<TreeNode<T>>
}

export interface FlattenTreeNodeMetadata
{
    isExpanded: boolean,
    level: number,
    hasChildren: boolean,
    parentNodeId?: ListViewItemId
}

export interface FlattenTreeNode<T> extends FlattenTreeNodeMetadata
{
    treeNodeDataItem: T
}

export interface TreeViewState extends ListViewState, TreeViewStateFields
{
}

export interface TreeViewStateFields
{
    collapsedItemsIds: Array<ListViewItemId>,
}

export interface TreeViewContextData {
    treeView: TreeViewComposable
}

export type TreeViewItemMetadata = FlattenTreeNodeMetadata & ListViewItemMetadata;

export type TreeViewStateUpdateFunction = (stateController: TreeViewStateController) => void;

export const TreeViewDefaultState = {
    collapsedItemsIds: [],
    ...ListViewDefaultState
};

export type TreeViewDataSource<T> = ListViewDataSource<FlattenTreeNode<T>>;