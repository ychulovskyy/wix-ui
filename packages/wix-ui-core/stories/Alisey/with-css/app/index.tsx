import React = require('react');
import classNames from 'classnames';

import {DateRangePicker, DatePicker, Select} from '../core';
import dateRangePickerStyle from './DateRangePicker.st.css';
import datePickerStyle from './DatePicker.st.css';
import selectStyle from './Select.st.css';

const MySelect = props =>
    <Select {...props} className={selectStyle.root} />;

const MyDatePicker = props =>
    <DatePicker {...props} className={datePickerStyle.root} />;

const MyDateRangePicker = props =>
    <DateRangePicker {...props} className={dateRangePickerStyle.root} />;

export function App() {
    return (
        <div>
            <MySelect />
            <MyDatePicker />
            <MyDateRangePicker />
        </div>
    );
}
