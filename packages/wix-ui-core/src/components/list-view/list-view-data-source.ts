import {ListViewDataSourceItem, ListViewItemId} from './list-view-types';

export function createSelectablePrimitiveValuesDataSource<T extends ListViewItemId> (value: Array<T>) {
    return createDataSource(value, {
        idFunction: item => item,
        typeAheadTextFunction: item => item.toString(),
        isSelectable: () => true,
        isDisabled: () => false,
    })
}

export function createNavigatablePrimitiveValuesDataSource<T extends ListViewItemId> (value: Array<T>) {
    return createDataSource(value, {
        idFunction: item => item,
        typeAheadTextFunction: item => item.toString(),
        isSelectable: () => false,
        isDisabled: () => false,
    })
}

export function createDataSource<T> (
    array: Array<T>,
    options: {
        idFunction?: (dataItem: T) => ListViewItemId,
        typeAheadTextFunction?: (dataItem: T) => string,
        isSelectable?: (dataItem: T) => boolean,
        isDisabled?: (dataItem: T) => boolean,
    }
) : ListViewDataSourceItem<T>[] {

    const {
        idFunction,
        typeAheadTextFunction,
        isSelectable,
        isDisabled,
    } = options;

    return array.map(item => {

        return {
            id: idFunction(item),
            dataItem: item,
            typeAheadText: typeAheadTextFunction ? typeAheadTextFunction(item) : null,
            isSelectable: isSelectable ? isSelectable(item) : false,
            isDisabled: isDisabled ? isDisabled(item) : false,
        };
    })
}
