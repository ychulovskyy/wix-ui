import * as React from 'react';
import {ListViewComposable, ListViewItemsView} from '../../list-view-composable';
import ItemStyle from './complex-list-view-story-item.st.css';
import RCDevSelectionListPanelButtonStyle from './complex-list-view-story-button.st.css';
import RCDevSelectionListPanelStyle from './complex-list-view-story.st.css';
import SelectionTypeItemStyle from './complex-list-view-story-horizontal-item.st.css'
import * as ListViewDataSource from '../../list-view-data-source';
import {
    ListViewItemId,
    ListViewRenderItemProps,
    ListViewSelectionType,
    ListViewState,
    NavigationOrientation,
    TypeAheadNavigationType
} from '../../list-view-types';
import {ListViewStateController} from '../../list-view-state-controller';
import {ListView} from '../../list-view';

export class ComplexListViewStory extends React.Component
{
    render () {
        return (
            <div>
                <RCDevSelectionListViewBasic
                    className={RCDevSelectionListPanelStyle.section}
                />
            </div>
        );
    }
}

interface RCDevSelectionListViewBasicState extends ListViewState
{
    useTypeAhead: boolean,
    allProductsCount: number,
    recommendedProductsCount: number,
    typeAheadValue: string,
    selectionType: ListViewSelectionType,
}

interface SelectionTypeInfo {
    title: string,
    selectionType: ListViewSelectionType,
}

const selectionTypes = [
    {
        selectionType: ListViewSelectionType.Multiple,
        title: 'Multiple'
    },
    {
        selectionType: ListViewSelectionType.Single,
        title: 'Single'
    },
    {
        selectionType: ListViewSelectionType.None,
        title: 'None'
    }
];

const selectionTypesMap = selectionTypes.reduce(function(map, selectionTypeItem) {
    map[selectionTypeItem.selectionType] = selectionTypeItem;
    return map;
}, {});

const dataSource = ListViewDataSource.createDataSource(selectionTypes, {
    idFunction: item => item.selectionType,
    typeAheadTextFunction: item => item.title,
    isSelectable: () => true,
});

class RCDevSelectionListViewBasic extends React.Component<any, RCDevSelectionListViewBasicState>
{

    private selectionList = React.createRef<ListViewComposable>();
    private selectionTypeListView = React.createRef<ListView<SelectionTypeInfo>>();

    private fetchMoreButtonAll = ListViewDataSource.createNavigatablePrimitiveValuesDataSource(['FetchMoreButtonAll']);
    private fetchMoreButtonRecommended = ListViewDataSource.createNavigatablePrimitiveValuesDataSource(['FetchMoreButtonRecommended']);


    constructor (props: any) {
        super(props);

        this.state = {
            allProductsCount: 6,
            recommendedProductsCount: 4,
            selectedIds: null,
            disabledIds: null,
            currentNavigatableItemId: null,
            selectionStartId: null,
            typeAheadValue: '',
            useTypeAhead: true,
            selectionType: ListViewSelectionType.Multiple,
        };
    }

    render () {

        const {
            selectionStartId,
            selectedIds,
            disabledIds,
            currentNavigatableItemId,
            allProductsCount,
            recommendedProductsCount,
            typeAheadValue,
            useTypeAhead,
            selectionType,
        } = this.state;

        const otherProducts = ListViewDataSource.createSelectablePrimitiveValuesDataSource(
            arrayGenerate(allProductsCount, i => 'Product ' + (i + 1)));

        const recommendedProducts = ListViewDataSource.createSelectablePrimitiveValuesDataSource(
            arrayGenerate(recommendedProductsCount, i => 'Recommended Product ' + (i + 1)));

        return (
            <div
                {...this.props}
            >
                <h1>Selection List Complex</h1>
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginBottom: "20px"
                    }}
                >
                    <div
                        style={{
                            marginRight: 20,
                            paddingRight: 20,
                            borderRight: '1px solid #aaa'
                        }}
                    >
                        <input
                            type="checkbox"
                            checked={useTypeAhead}
                            onChange={event => {
                                this.setState({
                                    useTypeAhead: event.target.checked
                                })
                            }}
                        />
                        Use Type Ahead
                    </div>
                    <ListView
                        ref={this.selectionTypeListView}
                        dataSource={dataSource}
                        typeAhead={false}
                        selectedIds={[selectionType]}
                        onChange={updatedState => {
                            const selectedId = updatedState.selectedIds.length > 0 ? updatedState.selectedIds[0] : ListViewSelectionType.None;
                            this.setState({
                                selectionType: selectionTypesMap[selectedId].selectionType,
                                selectedIds: [],
                            });
                        }}
                        orientation={NavigationOrientation.Horizontal}
                        typeAheadNavigationType={TypeAheadNavigationType.StayOnCurrent}
                        selectionType={ListViewSelectionType.Single}
                        renderItem={SelectionTypeViewItem}
                    />

