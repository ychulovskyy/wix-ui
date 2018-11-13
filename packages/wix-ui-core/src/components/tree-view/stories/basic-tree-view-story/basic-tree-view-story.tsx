import * as React from 'react';
import style from './basic-tree-view-story.st.css';
import {createRandomTree} from '../../tree-view-dev-utils';
import {TreeView} from '../../tree-view';
import {TreeViewDefaultState, TreeViewState} from '../../tree-view-types';
import {ListViewSelectionType, TypeAheadNavigationType} from '../../../list-view/list-view-types';
import {ListView} from '../../../list-view/list-view';


type TreeViewDataItem = {
    fileName: string
};

const tree = createRandomTree([[5],[3],[2],[3]], info => {
    
    const {
        indexInTree    
    } = info;
    
    const fileName = info.isLeaf ? `file-${indexInTree}.txt` : `folder-${indexInTree}`;
    
    return {
        dataItem: {
            fileName
        },
        id: indexInTree,
        typeAheadText: fileName,
        isSelectable: true
    }
});

interface BasicTreeViewStoryState extends TreeViewState
{
}

export class BasicTreeViewStory extends React.Component<{}, BasicTreeViewStoryState>
{
    state = {
        ...TreeViewDefaultState
    };

    private treeView = React.createRef<TreeView<TreeViewDataItem, {}>>();

    render () {

        const {
            collapsedItemsIds,
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
                    <input
                        type="text"
                        onChange={event => {
                            this.treeView.current.moveToItemBasedOnTypeAhead(event.target.value);
                        }}
                        style={{
                            height: 24,
                            padding: '0 10px',
                            width: '300px',
                        }}
                        onKeyDown={(event: React.KeyboardEvent<Element>) => {

                            const eventKey = event.key;

                            if (eventKey === 'ArrowDown' || eventKey === 'ArrowUp' || (eventKey === ' ' && (event.ctrlKey || event.shiftKey )))
                            {
                                this.treeView.current.handleKeyboardEvent(event);
                            }
                        }}
                    />
                </div>
                <div
                    style={{
                        padding: 20,
                    }}
                >
                    <TreeView
                        ref={this.treeView}
                        collapsedItemsIds={collapsedItemsIds}
                        typeAheadNavigationType={TypeAheadNavigationType.StayOnCurrent}
                        typeAheadClearTimeout={1000}
                        selectionType={ListViewSelectionType.Multiple}
                        {...listViewStateProps}
                        onChange={changeEvent => {
                            this.setState(changeEvent)
                        }}
                        renderItem={renderProps => {

                            const dataItem = renderProps.dataItem;

                            return (
                                <div
                                    {...style('treeItemRoot', {selected: renderProps.isSelected, current: renderProps.isCurrent})}
                                    style={{
                                        paddingLeft: renderProps.level * 20
                                    }}
                                >
                                    <i
                                        {...style('treeItemIcon', {hasChildren: renderProps.hasChildren}, {
                                            className: (() => {

                                                if (renderProps.hasChildren)
                                                {
                                                    if (renderProps.isExpanded)
                                                    {
                                                        return 'fas fa-folder-open';
                                                    }
                                                    else
                                                    {
                                                        return 'fas fa-folder';
                                                    }
                                                }
                                                else
                                                {
                                                    return 'far fa-file'
                                                }

                                            })()
                                        })}
                                        onClick={() => {
                                            renderProps.updateTreeViewState(stateController => {
                                                stateController.toggleExpanded(renderProps.dataItemId)
                                            })
                                        }}
                                    />
                                    <div
                                        {...renderProps.listViewItemRoot()}
                                        {...style('treeItemContent')}
                                        onClick={renderProps.triggerInteractiveSelection}
                                    >
                                        {dataItem.fileName}
                                    </div>
                                </div>
                            )
                        }}
                    >
                        {tree}
                    </TreeView>
                </div>
            </div>
        )
    }
}