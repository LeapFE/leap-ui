import React from "react";
import moment from "moment";
import classnames from "classnames";

import Icon from "../icon";

// import "./style/index.less";

export const FORMAT_TEMPLATE = "YYYY-MM-DD";

type getStartAndEndProps = {
  start: string | undefined;
  end: string | undefined;
};

export const getStartAndEnd = (
  value: moment.Moment[] | undefined,
  format: string,
): getStartAndEndProps => {
  return {
    start: value && value[0] && value[0].format(format),
    end: value && value[1] && value[1].format(format),
  };
};

const addDays = (dayStr: string, num: number) =>
  moment(dayStr)
    .add(num, "days")
    .format(FORMAT_TEMPLATE);
const getWeekDay = (weekday: number) => {
  // 根据语言环境获取或设置星期几。
  // 情况一：如果语言环境将周一指定为一周的第一天，则周一到周日 [0,1,2,3,4,5,6]
  // 情况二：如果星期日是一周的第一天，则周一到周日 [1,2,3,4,5,6,0]
  // 以下"2020-04-27"为周一 如果返回的是0则为第一种情况，通过各项+1 得到[1,2,3,4,5,6,7]
  const weekReference = moment("2020-04-27").weekday();
  if (weekReference === 0) {
    return weekday + 1;
  }
  // --REVIEW `weekday` maybe undefined???
  //情况二的周日为0则返回7
  return weekday || 7;
};
const setTable = (def: moment.Moment | undefined) => {
  const defaultDate = def ? def.clone() : moment();

  defaultDate.date(1);

  const YY = defaultDate.year(); //默认年
  const MM = defaultDate.month() + 1; //默认月
  const day = defaultDate.day() || 7; //默认月第一天为周几

  const firstDate = defaultDate.format(FORMAT_TEMPLATE);

  const table = new Array(42).fill(1).map((_, index) => {
    const cur = moment(firstDate).add(index - day + 1, "days");
    const obj = cur.toObject();
    return {
      ...obj,
      months: obj.months + 1,
      str: cur.format(FORMAT_TEMPLATE),
      weekday: getWeekDay(cur.weekday()),
    };
    // {years: 2015,months: 6date: 26,hours: 1,minutes: 53,seconds: 14,milliseconds: 600,weekday:7,str:'2015-05-26'}
  });

  return {
    table,
    YY,
    MM,
    now: moment().format(FORMAT_TEMPLATE),
    firstDate,
  };
};

export interface CalendarProps {
  range?: string[];
  selectedDates?: string[];
  onChange?: (date: string) => void;
  onRangeChange?: (date: moment.Moment[]) => void;
  minuteStep?: number;
  defaultDate?: moment.Moment;
  value?: moment.Moment[];
  defaultTimes?: string[];
  disabledDate?: (data: moment.Moment) => boolean;
  type?: "range";
}

export interface CalenderTableCell {
  months: number;
  str: string;
  weekday: any;
  years: number;
  date: number;
  hours: number;
  minutes: number;
  seconds: number;
  milliseconds: number;
}

interface CalendarState {
  YY: number;
  MM: number;
  table: CalenderTableCell[];
}

class Calendar extends React.Component<CalendarProps, CalendarState> {
  private firstDate: string;

  constructor(props: CalendarProps) {
    super(props);

    this.state = {
      YY: 2020,
      MM: 3,
      table: [],
    };

    this.firstDate = "";
  }

  componentDidMount() {
    this.init();
  }
  init = () => {
    this.getTable(this.getDefaultValue());
  };
  UNSAFE_componentWillReceiveProps(nextProps: CalendarProps) {
    if (nextProps.range && this.props.range && nextProps.range[0] !== this.props.range[0]) {
      this.getTable((nextProps.range[0] && moment(nextProps.range[0])) || undefined);
    }
  }