                </div>
                <input
                    type="text"
                    style={{
                        width: '100%',
                        marginBottom: 10
                    }}
                    onChange={event => {
                        this.selectionList.current.moveToItemBasedOnTypeAhead(event.target.value);
                    }}
                    onKeyDown={(event: React.KeyboardEvent<Element>) => {

                        const eventKey = event.key;

                        if (eventKey === 'ArrowDown' || eventKey === 'ArrowUp' || (eventKey === ' ' && (event.ctrlKey || event.shiftKey )))
                        {
                            this.selectionList.current.handleKeyboardEvent(event);
                        }
                    }}
                />
                <ListViewComposable
                    ref={this.selectionList}
                    className={RCDevSelectionListPanelStyle.selectionList}
                    isCyclic
                    dataSourcesArray={[
                        recommendedProducts,
                        this.fetchMoreButtonRecommended,
                        otherProducts,
                        this.fetchMoreButtonAll,
                    ]}
                    typeAheadNavigationType={TypeAheadNavigationType.StayOnCurrent}
                    orientation={NavigationOrientation.Vertical}
                    disabledIds={disabledIds}
                    typeAheadClearTimeout={1000}
                    typeAhead={useTypeAhead}
                    typeAheadValue={this.state.typeAheadValue}
                    tagName="div"
                    selectedIds={selectedIds}
                    selectionStartId={selectionStartId}
                    selectionType={selectionType}
                    currentNavigatableItemId={currentNavigatableItemId}
                    onChange={changeEvent => {
                        this.setState(changeEvent)
                    }}
                >
                    <h2>Recommended Products</h2>
                    <ListViewItemsView
                        dataSource={recommendedProducts}
                        contextArg={{
                            selectionType
                        }}
                        contextArgEqualityComparer={contextArgComparer}
                        renderItem={renderProps => {
                            return (
                                <TextualItemView
                                    text={renderProps.dataItem}
                                    {...renderProps}
                                />
                            );
                        } }
                    />
                    <ListViewItemsView
                        dataSource={this.fetchMoreButtonRecommended}
                        renderItem={props => {

                            const {
                                isCurrent,
                                listViewItemRoot
                            } = props;

                            return (
                                <div
                                    {...listViewItemRoot()}
                                    {...RCDevSelectionListPanelButtonStyle('root', {focused: isCurrent})}
                                    children="Fetch More"
                                    onClick={() => {
                                        this.fetchMoreRecommendedProducts();
                                    }}
                                    onKeyDown={(event: React.KeyboardEvent<Element>) => {

                                        if (event.key === 'Enter')
                                        {
                                            this.fetchMoreRecommendedProducts();
                                        }
                                    }}
                                />
                            )
                        }}
                    />
                    <div
                        className={RCDevSelectionListPanelStyle.separator}
                    />
                    <h2>All Products</h2>
                    <ListViewItemsView
                        dataSource={otherProducts}
                        contextArg={{
                            selectionType
                        }}
                        contextArgEqualityComparer={contextArgComparer}
                        renderItem={renderProps => {
                            return (
                                <TextualItemView
                                    text={renderProps.dataItem}
                                    {...renderProps}
                                />
                            );
                        }}
                    />
                    <ListViewItemsView
                        dataSource={this.fetchMoreButtonAll}
                        renderItem={props => {

                            const {
                                isCurrent,
                                listViewItemRoot
                            } = props;

                            return (
                                <div
                                    {...listViewItemRoot()}
                                    {...RCDevSelectionListPanelButtonStyle('root', {focused: isCurrent})}
                                    children="Fetch More"
                                    onClick={() => {
                                        this.fetchMoreToAllProducts();
                                    }}
                                    onKeyDown={(event: React.KeyboardEvent<Element>) => {

                                        if (event.key === 'Enter')
                                        {
                                            this.fetchMoreToAllProducts();
                                        }
                                    }}
                                />
                            )
                        }}
                    />

