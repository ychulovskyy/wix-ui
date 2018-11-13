import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {domFindAncestor} from './list-view-utils';
import {ListViewContextData} from './list-view-composable';
import {
    EqualityComparer, defaultContextArgsEqualityComparer, defaultDataItemsEqualityComparer,
    ListViewItemId,
    ListViewRenderItem,
    ListViewRenderItemProps
} from './list-view-types';
import {Attributes} from 'react';

interface ListViewItemViewWrapperProps<T,S>
{
    id: ListViewItemId,
    renderProps: ListViewRenderItemProps<T,S>,
    renderItem: ListViewRenderItem<T, S>,
    listViewContextData: ListViewContextData,
    dataItemEqualityComparer: EqualityComparer<T>,
    contextArgEqualityComparer?: EqualityComparer<S>;
}

export class ListViewItemViewWrapper<T,S> extends React.Component<ListViewItemViewWrapperProps<T,S>>
{
    static defaultProps = {
        dataItemEqualityComparer: defaultDataItemsEqualityComparer,
        contextArgEqualityComparer: defaultContextArgsEqualityComparer,
    };

    render () {
        const {
            renderProps,
            renderItem,
        } = this.props;

        return renderItem(renderProps);
    }

    shouldComponentUpdate (nextProps: Readonly<ListViewItemViewWrapperProps<T,S>>) {

        const currentRenderProps = this.props.renderProps;
        const nextRenderProps = nextProps.renderProps;
        const dataItemEqualityComparer = this.props.dataItemEqualityComparer;
        const contextArgEqualityComparer = this.props.contextArgEqualityComparer;

        return (
            !contextArgEqualityComparer(currentRenderProps.contextArg, nextRenderProps.contextArg) ||
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

        this.focusWhenCurrentListViewItem(listViewContextData.isItemShouldBeFocusedWhenRendered(id));
        listViewContextData.handleItemRendered(id);
    }

    componentDidUpdate (prevProps: Readonly<ListViewItemViewWrapperProps<T,S>>) {
        if (prevProps.renderProps.isCurrent !== this.props.renderProps.isCurrent)
        {
            this.focusWhenCurrentListViewItem();
        }
    }

    focusWhenCurrentListViewItem (forceFocus: boolean = false) {

        const {
            listViewContextData,
            renderProps
        } = this.props;

        let navigationListId = listViewContextData.navigationListId;
        let listView = listViewContextData.listView;

        if (renderProps.isCurrent)
        {
            const element = ReactDOM.findDOMNode(this) as HTMLElement;
            const listViewElement = ReactDOM.findDOMNode(listView) as HTMLElement;

            const elementToFocus = element.getAttribute('data-navigatable-item') === navigationListId ?
                element :
                element.querySelector(`[data-navigatable-item='${navigationListId}']`) as HTMLElement;

            const shouldFocusElement = forceFocus ||
                                       domFindAncestor(document.activeElement as HTMLElement, el => el === listViewElement, true)

            if (elementToFocus && shouldFocusElement)
            {
                elementToFocus.focus();
            }
        }
    }
}