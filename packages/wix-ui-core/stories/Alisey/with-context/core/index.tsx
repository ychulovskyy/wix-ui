import React = require('react');
import classNames from 'classnames';

import dateRangePickerStyle from './DateRangePicker.st.css';
import datePickerStyle from './DatePicker.st.css';
import selectStyle from './Select.st.css';

export {dateRangePickerStyle};
export {datePickerStyle};
export {selectStyle};

export class ThemeProvider extends React.Component<{theme: any}> {
    static propTypes = {
        theme: React.PropTypes.object.isRequired
    };

    static childContextTypes = {
        theme: React.PropTypes.object.isRequired
    };

    getChildContext() {
        return {theme: this.props.theme};
    }

    render() {
        return React.Children.only(this.props.children);
    }
}

export function DateRangePicker(props: {className?: string}, context) {
    return (
        <div {...dateRangePickerStyle('root', {}, props)}>
            <DatePicker className={dateRangePickerStyle.fromDate} />
            <DatePicker className={dateRangePickerStyle.toDate} />
        </div>
    );
}

export function DatePicker(props: {className?: string}, context) {
    return (
        <div {...datePickerStyle('root', {}, props)}>
            <Select className={datePickerStyle.year} />
            <Select className={datePickerStyle.month} />
            <Select className={datePickerStyle.day} />
        </div>
    );
}

export function Select(props: {className?: string}, context) {
    return (
        <div {...selectStyle('root', {}, props)}>
            <div className={selectStyle.toggleIcon}>
                {context.theme.Select.toggleIcon}
            </div>
        </div>
    );
}
(Select as any).contextTypes = {theme: React.PropTypes.object};