  getDefaultValue = () => {
    const { selectedDates = [], range, value, defaultDate, type } = this.props;
    if (type === "range") return (value && value[0]) || defaultDate || undefined;
    return (
      (selectedDates[0] && moment(selectedDates[0])) ||
      (range && range[0] && moment(range[0])) ||
      undefined
    );
  };

  getTable = (defaultValue: moment.Moment | undefined) => {
    const { table, YY, MM, firstDate } = setTable(defaultValue);
    this.firstDate = firstDate;

    this.setState({ table, YY, MM });
  };

  onChangeYearMonth = (num: number, type: "years" | "months") => {
    this.getTable(moment(this.firstDate).add(num, type));
  };
  getReturnValue = (child: CalenderTableCell): moment.Moment[] => {
    const { minuteStep = 1, defaultTimes = [], value = [] } = this.props;
    const [start, end] = value;
    if (!start || (start && end)) {
      if (defaultTimes[0]) return [moment(`${child.str} ${defaultTimes[0]}`)];
      const cur = moment(`${child.str} ${moment().format("HH:mm")}`);
      return [cur.set("minute", Math.ceil(cur.minute() / minuteStep) * minuteStep)];
    }
    const [s, e] = [start.format("YYYY-MM-DD"), child.str].sort();
    if (defaultTimes && defaultTimes[1]) {
      return [moment(`${s} ${defaultTimes[0]}`), moment(`${e} ${defaultTimes[1]}`)];
    }
    if (s === e) return [start, start.clone().add(1, "hours")];
    const timeStr = start.format("HH:mm");
    return [moment(`${s} ${timeStr}`), moment(`${e} ${timeStr}`)];
  };
  onChange = (child: CalenderTableCell) => {
    const { onChange, onRangeChange } = this.props;
    this.getTable(moment(child.str));
    if (onChange) onChange(child.str);
    const returnValue = this.getReturnValue(child);
    if (onRangeChange) onRangeChange(returnValue);
  };
  dayCell = (child: CalenderTableCell) => {
    const { range = [], selectedDates = [], disabledDate, value, type = "multi" } = this.props;
    const [rangeStart = "1999-01-01", rangeEnd = "9999-12-31"] = range;
    const disabled =
      child.str < rangeStart ||
      child.str > rangeEnd ||
      (disabledDate && disabledDate(moment(`${child.str} 23:59:59`)));
    // eslint-disable-next-line prefer-const
    let { start, end } = getStartAndEnd(value, FORMAT_TEMPLATE);
    end = end || start;
    const today = moment().format(FORMAT_TEMPLATE) === child.str;
    return (
      <div
        onClick={() => !disabled && this.onChange(child)}
        className={classnames(`fl_calander_row fl_${type}_calander_row`, {
          selected:
            new Set(selectedDates).has(child.str) ||
            (start && end && child.str >= start && child.str <= end),
          disabled,
          right_col: addDays(rangeStart, -1) === child.str || child.str === end,
          non_current_month: this.state.MM !== child.months,
          today,
          start_or_end: child.str === start || child.str === end,
        })}
        key={child.str}
      >
        <span>{today ? "今" : child.date}</span>
      </div>
    );
  };
  render() {
    const { table, YY, MM } = this.state;
    return (
      <div className="fl_calander">
        <div className="fl_handler">
          <Icon type="double-left" onClick={() => this.onChangeYearMonth(-1, "years")} />
          <Icon type="left" onClick={() => this.onChangeYearMonth(-1, "months")} />
          <div className="yy_mm">
            {YY}年{MM}月
          </div>
          <Icon type="right" onClick={() => this.onChangeYearMonth(1, "months")} />
          <Icon type="double-right" onClick={() => this.onChangeYearMonth(1, "years")} />
        </div>
        <div className="fl_weeks">
          <span>一</span>
          <span>二</span>
          <span>三</span>
          <span>四</span>
          <span>五</span>
          <span>六</span>
          <span>日</span>
        </div>
        <div className="fl_contenet">{table.map(this.dayCell)}</div>
      </div>
    );
  }
}

export default Calendar;
