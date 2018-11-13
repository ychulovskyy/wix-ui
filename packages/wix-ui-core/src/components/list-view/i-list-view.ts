import * as React from 'react';

export interface IListView
{
    handleKeyboardEvent (event: React.KeyboardEvent<Element>) : void;

    moveToItemBasedOnTypeAhead (updatedTypeAheadValue: string, options: {selectItem: boolean}) : void;
}