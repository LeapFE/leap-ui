import React from "react";
import classnames from "classnames";
import moment from "moment";

import TimePicker from "../time-picker";

export interface RangeTimePickersProps {
  format?: string;
  value: moment.Moment[];
  onChange: (time: moment.Moment[]) => void;
  disabledHours?: (hour: number) => boolean;
  disabledMinutes?: (hour: number) => boolean;
  disabledSeconds?: (hour: number, min: number) => boolean;
  minuteStep?: number;
}
interface RangeTimePickersState {
  str: string;
}
class RangeTimePickers extends React.Component<RangeTimePickersProps, RangeTimePickersState> {
  constructor(props: RangeTimePickersProps) {
    super(props);

    this.state = {
      str: moment().format("x"),
    };
  }

  render() {
    const { str } = this.state;
    const { format = "YYYY-MM-DD HH:mm", value, onChange } = this.props;

    const start = value && value[0];
    const startDate = value && value[0] && value[0].format("YYYY-MM-DD");
    const endDate = value && value[1] && value[1].format("YYYY-MM-DD");
    const endDisable: Record<string, Function> = {};

    const gitTimeArr = (num: number) =>
      Array(num)
        .fill(0)
        .map((_: number, index) => index);

    if (startDate && endDate && startDate === endDate) {
      endDisable.disabledHours = () => gitTimeArr(start.hour());
      endDisable.disabledMinutes = (curHour: number) =>
        start.hour() === curHour ? gitTimeArr(start.minute()) : [];
      endDisable.disabledSeconds = (curHour: number, curMin: number) =>
        start.hour() === curHour && start.minute() === curMin ? gitTimeArr(start.second()) : [];
    }

    const pickerData = [
      {
        id: "left",
        placeholder: "开始日期",
        disabled: {},
      },
      {
        id: "right",
        placeholder: "结束日期",
        disabled: endDisable,
      },
    ];

    return (
      <div className="fl_time_pickers">
        {pickerData.map((child, index) => {
          return (
            <div
              className={classnames("fl_time_pickers_col")}
              id={`${child.id}${str}`}
              key={child.id}
            >
              <div className="fl_time_picker_date">
                {value && value[index] ? value[index].format("YYYY-MM-DD") : child.placeholder}
              </div>
              <TimePicker
                style={{ width: 140 }}
                open
                format={format}
                value={(value && value[index]) || undefined}
                getPopupContainer={() =>
                  document.getElementById(`${child.id}${str}`) || document.body
                }
                onChange={(time) => {
                  if (value) {
                    value[index] = time;
                    if (value[0] > value[1]) value[1] = moment(value[0].format()).add(1, "hours");
                  }
                  onChange(value);
                }}
                {...child.disabled}
              />
            </div>
          );
        })}
      </div>
    );
  }
}
export default RangeTimePickers;
