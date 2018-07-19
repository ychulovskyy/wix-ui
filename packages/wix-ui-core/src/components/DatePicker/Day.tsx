import * as React from 'react';
import style from './Day.st.css';
import {noop} from '../../utils';
const uniqueId = require('lodash/uniqueId');

export interface OnClickEvent extends React.MouseEvent<HTMLButtonElement> {
    value: React.ReactNode;
}

export interface DayProps {
    value: string;
    label?: React.ReactNode;
    onClick?: React.EventHandler<OnClickEvent> ;
    isCurrent?: boolean;
}

export class Day extends React.Component<DayProps> {
    state = {
        isHover: false
    };
  
    private handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        this.props.onClick && this.props.onClick({value: this.props.value, ...e});
    };

    toggleHover = () => this.setState({ isHover: !this.state.isHover });
    
    render () {
        const {value, label, onClick, isCurrent} = this.props;

        return (
            <button value={value} onClick={this.handleClick} onMouseEnter={this.toggleHover} onMouseLeave={this.toggleHover} {...style('root', {isCurrent: isCurrent, isHovered: this.state.isHover}, this.props)} >
                {label}
            </button>
        );
    };
}
