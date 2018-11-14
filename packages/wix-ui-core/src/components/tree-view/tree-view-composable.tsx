import * as React from 'react';
import {
    FlattenTreeNode,
    TreeNode,
    TreeViewContextData,
    TreeViewItemMetadata,
    TreeViewState,
    TreeViewStateUpdateFunction
} from './tree-view-types';
import {ListViewComposable} from '../list-view/list-view-composable';
import {
    CommonListViewProps,
    DefaultCommonListViewProps,
    ListViewDataSource, ListViewDataSourceDataItem, ListViewDataSourceItem,
    ListViewItemId, ListViewState, NavigationOrientation
} from '../list-view/list-view-types';
import {TreeViewStateController} from './tree-view-state-controller';

type Context<T> = React.Context<T>;
const createContext = React.createContext;

export const TreeViewContext : Context<TreeViewContextData> = createContext(null);

interface TreeViewProps extends CommonListViewProps
{
    treeViewState: TreeViewState,
    dataSourcesArray: Array<ListViewDataSource<FlattenTreeNode<any>>>,
    onChange?: (event: TreeViewState) => void,
}

export class TreeViewComposable extends React.Component<TreeViewProps>
{
    static defaultProps = {
        ...DefaultCommonListViewProps
    };

    private listView = React.createRef<ListViewComposable>();

    render () {

        const {
            dataSourcesArray,
            treeViewState,
            onChange,
            ...listViewProps
        } = this.props;


        const {
            collapsedItemsIds,
            ...listViewState
        } = treeViewState;

        const treeViewContextData = {
            treeView: this
        };

        return (
            <TreeViewContext.Provider value={treeViewContextData}>
                <ListViewComposable
                    ref={this.listView}
                    dataSourcesArray={dataSourcesArray}
                    orientation={NavigationOrientation.Vertical}
                    keyboardHandler={(listView: ListViewComposable, event: React.KeyboardEvent<Element>) => {
                        const eventKey = event.key;

                        const currentItemId = listView.getCurrentItemId();
                        const currentItemMetadata = currentItemId !== null ? this.getTreeViewItemMetadata(currentItemId) : null;

                        if (!event.ctrlKey && !event.shiftKey)
                        {
                            if (eventKey === 'ArrowRight')
                            {
                                if (currentItemMetadata !== null && !currentItemMetadata.isExpanded)
                                {
                                    this.updateState(stateController => {
                                        stateController.toggleExpanded(currentItemId, true);
                                    })
                                }
                                else
                                {
                                    listView.updateState(stateController => {
                                        stateController.moveNext();

                                        if (this.listView.current.isSupportingSelection())
                                        {
                                            stateController.selectItem(stateController.getCurrentItemId(), {
                                                clearSelectionWhenNotSelectable: true
                                            })
                                        }
                                    });
                                }

                                return true;
                            }

                            if (eventKey === 'ArrowLeft')
                            {
                                if (currentItemMetadata !== null && currentItemMetadata.isExpanded && currentItemMetadata.hasChildren)
                                {
                                    this.updateState(stateController => {
                                        stateController.toggleExpanded(currentItemId, false);
                                    })
                                }
                                else
                                {
                                    const enabledAncestorNode = this.findEnabledAncestorNode(currentItemId);

                                    if (enabledAncestorNode)
                                    {
                                        listView.updateState(stateController => {
                                            stateController.moveToItem(enabledAncestorNode.id)

                                            if (this.listView.current.isSupportingSelection())
                                            {
                                                stateController.selectItem(stateController.getCurrentItemId(), {
                                                    clearSelectionWhenNotSelectable: true
                                                })
                                            }
                                        });
                                    }
                                }

                                return true;
                            }
                        }

                        return false;
                    }}
                    onChange={(updatedListViewState: ListViewState) => {
                        onChange({
                            collapsedItemsIds,
                            ...updatedListViewState
                        })
                    }}
                    listViewState={listViewState}
                    {...listViewProps}
                >
                    {this.props.children}
                </ListViewComposable>
            </TreeViewContext.Provider>
        )
    }

    public updateState (updateFunction: TreeViewStateUpdateFunction) {

        const stateController = new TreeViewStateController(this, this.listView.current);

        updateFunction(stateController);

        stateController.done();
    }

    public handleKeyboardEvent = (event: React.KeyboardEvent<Element>) : void => {
        return this.listView.current.handleKeyboardEvent(event);
    };

    public moveToItemBasedOnTypeAhead = (updatedTypeAheadValue: string, options: {selectItem: boolean} = {selectItem: true}) : void => {
        return this.listView.current.moveToItemBasedOnTypeAhead(updatedTypeAheadValue, options);
    };

    findEnabledAncestorNode (itemId: ListViewItemId) : TreeViewItemMetadata {

        const listView = this.listView.current;

        let ancestorNode = this.getTreeViewItemMetadata(itemId);
        while (ancestorNode)
        {
            ancestorNode = this.getTreeViewItemMetadata(ancestorNode.parentNodeId);

            if (ancestorNode && !listView.isDisabled(ancestorNode.id))
            {
                return ancestorNode;
            }
        }

        return null;
    }

    getTreeViewItemMetadata (itemId: ListViewItemId): TreeViewItemMetadata {
        const listViewItem: ListViewDataSourceDataItem<FlattenTreeNode<any>> = this.listView.current.getListViewItemById(itemId);

        if (listViewItem)
        {
            const {
                dataItem,
                ...listViewItemMetadata
            } = listViewItem;

            const {
                treeNodeDataItem,
                ...treeNodeMetadata
            } = dataItem;

            return {
                ...listViewItemMetadata,
                ...treeNodeMetadata
            }
        }
        else
        {
            return null;
        }

    }

    isExpanded (itemId: ListViewItemId) {
        return this.getTreeViewItemMetadata(itemId).isExpanded;
    }

    isCollapsed (itemId: ListViewItemId) {
        return !this.isExpanded(itemId);
    }

    public static createTreeDataSource<T> (rootNodes: Array<TreeNode<T>>, collapsedItemsIds?: Array<ListViewItemId> | Set<ListViewItemId>) {

        const resultArr: ListViewDataSource<FlattenTreeNode<T>> = [];

        const collapsedItemsIdsSet = collapsedItemsIds instanceof Set ? collapsedItemsIds : new Set(collapsedItemsIds);

        for (let rootNode of rootNodes)
        {
            createTreeDataSourceRec(rootNode, collapsedItemsIdsSet, false, null, 0, resultArr);
        }

        return resultArr;
    }
}

function createTreeDataSourceRec<T> (
    treeNode: TreeNode<T>,
    collapsedItemsIdsSet: Set<ListViewItemId>,
    isExcluded: boolean,
    parentNodeId: ListViewItemId,
    level: number,
    resultArr: ListViewDataSource<FlattenTreeNode<T>>
) {

    const itemId = treeNode.id;
    const isExpanded = !collapsedItemsIdsSet.has(itemId);
    const childNodes = treeNode.children;

    resultArr.push({
        dataItem: {
            treeNodeDataItem: treeNode.dataItem,
            parentNodeId,
            isExpanded,
            level,
            hasChildren: childNodes && childNodes.length > 0
        },
        id: itemId,
        typeAheadText: treeNode.typeAheadText,
        isSelectable: treeNode.isSelectable,
        isExcluded,
    });

    if (childNodes)
    {
        for (let childNode of childNodes)
        {
            createTreeDataSourceRec(childNode, collapsedItemsIdsSet, isExcluded || !isExpanded, itemId, level + 1, resultArr)
        }
    }
}