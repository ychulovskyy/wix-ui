import {ReactElement, RefObject} from 'react';
import * as React from 'react';
import {IListView} from './i-list-view';

interface ListViewNavigationInputBehaviourProps
{
    listViewSelector: () => RefObject<IListView>,
    children: ReactElement<HTMLInputElement>,
    isTypeAheadNavigationEnabled?: boolean,
    isKeyboardNavigationEnabled?: boolean,
}

export class ListViewNavigationInputBehaviour extends React.Component<ListViewNavigationInputBehaviourProps>
{
    render () {
        
        const {
            children: inputElement,
            listViewSelector,
            isTypeAheadNavigationEnabled = true,
            isKeyboardNavigationEnabled = true,
        } = this.props;
        
        const inputProps = inputElement.props;
        
        const {
            onChange: originalOnChange,
            onKeyDown: originalOnKeyDown
        } = inputProps;
        
        return React.cloneElement(inputElement, {
            ...inputProps,
            onChange (event) {
                if (isTypeAheadNavigationEnabled)
                {
                    listViewSelector().current.moveToItemBasedOnTypeAhead(event.target.value);
                }

                if (originalOnChange)
                {
                    originalOnChange(event);
                }
            },
            onKeyDown (event: React.KeyboardEvent<Element>) {

                if (isKeyboardNavigationEnabled)
                {
                    const eventKey = event.key;

                    if (eventKey === 'ArrowDown' || eventKey === 'ArrowUp' || (eventKey === ' ' && (event.ctrlKey || event.shiftKey )))
                    {
                        listViewSelector().current.handleKeyboardEvent(event);
                    }
                }

                if (originalOnKeyDown)
                {
                    originalOnKeyDown(event);
                }
            }
        })
    }
}