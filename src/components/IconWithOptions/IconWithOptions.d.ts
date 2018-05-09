/// <reference types="react" />
import * as React from 'react';
import { Placement } from '../Popover';
import { Option } from '../../baseComponents/DropdownOption';
import { OPEN_TRIGGER_TYPE } from '../../baseComponents/Dropdown/constants';
export interface IconWithOptionsProps {
    /** The location to display the content */
    placement?: Placement;
    /** The dropdown options array */
    options: Array<Option>;
    /** Trigger type to open the content */
    openTrigger?: OPEN_TRIGGER_TYPE;
    /** Handler for when an option is selected */
    onSelect?: (option: Option) => void;
    /** Handler for when an option is deselected */
    onDeselect?: (option: Option) => void;
    /** initial selected option ids */
    initialSelectedIds?: Array<string | number>;
    /** set true for multiple selection, false for single */
    multi?: boolean;
    /** An element that always appears at the top of the options */
    fixedHeader?: React.ReactNode;
    /** An element that always appears at the bottom of the options */
    fixedFooter?: React.ReactNode;
    /** Icon url to display */
    iconUrl: string;
}
/**
 * IconWithOptions
 */
export declare const IconWithOptions: React.SFC<IconWithOptionsProps>;
