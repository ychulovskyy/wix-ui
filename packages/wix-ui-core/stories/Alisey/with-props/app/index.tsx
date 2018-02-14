import React = require('react');
import classNames from 'classnames';

import {DateRangePicker, DatePicker, Select} from '../core';
import dateRangePickerStyle from './DateRangePicker.st.css';
import datePickerStyle from './DatePicker.st.css';
import selectStyle from './Select.st.css';

import {ChevronDown, ArrowDown, Smiley} from './icons';

const MySelect = props =>
    <Select
        {...props}
        className={selectStyle.root}
        toggleIcon={<ChevronDown />}
    />;

const MyDatePicker = props =>
    <DatePicker
        {...props}
        className={datePickerStyle.root}
        selectProps={{
            toggleIcon: <Smiley />
        }}
    />;

const MyDateRangePicker = props =>
    <DateRangePicker
        {...props}
        className={dateRangePickerStyle.root}
        datePickerProps={{
            selectProps: {
                toggleIcon: <ArrowDown />
            }
        }}
    />;

export function App() {
    return (
        <div>
            <MySelect />
            <MyDatePicker />
            <MyDateRangePicker />
        </div>
    );
}
