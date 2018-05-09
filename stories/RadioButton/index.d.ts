/// <reference types="react" />
import * as React from 'react';
import { RadioButtonProps } from '../../src/components/RadioButton/RadioButton';
export declare class RadioButtonStory extends React.Component<{}, {
    checkedIdx: string;
}> {
    state: {
        checkedIdx: string;
    };
    createRadio(props?: RadioButtonProps): JSX.Element;
    render(): JSX.Element;
}
