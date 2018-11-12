import {ListViewItemId} from '../list-view/list-view-types';
import {TreeNode} from './tree-view-types';

interface NodeInfo {
    indexInTree: number,
    isLeaf: boolean,
    indexInParent: number
}

type CreateRandomTreeValueFunction<T> = (nodeInfo: NodeInfo) => {
    dataItem: T,
    id: ListViewItemId,
    typeAheadText?: string,
    isSelectable: boolean
};

interface CreateRandomTreeRecState<T> {
    currentIndex: number,
    valueFunction: CreateRandomTreeValueFunction<T>,
    itemsInLevels: Array<[number, number?]>
}

export function createRandomTree<T> (itemsInLevels: Array<[number, number?]>, valueFunction: CreateRandomTreeValueFunction<T>)
{
    const rootNodesArr: Array<TreeNode<T>> = [];

    createRandomTreeRec(rootNodesArr, 0, {
        valueFunction,
        itemsInLevels,
        currentIndex: 0
    });

    return rootNodesArr;
}

function createRandomTreeRec<T> (targetChildrenArr: Array<TreeNode<T>>, currentLevel: number, contextData: CreateRandomTreeRecState<T>) {

    const itemsInLevels = contextData.itemsInLevels;

    const [minItemsInLevel, maxItemsInLevel] = itemsInLevels[currentLevel];

    const randomItemsInLevelCount = maxItemsInLevel !== undefined ? randomInRange(minItemsInLevel, maxItemsInLevel) : minItemsInLevel;
    // const randomItemsInLevelCount = itemsInLevel;

    for (let i = 0; i < randomItemsInLevelCount; i++)
    {
        const hasChildren = currentLevel < itemsInLevels.length - 1;

        const currentIndex = contextData.currentIndex++;

        const item: TreeNode<T> = {
            ...contextData.valueFunction({
                indexInParent: i,
                indexInTree: currentIndex,
                isLeaf: !hasChildren
            })
        };

        targetChildrenArr.push(item);

        if (hasChildren)
        {
            const children = item.children = new Array<TreeNode<T>>();

            createRandomTreeRec(children, currentLevel + 1, contextData)
        }
    }
}

function randomInRange (from: number, to: number) {
    return Math.floor(Math.random() * (to - from + 1)) + from;
}