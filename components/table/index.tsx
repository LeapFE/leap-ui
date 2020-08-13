import React, { Component } from "react";
import ClassNames from "classnames";

import { Table as AntdTable } from "antd";
import * as AntdTableInterface from "antd/es/table";

import "./style";

export interface TableProps<T> extends AntdTableInterface.TableProps<T> {
  simple?: boolean;
  hideExpandBtn?: boolean;
}

class Table<T> extends Component<TableProps<T>> {
  render() {
    const { simple, className, columns, dataSource, hideExpandBtn, ...otherProps } = this.props;

    return (
      <AntdTable
        {...otherProps}
        className={ClassNames("common_table", className, {
          hide_expand_btn: hideExpandBtn,
          simple,
        })}
        columns={columns}
        dataSource={dataSource}
      />
    );
  }
}

// export { AntdTable, AntdTableInterface };
export default Table;
