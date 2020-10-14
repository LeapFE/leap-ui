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
import { PopoverProps } from "antd/es/popover";

import Icon from "../icon";
import Tooltip from "../toolTip";
import Calendar from "./Calendar";
import Popover from "../popover";
import Button from "../button";

const format = "YYYY-MM-DD";

interface MultipleDateProps {
  value?: string[] | string;
  range?: string[];
  className?: string;
  style?: CSSProperties;
  placeholder?: string;
  disabled?: boolean;
  allowClear?: boolean;
  popoverProps?: PopoverProps;
  maxTagCount?: number;
  onChange?: (dates: string[]) => void;
}
interface MultipleDateState {
  selectedDates: string[];
  visible: boolean;
}
class MultipleDate extends React.Component<MultipleDateProps, MultipleDateState> {
  constructor(props: MultipleDateProps) {
    super(props);

    this.state = {
      selectedDates: [],
      visible: false,
    };
  }

  componentDidMount() {
    const { value = [] } = this.props;
    let selectedDates: string[] = [];

    if (value && typeof value === "string") {
      selectedDates = [value];
    } else if (Array.isArray(value)) {
      selectedDates = [...value];
    }

    this.setState({ selectedDates });
  }

  UNSAFE_componentWillUpdate(nextProps: MultipleDateProps) {
    if (nextProps.range && this.props.range && nextProps.range[0] !== this.props.range[0]) {
      this.setState({ selectedDates: [] });
    }
  }

  onChangeDate = (date: string) => {
    const { selectedDates = [] } = this.state;
    const selected = new Set(selectedDates);
    if (selected.has(date)) {
      selected.delete(date);
    } else {
      selected.add(date);
    }
    this.onChange(Array.from(selected));
  };

  onChange = (selectedDates: string[]) => {
    const { onChange } = this.props;
    this.setState({ selectedDates });

    if (typeof onChange === "function") {
      onChange(selectedDates);
    }
  };

  dateRender = () => {
    const { range = [] } = this.props;
    const { selectedDates } = this.state;
    const [start = "", end = ""] = range;

    return (
      <div className="fl_date_render">
        {range && range.length === 2 && (
          <div className="fl_ranger">
            <span>{moment(start).format(format)}</span>
            <span>~</span>
            <span>{moment(end).format(end)}</span>
          </div>
        )}
        <Calendar range={range} onChange={this.onChangeDate} selectedDates={selectedDates} />
        <div className="fl_bot">
          <Button type="primary" onClick={() => this.setState({ visible: false })}>
            确定
          </Button>
        </div>
      </div>
    );
  };

  valuesRender = (dates: string[]) => {
    const { maxTagCount = 2 } = this.props;
    return (
      <Tooltip
        placement="topLeft"
        title={
          dates.length > maxTagCount ? (
            <div className="multiple_date_tootip">
              {dates.map((child) => (
                <div key={child}>{child}</div>
              ))}
            </div>
          ) : null
        }
      >
        <div className="values">
          {dates.map(
            (child, key) =>
              key <= maxTagCount && (
                <span
                  key={key}
                  className={classnames("", {
                    ellipsis: key === maxTagCount,
                  })}
                >
                  {child}
                </span>
              ),
          )}
        </div>
      </Tooltip>
    );
  };
  render() {
    const {
      className = "",
      style = {},
      placeholder = "请选择",
      disabled = false,
      popoverProps = {},
      allowClear,
    } = this.props;
    const { selectedDates, visible } = this.state;
    const dates = selectedDates;

    return (
      <React.Fragment>
        <Popover
          trigger="click"
          hideArrow
          overlayClassName="fl_noarrow"
          onVisibleChange={(visible) => !disabled && this.setState({ visible })}
          visible={visible}
          content={this.dateRender()}
          placement="bottomLeft"
          {...popoverProps}
        >
          <span className="fl_multiple_date_picker_wip">
            <div
              className={classnames(`fl_multiple_date_picker`, {
                className,
                disabled,
                hasSelected: dates && dates.length,
              })}
              style={style}
              onClick={() => !disabled && this.setState({ visible: true })}
            >
              {this.valuesRender(dates)}
              <div className="placeholder">{placeholder}</div>
              <Icon
                type="calendar"
                className={classnames("multiple_date_picker_icon", {
                  allow_clear_picker_icon: allowClear !== false,
                })}
              />
              {allowClear !== false && (
                <Icon
                  className="range_picker_clear"
                  type="close-circle"
                  theme="filled"
                  onClick={(e) => {
                    e.stopPropagation();
                    this.onChange([]);
                  }}
                />
              )}
            </div>
          </span>
        </Popover>
      </React.Fragment>
    );
  }
}

export default MultipleDate;
