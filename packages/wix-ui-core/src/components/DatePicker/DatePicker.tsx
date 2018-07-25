import * as React from 'react';
import style from './DatePicker.st.css';
import { Day } from './Day';
import { ENGINE_METHOD_DIGESTS } from 'constants';
const range = require('lodash/range');
export interface DatePickerProps{
    selectedDay?: number;
};

export class DatePicker extends React.Component<DatePickerProps> {    
    currentDate = new Date();
    currentDay = this.currentDate.getDate();
    calendarDays= range(1,31);

    render () {
        return (
            <div {...style('root', {}, this.props)}>
                <div className={style.displayDate}>{this.currentDate.toLocaleDateString()}</div>
                {this.calendarDays.map((d,i) => 
                <Day isCurrent={d == this.currentDay}
                 isSelected={d == this.props.selectedDay }
                 className={style.day}
                 value={d}
                 label={d}
                 key={d}/>)}
                {/* {this.getCalendarDays()} */}
            </div>
        );
    };
}
