import React = require('react');
import classNames from 'classnames';

import dateRangePickerStyle from './DateRangePicker.st.css';
import datePickerStyle from './DatePicker.st.css';
import selectStyle from './Select.st.css';

export {dateRangePickerStyle};
export {datePickerStyle};
export {selectStyle};

export function DateRangePicker(props: {className?: string, datePickerProps?: object}) {
    return (
        <div {...dateRangePickerStyle('root', {}, props)}>
            <DatePicker {...props.datePickerProps} className={dateRangePickerStyle.fromDate} />
            <DatePicker {...props.datePickerProps} className={dateRangePickerStyle.toDate} />
        </div>
    );
}

export function DatePicker(props: {className?: string, selectProps?: object}) {
    return (
        <div {...datePickerStyle('root', {}, props)}>
            <Select {...props.selectProps} className={datePickerStyle.year} />
            <Select {...props.selectProps} className={datePickerStyle.month} />
            <Select {...props.selectProps} className={datePickerStyle.day} />
        </div>
    );
}

export function Select(props: {className?: string, toggleIcon?: React.ReactNode}) {
    return (
        <div {...selectStyle('root', {}, props)}>
            <div className={selectStyle.toggleIcon}>
                {props.toggleIcon}
            </div>
        </div>
    );
}
