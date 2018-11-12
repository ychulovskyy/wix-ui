import * as React from 'react';
import {ListViewComposable, ListViewItemsView} from '../../list-view-composable';
import ItemStyle from './complex-list-view-story-item.st.css';
import HorizontalItemStyle from './complex-list-view-story-horizontal-item.st.css';
import RCDevSelectionListPanelButtonStyle from './complex-list-view-story-button.st.css';
import RCDevSelectionListPanelStyle from './complex-list-view-story.st.css';
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

export class SelectableItemsWithHeader extends React.PureComponent<{
    title: string,
    dataSource: any[]
}>
{
    render () {

        return (
            <>
                <h3>{this.props.title}</h3>
                <div>
                    <ListViewItemsView
                        dataSource={this.props.dataSource}
                        renderItem={(props: ListViewRenderItemProps<any>) => {
                            return (
                                <TextualItemView
                                    text={props.dataItem}
                                    {...props}
                                />
                            );
                        }}
                    />
                </div>
            </>
        );
    }
}

export class ComplexListViewStory extends React.Component
{
    render () {
        return (
            <div>
                <input type="text"/>
                <RCDevSelectionListViewBasic
                    className={RCDevSelectionListPanelStyle.section}
                />
                <div
                    className={RCDevSelectionListPanelStyle.separator}
                />
                <RCDevSelectionListViewBasicSingleSelection
                    className={RCDevSelectionListPanelStyle.section}
                />
                <div
                    className={RCDevSelectionListPanelStyle.separator}
                />
                <RCDevSelectionListViewBasicNoneSelection
                    className={RCDevSelectionListPanelStyle.section}
                />
                <div
                    className={RCDevSelectionListPanelStyle.separator}
                />
                <RCDevSelectionListView
                    className={RCDevSelectionListPanelStyle.section}
                />
                <div
                    className={RCDevSelectionListPanelStyle.separator}
                />
                <RCDevSelectionListViewBasicHorizontal
                    className={RCDevSelectionListPanelStyle.section}
                />
            </div>
        );
    }
}

interface RCDevSelectionListViewBasicState extends ListViewState
{
    maxNumber: number;
}

interface LanguageData
{
    langCode: string;
    language: string;
}

class RCDevSelectionListViewBasicHorizontal extends React.Component<any, any>
{

    private selectionList = React.createRef<ListViewComposable>();

    constructor (props: any) {
        super(props);

        this.state = {
            selectedIds: null,
            disabledIds: null,
            currentNavigatableItemId: null,
            selectionStartId: null,
            typeAheadValue: '',
        };
    }

    render () {

        const {
            selectionStartId,
            selectedIds,
            disabledIds,
            currentNavigatableItemId,
            typeAheadValue,
        } = this.state;

        return (
            <div
                {...this.props}
            >
                <h1>Selection List Horizontal - Single Selection</h1>
                <ListViewComposable
                    ref={this.selectionList}
                    className={RCDevSelectionListPanelStyle.selectionList}
                    dataSourcesArray={[languagesDataSource]}
                    orientation={NavigationOrientation.Horizontal}
                    disabledIds={disabledIds}
                    typeAheadClearTimeout={1000}
                    typeAhead
                    typeAheadValue={typeAheadValue}
                    tagName="div"
                    selectedIds={selectedIds}
                    selectionStartId={selectionStartId}
                    selectionType={ListViewSelectionType.Single}
                    currentNavigatableItemId={currentNavigatableItemId}
                    onChange={changeEvent => {
                        this.setState(changeEvent)
                    }}
                >
                    <ListViewItemsView
                        dataSource={languagesDataSource}
                        renderItem={props => {
                            return (
                                <HorizontalTextualItemView
                                    text={props.dataItem.language}
                                    {...props}
                                />
                            );
                        }}
                    />
                </ListViewComposable>
            </div>
        )
    }
}

const languagesDataSource = ListViewDataSource.createDataSource([
    {langCode: 'en', language: 'English'},
    {langCode: 'he', language: 'Hebrew'},
    {langCode: 'ru', language: 'Russian'},
    {langCode: 'fr', language: 'French'},
], {
    idFunction: (lang: LanguageData) => lang.langCode,
    typeAheadTextFunction: (lang: LanguageData) => lang.language,
    isSelectable: () => true,
});

class RCDevSelectionListViewBasic extends React.Component<any, RCDevSelectionListViewBasicState>
{

    private selectionList = React.createRef<ListViewComposable>();
    private fetchMoreButton = ListViewDataSource.createNavigatablePrimitiveValuesDataSource(['FetchMoreButton']);

