import * as React from "react";
import * as ReactDOM from "react-dom";
import {domFindAncestor} from "./list-view-utils";
import {ListViewContextData} from "./list-view";
import {
    DataItemsEqualityComparer, defaultDataItemsEqualityComparer,
    ListViewItemId,
    ListViewRenderItem,
    ListViewRenderItemProps
} from "./list-view-types";

export interface ListViewItemViewWrapperProps<T>
{
    key: string | number,
    id: ListViewItemId,
    isCurrentNavigatableItem: boolean,
    renderProps: ListViewRenderItemProps<T>,
    renderItem: ListViewRenderItem<T>,
    listViewContextData: ListViewContextData,
    dataItemEqualityComparer: DataItemsEqualityComparer<T>
}

export class ListViewItemViewWrapper<T> extends React.Component<ListViewItemViewWrapperProps<T>>
{
    static defaultProps = {
        dataItemEqualityComparer: defaultDataItemsEqualityComparer
    };


    render () {
        return (
            <React.Fragment>
                {this.props.renderItem(this.props.renderProps)}
            </React.Fragment>
        );
    }

    shouldComponentUpdate (nextProps: Readonly<ListViewItemViewWrapperProps<T>>) {

        const currentRenderProps = this.props.renderProps;
        const nextRenderProps = nextProps.renderProps;
        const dataItemEqualityComparer = this.props.dataItemEqualityComparer;

        return (
            !dataItemEqualityComparer(currentRenderProps.dataItem, nextRenderProps.dataItem) ||
            currentRenderProps.dataItemId !== nextRenderProps.dataItemId ||
            currentRenderProps.isCurrent !== nextRenderProps.isCurrent ||
            currentRenderProps.isDisabled !== nextRenderProps.isDisabled ||
            currentRenderProps.isSelected !== nextRenderProps.isSelected
        );
    }

    componentDidMount () {
        const {
            id,
            listViewContextData
        } = this.props;

        this.focusWhenCurrentNavigatableItem(listViewContextData.isItemShouldBeFocusedWhenRendered(id));
        listViewContextData.handleItemRendered(id);
    }

    componentDidUpdate (prevProps: Readonly<ListViewItemViewWrapperProps<T>>) {
        if (prevProps.isCurrentNavigatableItem !== this.props.isCurrentNavigatableItem)
        {
            this.focusWhenCurrentNavigatableItem();
        }
    }

    focusWhenCurrentNavigatableItem (forceFocus: boolean = false) {

        const {
            isCurrentNavigatableItem,
            listViewContextData,
        } = this.props;

        let navigationListId = listViewContextData.navigationListId;
        let listView = listViewContextData.listView;

        if (isCurrentNavigatableItem)
        {
            const element = ReactDOM.findDOMNode(this) as HTMLElement;
            const listViewElement = ReactDOM.findDOMNode(listView) as HTMLElement;

            const elementToFocus = element.getAttribute('data-navigatable-item') === navigationListId ?
                element :
                element.querySelector(`[data-navigatable-item='${navigationListId}']`) as HTMLElement;

            const shouldFocusElement = forceFocus ||
                                       domFindAncestor(document.activeElement as HTMLElement, element => element === listViewElement, true)

            if (elementToFocus && shouldFocusElement)
            {
                elementToFocus.focus();
            }
        }
    }
}