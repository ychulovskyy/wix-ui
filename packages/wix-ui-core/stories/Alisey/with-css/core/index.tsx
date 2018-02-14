import React = require('react');
import classNames from 'classnames';

import dateRangePickerStyle from './DateRangePicker.st.css';
import datePickerStyle from './DatePicker.st.css';
import selectStyle from './Select.st.css';

export {dateRangePickerStyle};
export {datePickerStyle};
export {selectStyle};

export function DateRangePicker(props: {className?: string}) {
    return (
        <div {...dateRangePickerStyle('root', {}, props)}>
            <DatePicker className={dateRangePickerStyle.fromDate} />
            <DatePicker className={dateRangePickerStyle.toDate} />
        </div>
    );
}

export function DatePicker(props: {className?: string}) {
    return (
        <div {...datePickerStyle('root', {}, props)}>
            <Select className={datePickerStyle.year} />
            <Select className={datePickerStyle.month} />
            <Select className={datePickerStyle.day} />
        </div>
    );
}

export function Select(props: {className?: string}) {
    return (
        <div {...selectStyle('root', {}, props)}>
            <div className={selectStyle.toggleIcon} />
        </div>
    );
}
