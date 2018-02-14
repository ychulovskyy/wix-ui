import React = require('react');
import classNames from 'classnames';

import {ThemeProvider, DateRangePicker, DatePicker, Select} from '../core';
import appStyle from './App.st.css';
import dateRangePickerStyle from './DateRangePicker.st.css';
import datePickerStyle from './DatePicker.st.css';
import selectStyle from './Select.st.css';

import {ChevronDown, ArrowDown, Smiley} from './icons';

const myTheme = {
    Select: {
        toggleIcon: <ChevronDown />
    }
};

const MySelect = props =>
    <Select {...props} className={selectStyle.root} />;

const MyDatePicker = props =>
    <DatePicker {...props} className={datePickerStyle.root} />;

const MyDateRangePicker = props =>
    <DateRangePicker {...props} className={dateRangePickerStyle.root} />;

export function App() {
    return (
        <ThemeProvider theme={myTheme}>
            <div className={appStyle.root}>
                <MySelect />
                <MyDatePicker />
                <MyDateRangePicker />
                <DateRangePicker />
            </div>
        </ThemeProvider>
    );
}
