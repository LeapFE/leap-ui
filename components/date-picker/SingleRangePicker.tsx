/* 单日历 可以选择多个不连续的日期
range=["1999-01-01", "9999-01-01"]
onChange=(value,valuesObj)
value=[]||''
maxTagCount 输入框显示的value个数 多出部分不展示 默认为2
allowClear 默认true
***/
import React, { CSSProperties } from "react";
import classnames from "classnames";
import moment from "moment";
import { CheckboxChangeEvent } from "antd/es/checkbox";

import Icon from "../icon";
import Calendar from "./Calendar";
import Popover from "../popover";
import Button from "../button";
import Checkbox from "../checkbox";
import RangeTimePickers from "./RangeTimePickers";

export interface SingleRangePickerProps {
  value?: moment.Moment[];
  defaultTimes?: string[];
  format?: string;
  showTime?: boolean;
  onOk?: (value: moment.Moment[], valueStr: string[]) => void;
  disabled?: boolean;
  showQuit?: boolean;
  disabledDate?: (date: moment.Moment) => boolean;
  disabledHours?: (hour: number) => boolean;
  radioDate?: boolean;
  minuteStep?: number;
  placeholder?: string;
  allowClear?: boolean;
  style?: CSSProperties;
}
interface SingleRangePickerState {
  visible: boolean;
  showTimeModal: boolean;
  quit: boolean;
  curFormat: string;
  start: string;
  end: string;
  temporaryEnd: string;
}

const dayFormat = "YYYY-MM-DD";
const timeFormat = "YYYY-MM-DD HH:mm";
const quitDate = "9999-12-31 00:00:00";

class SingleRangePicker extends React.Component<SingleRangePickerProps, SingleRangePickerState> {
  constructor(props: SingleRangePickerProps) {
    super(props);
    this.state = {
      quit: false,
      visible: false,
      showTimeModal: false,
      curFormat: dayFormat,
      start: "",
      end: "",
      temporaryEnd: "",
    };
  }

  componentDidMount() {
    this.setDefaultValue();
  }

  setDefaultValue = () => {
    const { format, showTime, value = [] } = this.props;

    const curFormat = format || (showTime ? timeFormat : dayFormat);

    this.setState({
      curFormat,
      start: (value[0] && value[0].format(curFormat)) || "",
      end: (value[1] && value[1].format(curFormat)) || "",
    });
  };

  onChange = ([start, end]: moment.Moment[]) => {
    const { defaultTimes = [] } = this.props;
    const { curFormat } = this.state;

    const startDate = start && start.format(curFormat);
    const endDate = end && end.format(curFormat);

    let temporaryEnd = endDate || "";

    if (start && !end) {
      if (defaultTimes[1]) {
        temporaryEnd = moment(`${start.format(dayFormat)} ${defaultTimes[1]}`).format(curFormat);
      } else {
        temporaryEnd = start
          .clone()
          .add(1, "hours")
          .format(curFormat);
      }
    }

    this.setState({
      start: startDate,
      end: endDate,
      temporaryEnd,
      quit: endDate === moment(quitDate).format(curFormat),
    });
  };

  onChangeQuit = (e: CheckboxChangeEvent) => {
    const { start } = this.state;
    const { checked } = e.target;
    this.setState({ quit: checked });
    if (checked) this.onChange([(start && moment(start)) || moment(), moment(quitDate)]);
  };

  confirm = () => {
    const { onOk } = this.props;

    // eslint-disable-next-line prefer-const
    let { start, end, temporaryEnd } = this.state;
    if (start && !end && !temporaryEnd) {
      end = start;
    }

    this.setState({ visible: false, showTimeModal: false });

    if (typeof onOk === "function") {
      onOk([moment(start), moment(end || temporaryEnd)], [start, end || temporaryEnd]);
    }
  };

  onVisibleChange = (visible: boolean) => {
    this.setState({
      visible,
      showTimeModal: false,
      temporaryEnd: "",
    });

    if (visible) {
      this.setDefaultValue();
    }
  };

  render() {
    const {
      visible,
      start,
      end,
      temporaryEnd,
      quit,
      curFormat,
      showTimeModal = false,
    } = this.state;
    const {
      disabled,
      showQuit,
      disabledDate,
      disabledHours,
      radioDate,
      minuteStep,
      placeholder = "请选择",
      allowClear,
      style = {},
      onOk,
      showTime,
      format,
      value = [],
      defaultTimes = [],
    } = this.props;

    const timePickerValue = [];
    const calendarValue = [];

    if (start) {
      timePickerValue.push(moment(start));
      calendarValue.push(moment(start));
    }
    if (end || temporaryEnd) timePickerValue.push(moment(end || temporaryEnd));
    if (end) calendarValue.push(moment(end));

    return (
      <Popover
        hideArrow
        trigger="click"
        visible={!disabled && visible}
        onVisibleChange={this.onVisibleChange}
        content={
          <div className="fl_single_range_picker_popover">
            <div className="picker_header">
              <span>{start || "开始时间"}</span>
              <span>~</span>
              <span>{quit ? "离职" : end || temporaryEnd || "结束时间"}</span>
            </div>
            <div className="fl_picker_main">
              <div className="fl_picker_cot">
                {showTimeModal ? (
                  <div className="fl_picker_item">
                    <RangeTimePickers
                      minuteStep={minuteStep}
                      disabledHours={disabledHours}
                      format={format}
                      value={timePickerValue}
                      onChange={this.onChange}
                    />
                  </div>
                ) : (
                  <div className="fl_picker_item">
                    <Calendar
                      type="range"
                      minuteStep={minuteStep}
                      disabledDate={disabledDate}
                      value={calendarValue}
                      defaultTimes={defaultTimes}
                      onRangeChange={([start, end]) => {
                        const returnValue = [start];
                        if (radioDate) {
                          if (start)
                            returnValue.push(
                              defaultTimes[1]
                                ? moment(`${start.format("YYYY-MM-DD")} ${defaultTimes[1]}`)
                                : moment(start.format(curFormat)).add(1, "hours"),
                            );
                        } else if (end) {
                          returnValue.push(end);
                        }

                        this.onChange(returnValue);
                      }}
                    />
                  </div>
                )}
              </div>
            </div>
            <div className="picker_footer">
              {showQuit && (
                <Checkbox checked={quit} onChange={this.onChangeQuit}>
                  离职
                </Checkbox>
              )}
              {showTime && (
                <div
                  className="picker_select_time_btn"
                  onClick={() => this.setState({ showTimeModal: !showTimeModal })}
                >
                  {showTimeModal ? "选择日期" : "选择时分"}
                </div>
              )}
              <Button type="primary" className="confirm" onClick={this.confirm}>
                确定
              </Button>
            </div>
          </div>
        }
      >
        <div
          className={classnames("fl_single_range_picker", {
            selected: value.length,
            disabled,
          })}
          style={style}
          onClick={() => this.setState({ visible: true })}
        >
          <div className="cot selected_value">
            {value[0] && value[0].format(curFormat)}
            <span>~</span>
            {value[1] && value[1].format(curFormat)}
          </div>
          <span className="cot placeholder">{placeholder}</span>
          <Icon
            className={classnames("range_picker_icon", {
              allow_clear_picker_icon: allowClear !== false,
            })}
            type="calendar"
          />
          {allowClear !== false && (
            <Icon
              className="range_picker_clear"
              type="close-circle"
              theme="filled"
              onClick={(e) => {
                e.stopPropagation();
                this.onChange([]);
                if (onOk) onOk([], []);
              }}
            />
          )}
        </div>
      </Popover>
    );
  }
}

export default SingleRangePicker;
