import {ListViewDataSourceItem, ListViewItemId} from "./list-view-types";

export function domFindAncestor (element: HTMLElement, predicate: (element: HTMLElement) => boolean, includeSelf: boolean = true) : HTMLElement {

    if (!includeSelf)
    {
        element = element.parentElement;
    }

    while (!predicate(element) && element)
    {
        element = element.parentElement;
    }

    return element;
}

export function arrayClone<T> (arr: Array<T>) : Array<T> {
    return arr.slice(0);
}

export function arrayFlatten<T> (arr: Array<Array<T>>) : Array<T> {
    return Array.prototype.concat.apply([], arr);
}

export function arrayFind<T> (arr: Array<T>, predicate: (item: T) => boolean) : [T, number] {
    const length = arr.length;

    for (let i = 0; i < length; i++)
    {
        const item = arr[i];
        if (predicate(item))
        {
            return [item, i];
        }
    }

    return [null, -1];
}

export function arrayFindIndex<T> (arr: Array<T>, predicate: (item: T) => boolean) : number {
    const length = arr.length;

    for (let i = 0; i < length; i++)
    {
        const item = arr[i];
        if (predicate(item))
        {
            return i;
        }
    }

    return -1;
}

export function isTypeAheadKey (event) {
    const eventKey = event.key;

    return eventKey.length === 1 && !event.ctrlKey && !event.altKey;
}