    constructor (props: any) {
        super(props);

        this.state = {
            maxNumber: 6,
            selectedIds: null,
            disabledIds: null,
            currentNavigatableItemId: null,
            selectionStartId: null,
            typeAheadValue: '',
        };
    }

    render () {

        const {
            selectionStartId,
            selectedIds,
            disabledIds,
            currentNavigatableItemId,
            maxNumber,
        } = this.state;

        const group1 = ListViewDataSource.createSelectablePrimitiveValuesDataSource(
            arrayGenerate(maxNumber, i => (i + 1).toString()));

        return (
            <div
                {...this.props}
            >
                <h1>Selection List - Multiple Selection</h1>
                <ListViewComposable
                    ref={this.selectionList}
                    className={RCDevSelectionListPanelStyle.selectionList}
                    isCyclic
                    dataSourcesArray={[
                        group1,
                        this.fetchMoreButton,
                        languagesDataSource,
                    ]}
                    typeAheadNavigationType={TypeAheadNavigationType.StayOnCurrent}
                    orientation={NavigationOrientation.Vertical}
                    disabledIds={disabledIds}
                    typeAheadClearTimeout={1000}
                    typeAhead
                    typeAheadValue={this.state.typeAheadValue}
                    tagName="div"
                    selectedIds={selectedIds}
                    selectionStartId={selectionStartId}
                    selectionType={ListViewSelectionType.Multiple}
                    currentNavigatableItemId={currentNavigatableItemId}
                    onChange={changeEvent => {
                        this.setState(changeEvent)
                    }}
                >
                    <ListViewItemsView
                        dataSource={group1}
                        renderItem={props => {
                            return (
                                <TextualItemView
                                    text={props.dataItem}
                                    {...props}
                                />
                            );
                        }}
                    />
                    <ListViewItemsView
                        dataSource={this.fetchMoreButton}
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
                                        this.fetchMore();
                                    }}
                                    onKeyDown={(event: React.KeyboardEvent<Element>) => {

                                        if (event.key === 'Enter')
                                        {
                                            this.fetchMore();
                                        }
                                    }}
                                />
                            )
                        }}
                    />
                    <div
                        className={RCDevSelectionListPanelStyle.separator}
                    />
                    <ListViewItemsView
                        dataSource={languagesDataSource}
                        renderItem={props => {
                            return (
                                <TextualItemView
                                    text={props.dataItem.language}
                                    {...props}
                                />
                            );
                        }}
                    />
                </ListViewComposable>
            </div>
        )
    }

    private fetchMore () {
        this.setState({
            maxNumber: this.state.maxNumber + 3
        })
    }
}

class RCDevSelectionListViewBasicSingleSelection extends React.Component<any, RCDevSelectionListViewBasicState>
{

    private selectionList = React.createRef<ListViewComposable>();
    private fetchMoreButton = ListViewDataSource.createNavigatablePrimitiveValuesDataSource(['FetchMoreButton']);

    constructor (props: any) {
        super(props);

        this.state = {
            maxNumber: 6,
            selectedIds: null,
            disabledIds: null,
            currentNavigatableItemId: null,
            selectionStartId: null,
            typeAheadValue: '',
        };
    }

    render () {

        const {
            selectionStartId,
            selectedIds,
            disabledIds,
            currentNavigatableItemId,
            maxNumber,
        } = this.state;

        const group1 = ListViewDataSource.createSelectablePrimitiveValuesDataSource(
            arrayGenerate(maxNumber, i => (i + 1).toString()));

        return (
            <div
                {...this.props}
            >
                <h1>Selection List - Single Selection</h1>
                <ListViewComposable
                    ref={this.selectionList}
                    className={RCDevSelectionListPanelStyle.selectionList}
                    isCyclic
                    dataSourcesArray={[
                        group1,
                        this.fetchMoreButton,
                        languagesDataSource,
                    ]}
                    typeAheadNavigationType={TypeAheadNavigationType.StayOnCurrent}
                    orientation={NavigationOrientation.Vertical}
                    disabledIds={disabledIds}
                    typeAheadClearTimeout={1000}
                    typeAhead
                    typeAheadValue={this.state.typeAheadValue}
                    tagName="div"
                    selectedIds={selectedIds}
                    selectionStartId={selectionStartId}
                    selectionType={ListViewSelectionType.Single}
                    currentNavigatableItemId={currentNavigatableItemId}
                    onChange={changeEvent => {
                        this.setState(changeEvent)
                    }}
                >
                    <ListViewItemsView
                        dataSource={group1}
                        renderItem={props => {
                            return (
                                <TextualItemView
                                    text={props.dataItem}
                                    {...props}
                                />
                            );
                        }}
                    />
                    <ListViewItemsView
                        dataSource={this.fetchMoreButton}
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
                                        this.fetchMore();
                                    }}
                                    onKeyDown={(event: React.KeyboardEvent<Element>) => {

                                        if (event.key === 'Enter')
                                        {
                                            this.fetchMore();
                                        }
                                    }}
                                />
                            )
                        }}
                    />
                    <div
                        className={RCDevSelectionListPanelStyle.separator}
                    />
                    <ListViewItemsView
                        dataSource={languagesDataSource}
                        renderItem={props => {
                            return (
                                <TextualItemView
                                    text={props.dataItem.language}
                                    {...props}
                                />
                            );
                        }}
                    />
                </ListViewComposable>
            </div>
        )
    }

    private fetchMore () {
        this.setState({
            maxNumber: this.state.maxNumber + 3
        })
    }
}