                </ListViewComposable>
            </div>
        )
    }

    private fetchMoreToAllProducts () {
        this.setState({
            allProductsCount: this.state.allProductsCount + 3
        })
    }

    private fetchMoreRecommendedProducts () {
        this.setState({
            recommendedProductsCount: this.state.recommendedProductsCount + 3
        })
    }
}

interface RCDevSelectionListPanelState extends ListViewState
{
    filterItems: boolean,
    useTypeAhead: boolean,
    typeAheadValue: string
}

type TextualItemViewProps = {
    text: string
} & ListViewRenderItemProps<any, {selectionType: ListViewSelectionType}>


interface ItemButtonInfo {
    title: string,
    isSingle?: boolean,
    isForNoneSelectable?: boolean,
    action: (itemId: ListViewItemId, stateController: ListViewStateController) => void
}

const itemButtonsInfoArr: ItemButtonInfo[] = [
    {
        title: 'Select',
        isSingle: true,
        action: (itemId, stateController) => {
            stateController
                .selectItem(itemId)
                .moveToItem(itemId);
        }
    },
    {
        title: 'AddToSelection',
        action: (itemId, stateController) => {
            stateController
                .addItemToSelection(itemId)
                .moveToItem(itemId);
        }
    },
    {
        title: 'RemoveFromSelection',
        isSingle: true,
        action: (itemId, stateController) => {
            stateController
                .removeItemFromSelection(itemId)
                .moveToItem(itemId);
        }
    },
    {
        title: 'ToggleSelection',
        isSingle: true,
        action: (itemId, stateController) => {
            stateController
                .toggleItemSelection(itemId)
                .moveToItem(itemId);
        }
    },
    {
        title: 'SelectRange',
        action: (itemId, stateController) => {
            stateController
                .selectItemsInRange(stateController.getSelectionStartId(), itemId)
                .moveToItem(itemId);
        }
    },
    {
        title: 'ToggleDisable',
        isForNoneSelectable: true,
        action: (itemId, stateController) => {
            let isDisabled = stateController.isDisabled(itemId);
            stateController.toggleItemDisabled(itemId);

            if (isDisabled)
            {
                stateController.moveToItem(itemId);
            }
        }
    },
];

const TextualItemView: React.SFC<TextualItemViewProps> =props => {

    const {
        isSelected,
        isCurrent,
        text,
        listViewItemRoot,
        innerFocusableItem,
        updateState,
        dataItemId,
        triggerInteractiveSelection,
        contextArg: {
            selectionType
        }
    } = props;

    return (
        <div
            style={{
                paddingLeft: 50
            }}
        >
            <div
                {...listViewItemRoot()}
                {...ItemStyle('root', {selected: isSelected, current: isCurrent})}
                onClick={triggerInteractiveSelection}
            >
                <div
                    className={ItemStyle.innerText}
                >
                    {text}
                </div>
                {
                    itemButtonsInfoArr.filter((item) => {
                        if(selectionType === ListViewSelectionType.Multiple){
                            return true;
                        }
                        else if(selectionType === ListViewSelectionType.Single){
                            return !!item.isSingle || !!item.isForNoneSelectable;
                        }
                        else if(selectionType ===ListViewSelectionType.None){
                            return !!item.isForNoneSelectable;
                        }
                    }).map(selectionInfo => {
                        return (
                            <button
                                key={selectionInfo.title}
                                className={ItemStyle.innerButton}
                                children={selectionInfo.title}
                                onClick={event => {
                                    event.stopPropagation();

                                    updateState(stateController => {
                                        selectionInfo.action(dataItemId, stateController);
                                    });
                                }}
                                {...innerFocusableItem()}
                            />
                        )
                    })
                }
            </div>
        </div>
    )
};

const SelectionTypeViewItem: React.SFC<ListViewRenderItemProps<SelectionTypeInfo,null>> = renderProps => {

    const {
        isSelected,
        triggerInteractiveSelection,
        listViewItemRoot,
        dataItem
    } = renderProps;

    return (
        <div
            {...listViewItemRoot()}
            {...SelectionTypeItemStyle('root', {selected: isSelected})}
            onClick={triggerInteractiveSelection}
        >
            {dataItem.title}
        </div>
    )

};


export function arrayGenerate<T> (count: number, generator: (index: number) => T) : Array<T> {

    const result = [];

    for (let i = 0; i < count; i++)
    {
        result.push(generator(i));
    }

    return result;
}

function contextArgComparer(contextArg1, contextArg2){
    return contextArg1.selectionType === contextArg2.selectionType;
}