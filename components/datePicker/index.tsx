import React, { Component } from "react";
import { DatePicker as AntdDatePicker } from "antd";
import * as AntdDatePickerInterface from "antd/es/date-picker/interface";
import ClassNames from "classnames";
import moment from "moment";

import "./style";

class RangePicker extends Component<AntdDatePickerInterface.RangePickerProps> {
  render() {
    return (
      <AntdDatePicker.RangePicker
        {...this.props}
        className={ClassNames("fl_date_picker fl_range_picker", this.props.className)}
        dropdownClassName={ClassNames(
          "fl_date_picker_drop fl_range_picker_drop",
          this.props.dropdownClassName,
        )}
      />
    );
  }
}

class MonthPicker extends Component<AntdDatePickerInterface.MonthPickerProps> {
  render() {
    return (
      <AntdDatePicker.MonthPicker
        {...this.props}
        className={ClassNames("fl_date_picker fl_month_picker", this.props.className)}
        dropdownClassName={ClassNames(
          "fl_date_picker_drop fl_month_picker_drop",
          this.props.dropdownClassName,
        )}
      />
    );
  }
}

class WeekPicker extends Component<AntdDatePickerInterface.WeekPickerProps> {
  render() {
    return (
      <AntdDatePicker.WeekPicker
        {...this.props}
        className={ClassNames("fl_date_picker fl_week_picker", this.props.className)}
        dropdownClassName={ClassNames(
          "fl_date_picker_drop fl_week_picker_drop",
          this.props.dropdownClassName,
        )}
      />
    );
  }
}

export interface RangeWeekPickerProps
  extends Omit<Omit<AntdDatePickerInterface.WeekPickerProps, "onChange">, "value"> {
  onChange?: (value: [string, string] | []) => void;
  value?: [moment.Moment, moment.Moment] | [];
}

interface RangeWeekPickerState {
  monday: string;
  sunday: string;
}
class RangeWeekPicker extends Component<RangeWeekPickerProps, RangeWeekPickerState> {
  constructor(props: RangeWeekPickerProps) {
    super(props);

    this.state = { monday: "", sunday: "" };
  }

  componentDidMount() {
    const { value } = this.props;
    if (Array.isArray(value)) {
      const { monday, sunday } = this.getMonSun(moment(value[0]));
      this.setState({ monday, sunday });
    }
  }

  getMonSun = (dateMoment: moment.Moment | null) => {
    if (dateMoment === null) {
      return { monday: "", sunday: "" };
    }

    const { format = "YYYY-MM-DD" } = this.props;

    // 计算今天是这周第几天
    // REVIEW weekOfData is a Number???
    const weekOfDay = Number(dateMoment.format("E"));
    const monday = dateMoment.subtract(weekOfDay - 1, "days").format(format as string);
    const sunday = dateMoment.add(6, "days").format(format as string);
    return { monday, sunday };
  };

  onChange = (dateMoment: moment.Moment | null) => {
    const { onChange } = this.props;

    const { monday = "", sunday = "" } = dateMoment ? this.getMonSun(dateMoment) : {};

    this.setState({ monday, sunday });

    if (typeof onChange === "function") {
      onChange(dateMoment ? [monday, sunday] : []);
    }
  };

  render() {
    const { dropdownClassName, placeholder, ...otherProps } = this.props;
    const { monday, sunday } = this.state;
    const { format = "YYYY-MM-DD" } = otherProps;
    
    return (
      <div className="range_week_picker">
        <WeekPicker
          {...otherProps}
          style={{ width: 280 }}
          format={format}
          dropdownClassName={ClassNames("hide_number", dropdownClassName)}
          value={monday ? moment(monday, format) : null}
          onChange={this.onChange}
        />
        <div className="top_render">
          {monday ? (
            <div className="value">
              <span>{monday}</span> <span>~</span> <span>{sunday}</span>
            </div>
          ) : (
            <div className="placeholder">{placeholder || "请选择日期"}</div>
          )}
        </div>
      </div>
    );
  }
}

class DatePicker extends Component<AntdDatePickerInterface.DatePickerProps> {
  static RangePicker: typeof RangePicker;
  static MonthPicker: typeof MonthPicker;
  static WeekPicker: typeof WeekPicker;
  static RangeWeekPicker: typeof RangeWeekPicker;

  render() {
    return (
      <AntdDatePicker
        {...this.props}
        className={ClassNames("fl_date_picker", this.props.className)}
        dropdownClassName={ClassNames("fl_date_picker_drop", this.props.dropdownClassName)}
      />
    );
  }
}

DatePicker.MonthPicker = MonthPicker;
DatePicker.RangePicker = RangePicker;
DatePicker.WeekPicker = WeekPicker;
// NOTE api changed
DatePicker.RangeWeekPicker = RangeWeekPicker;

export { AntdDatePicker, AntdDatePickerInterface };
export default DatePicker;
