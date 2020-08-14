/* eslint-disable react/state-in-constructor */
import React from "react";
import { storiesOf } from "@storybook/react";
import moment from "moment";
import markdown from "../markdown/modal.md";

import Layout from "../common/layout";

import { DatePicker } from "leap-ui";

class DatePickerRender extends React.Component {
  state = {
    value1: undefined,
    value2: undefined,
  };

  render() {
    return (
      <Layout
        head="datePicker 时间选择器 (除了下边列出的组件，其他与antd一致)"
        items={[
          {
            name: "正常日历",
            content: (
              <>
                <DatePicker />
                <div className="msg">显示时间</div>
                <DatePicker showTime />
              </>
            ),
          },
          {
            name: "月选择器",
            content: (
              <>
                <DatePicker.MonthPicker />
              </>
            ),
          },
          {
            name: "周选择器",
            content: (
              <>
                <DatePicker.RangeWeekPicker />
                <div className="msg">
                  与antd的WeekPicker对比；
                  <br />
                  1）选中时间以区间的形式显示；
                  <br />
                  2）隐藏周的序号
                </div>
                <DatePicker.WeekPicker />
              </>
            ),
          },
          {
            name: "选择范围",
            content: (
              <>
                <DatePicker.RangePicker />
                <div className="msg">显示时间</div>
                <DatePicker.RangePicker showTime />
                <div className="msg">format</div>
                <DatePicker.RangePicker showTime format="YYYY-MM-DD HH:MM" />
              </>
            ),
          },

          {
            name: "单日历选择范围（可选择时分秒）",
            content: (
              <>
                <DatePicker.SingleRangePicker
                  value={this.state.value1}
                  onOk={(value) => this.setState({ value1: value })}
                />
                <div className="msg">可以选择时间、设置分钟间隔</div>
                <DatePicker.SingleRangePicker
                  showTime
                  minuteStep={5}
                  value={this.state.value1}
                  onOk={(value) => this.setState({ value1: value })}
                />
                <div className="msg">不可选的时间</div>
                <DatePicker.SingleRangePicker
                  disabledDate={(date) => date < moment()}
                  value={this.state.value1}
                  onOk={(value) => this.setState({ value1: value })}
                />
                <div className="msg">点一下选择当天00:00:00～23:59:59</div>
                <DatePicker.SingleRangePicker
                  radioDate
                  showTime
                  defaultTimes={["00:00:00", "23:59:59"]}
                  value={this.state.value1}
                  onOk={(value) => this.setState({ value1: value })}
                />
              </>
            ),
          },
          {
            name: "多选（非连续日期）",
            content: (
              <>
                <DatePicker.MultipleDate />
                <div className="msg">设置选中多于n个则在tooltip显示（默认为2）</div>
                <DatePicker.MultipleDate maxTagCount={1} />
                <div className="msg">设置可用范围</div>
                <DatePicker.MultipleDate
                  value={this.state.value2}
                  onChange={(value) => this.setState({ value2: value })}
                  range={["2020-07-10", "2020-08-20"]}
                />
              </>
            ),
          },
        ]}
      />
    );
  }
}
storiesOf("通用", module).add("datePicker 时间选择器", () => <DatePickerRender />, {
  notes: { markdown },
});