class RCDevSelectionListViewBasicNoneSelection extends React.Component<any, RCDevSelectionListViewBasicState>
{

    private selectionList = React.createRef<ListViewComposable>();
    private fetchMoreButton = ListViewDataSource.createNavigatablePrimitiveValuesDataSource(['FetchMoreButton']);

    constructor (props: any) {
        super(props);

        this.state = {
            maxNumber: 6,
            selectedIds: null,
            disabledIds: null,
            currentNavigatableItemId: null,
            selectionStartId: null,
            typeAheadValue: '',
        };
    }

    render () {

        const {
            selectionStartId,
            selectedIds,
            disabledIds,
            currentNavigatableItemId,
            maxNumber,
        } = this.state;

        const group1 = ListViewDataSource.createSelectablePrimitiveValuesDataSource(
            arrayGenerate(maxNumber, i => (i + 1).toString()));

        return (
            <div
                {...this.props}
            >
                <h1>List View - Without Selection</h1>
                <ListViewComposable
                    ref={this.selectionList}
                    className={RCDevSelectionListPanelStyle.selectionList}
                    isCyclic
                    dataSourcesArray={[
                        group1,
                        this.fetchMoreButton,
                        languagesDataSource,
                    ]}
                    typeAheadNavigationType={TypeAheadNavigationType.StayOnCurrent}
                    orientation={NavigationOrientation.Vertical}
                    disabledIds={disabledIds}
                    typeAheadClearTimeout={1000}
                    typeAhead
                    typeAheadValue={this.state.typeAheadValue}
                    tagName="div"
                    selectedIds={selectedIds}
                    selectionStartId={selectionStartId}
                    selectionType={ListViewSelectionType.None}
                    currentNavigatableItemId={currentNavigatableItemId}
                    onChange={changeEvent => {
                        this.setState(changeEvent)
                    }}
                >
                    <ListViewItemsView
                        dataSource={group1}
                        renderItem={props => {
                            return (
                                <TextualItemView
                                    text={props.dataItem}
                                    {...props}
                                />
                            );
                        }}
                    />
                    <ListViewItemsView
                        dataSource={this.fetchMoreButton}
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
                                        this.fetchMore();
                                    }}
                                    onKeyDown={(event: React.KeyboardEvent<Element>) => {

                                        if (event.key === 'Enter')
                                        {
                                            this.fetchMore();
                                        }
                                    }}
                                />
                            )
                        }}
                    />
                    <div
                        className={RCDevSelectionListPanelStyle.separator}
                    />
                    <ListViewItemsView
                        dataSource={languagesDataSource}
                        renderItem={props => {
                            return (
                                <TextualItemView
                                    text={props.dataItem.language}
                                    {...props}
                                />
                            );
                        }}
                    />
                </ListViewComposable>
            </div>
        )
    }

    private fetchMore () {
        this.setState({
            maxNumber: this.state.maxNumber + 3
        })
    }
}


interface RCDevSelectionListPanelState extends ListViewState
{
    filterItems: boolean,
    useTypeAhead: boolean,
    typeAheadValue: string
}

class RCDevSelectionListView extends React.Component<any, RCDevSelectionListPanelState>
{

    private selectionList = React.createRef<ListViewComposable>();

    constructor (props: any) {
        super(props);

        this.state = {
            selectedIds: null,
            disabledIds: null,
            filterItems: false,
            useTypeAhead: true,
            currentNavigatableItemId: null,
            selectionStartId: null,
            typeAheadValue: '',
        };
    }

