import {ListViewComposable} from '../list-view/list-view-composable';
import {TreeViewComposable} from './tree-view-composable';
import {ListViewItemId} from '../list-view/list-view-types';
import {arrayClone} from '../list-view/list-view-utils';
import {TreeViewStateFields} from './tree-view-types';
import {ListViewStateController} from '../list-view/list-view-state-controller';

export class TreeViewStateController extends ListViewStateController
{
    private currentTreeViewState: TreeViewStateFields;

    constructor(private treeView: TreeViewComposable, listView: ListViewComposable) {
        super(listView);

        const {
            collapsedItemsIds
        } = treeView.props;

        this.setCurrentTreeViewStateState({
            collapsedItemsIds,
        });
    }

    public done () {
        if (this.isDirty)
        {
            this.treeView.props.onChange({
                ...this.currentState,
                ...this.currentTreeViewState
            });
        }
    }

    private setCurrentTreeViewStateState (currentTreeViewState: TreeViewStateFields) {
        this.currentTreeViewState = currentTreeViewState;
        this.isDirty = true;
    };

    toggleExpanded (itemId: ListViewItemId, isExpanded?: boolean) {

        const {
            collapsedItemsIds,
        } = this.currentTreeViewState;

        const treeView = this.treeView;

        if (isExpanded === undefined)
        {
            isExpanded = !treeView.isExpanded(itemId);
        }

        const updatedCollapsedItemsIds = arrayClone(collapsedItemsIds);

        const itemIndex = updatedCollapsedItemsIds.indexOf(itemId);

        if (itemIndex >= 0)
        {
            if (isExpanded)
            {
                updatedCollapsedItemsIds.splice(itemIndex, 1);
            }
        }
        else
        {
            if (!isExpanded)
            {
                updatedCollapsedItemsIds.push(itemId);
            }
        }

        this.setCurrentTreeViewStateState({
            collapsedItemsIds: updatedCollapsedItemsIds
        });


    }
}