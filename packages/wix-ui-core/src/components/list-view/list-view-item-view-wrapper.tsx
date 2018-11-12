import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {domFindAncestor} from './list-view-utils';
import {ListViewContextData} from './list-view-composable';
import {
    DataItemsEqualityComparer, defaultDataItemsEqualityComparer,
    ListViewItemId,
    ListViewRenderItem,
    ListViewRenderItemProps
} from './list-view-types';
import {ClassAttributes} from 'react';

interface ListViewItemViewWrapperProps<T>
{
    id: ListViewItemId,
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

    static create<T> (props: ClassAttributes<T> & ListViewItemViewWrapperProps<T>) {
        return React.createElement<ListViewItemViewWrapperProps<T>>(ListViewItemViewWrapper, props);
    }

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

        this.focusWhenCurrentListViewItem(listViewContextData.isItemShouldBeFocusedWhenRendered(id));
        listViewContextData.handleItemRendered(id);
    }

    componentDidUpdate (prevProps: Readonly<ListViewItemViewWrapperProps<T>>) {
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