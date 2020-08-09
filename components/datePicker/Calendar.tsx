import React from "react";
import moment from "moment";

import Icon from "../icon";

import "./index.less";

const FORMAT_TEMPLATE = "YYYY-MM-DD";
const getWeekDay = (weekday: number) => {
  // "2020-04-27"为周一 如果返回的是0则之一值周日为[0-6]否则为[1,2,3,4,5,6,0]
  const weekReference = moment("2020-04-27").weekday();

  if (weekReference === 0) {
    return weekday + 1;
  }

  // REVIEW `weekday` maybe undefined???
  return weekday || 7;
};
const setTable = (def: moment.Moment) => {
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
}
interface CalendarState {
  YY: number;
  MM: number;
  table: {
    months: number;
    str: string;
    weekday: any;
    years: number;
    date: number;
    hours: number;
    minutes: number;
    seconds: number;
    milliseconds: number;
  }[];
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

  getDefaultValue = () => moment();

  init = () => {
    this.getTable(this.getDefaultValue());
  };

  getTable = (defaultValue: moment.Moment) => {
    const { table, YY, MM, firstDate } = setTable(defaultValue);
    this.firstDate = firstDate;

    this.setState({ table, YY, MM });
  };

  onChangeYearMonth = (num: number, type: "years" | "months") => {
    this.getTable(moment(this.firstDate).add(num, type));
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
        {/* REVIEW where defined `dayCell` ??? */}
        <div className="fl_contenet">{table.map(this.dayCell)}</div>
      </div>
    );
  }
}

export default Calendar;