    render () {

        const {
            filterItems,
            selectionStartId,
            selectedIds,
            disabledIds,
            currentNavigatableItemId
        } = this.state;

        const unfilteredDataSource1 = ['ba', 'bb', 'bbc', 'a', 'dde', 'aaf', 'bg'];

        const filteredDataSource1 = unfilteredDataSource1.filter((item, index) => {
            return index % 2 === 0
        });

        const dataSource1 = filterItems ?
            ListViewDataSource.createSelectablePrimitiveValuesDataSource(filteredDataSource1) :
            ListViewDataSource.createSelectablePrimitiveValuesDataSource(unfilteredDataSource1);

        const dataSource2 = ListViewDataSource.createSelectablePrimitiveValuesDataSource(['Israel', 'USA', 'Russia', 'Canada']);
        const dataSource3 = ListViewDataSource.createSelectablePrimitiveValuesDataSource(['1', '2', '3', '4']);

        return (
            <div
                {...this.props}
            >
                <div>
                    <input
                        type="checkbox"
                        checked={this.state.filterItems}
                        onChange={event => {
                            this.setState({
                                filterItems: event.target.checked
                            })
                        }}
                    />
                    Filter Items
                </div>
                <div>
                    <input
                        type="checkbox"
                        checked={this.state.useTypeAhead}
                        onChange={event => {
                            this.setState({
                                useTypeAhead: event.target.checked
                            })
                        }}
                    />
                    Use Type Ahead
                </div>
                <h1>Selection List 2</h1>
                <input
                    type="text"
                    onChange={event => {
                        this.selectionList.current.moveToItemBasedOnTypeAhead(event.target.value);
                    }}
                    style={{
                        width: '100%',
                        marginBottom: 10
                    }}
                    onKeyDown={(event: React.KeyboardEvent<Element>) => {

                        const eventKey = event.key;

                        if (eventKey === 'ArrowDown' || eventKey === 'ArrowUp' || (eventKey === ' ' && (event.ctrlKey || event.shiftKey)))
                        {
                            this.selectionList.current.handleKeyboardEvent(event);

                        }
                    }}
                />
                <ListViewComposable
                    ref={this.selectionList}
                    dataSourcesArray={[
                        dataSource1,
                        dataSource2,
                        dataSource3
                    ]}
                    typeAheadNavigationType={TypeAheadNavigationType.StayOnCurrent}
                    typeAhead={this.state.useTypeAhead}
                    typeAheadValue={this.state.typeAheadValue}
                    tagName="div"
                    className={RCDevSelectionListPanelStyle.selectionList}
                    selectedIds={selectedIds}
                    disabledIds={disabledIds}
                    selectionStartId={selectionStartId}
                    typeAheadClearTimeout={1000}
                    selectionType={ListViewSelectionType.Multiple}
                    currentNavigatableItemId={currentNavigatableItemId}
                    onChange={listViewState => {
                        this.setState(listViewState);
                    }}
                >
                    <div>
                        Focusable element that's not marked as navigatable:&nbsp;
                        <input type="text"/>
                    </div>

                    <SelectableItemsWithHeader
                        title="Group 1"
                        dataSource={dataSource1}
                    />
                    <SelectableItemsWithHeader
                        title="Group 2"
                        dataSource={dataSource2}
                    />
                    <SelectableItemsWithHeader
                        title="Group 3"
                        dataSource={dataSource3}
                    />
                </ListViewComposable>
            </div>
        )
    }
}

type TextualItemViewProps = {
    text: string,
} & ListViewRenderItemProps<any>

interface ItemButtonInfo {
    title: string,
    action: (itemId: ListViewItemId, stateController: ListViewStateController) => void
}

const itemButtonsInfoArr: ItemButtonInfo[] = [
    {
        title: 'Select',
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
        action: (itemId, stateController) => {
            stateController
                .removeItemFromSelection(itemId)
                .moveToItem(itemId);
        }
    },
    {
        title: 'ToggleSelection',
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
        triggerInteractiveSelection
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
                {text}
                {
                    itemButtonsInfoArr.map(selectionInfo => {
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

const HorizontalTextualItemView: React.SFC<TextualItemViewProps> =props => {

    const {
        isSelected,
        isCurrent,
        text,
        listViewItemRoot,
        triggerInteractiveSelection,
    } = props;

    return (
        <span
            {...listViewItemRoot()}
            {...HorizontalItemStyle('root', {selected: isSelected, current: isCurrent})}
            onClick={triggerInteractiveSelection}
        >
            {text}
        </span>
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