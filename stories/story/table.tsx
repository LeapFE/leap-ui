import React from "react";
import { storiesOf } from "@storybook/react";

import { Table } from "leap-ui";

import markdown from "../markdown/table.md";

const data = [];
for (let i = 1; i <= 4; i++) {
  data.push({
    id: i,
    name: "John",
    count: `${i}2`,
    // description: `My name is John Brown, I am ${i}2 years old, living in New York No. ${i} Lake Park.`
    description: `My name is John Brown`,
  });
}
const expandedRowRender = (record) => <p>{record.description}</p>;
const columns = [
  {
    title: "ID",
    dataIndex: "id",
    width: 150,
    render: (text) => <div className="over_text">{text || "--"}</div>,
  },
  {
    title: "名字",
    dataIndex: "name",
    width: 150,
    render: (text) => <div className="over_text">{text || "--"}</div>,
  },
  {
    title: "名字1",
    dataIndex: "name1",
    width: 150,
    render: (text) => <div className="over_text">{text || "--"}</div>,
  },
  {
    title: "名字2",
    dataIndex: "name2",
    width: 150,
    render: (text) => <div className="over_text">{text || "--"}</div>,
  },
  {
    title: "名字3",
    dataIndex: "name3",
    width: 150,
    render: (text) => <div className="over_text">{text || "--"}</div>,
  },
  {
    title: "数量",
    dataIndex: "count",
    width: 150,
    render: (value) => (
      <div className="nowrap_text">
        <div>{value || "--"}</div>
      </div>
    ),
  },
  {
    title: "操作",
    dataIndex: "setting",
    render: (text) => (
      <div className="over_text">
        <span className="icon_green">{"新增"}</span>
        <span className="icon_blue">{"编辑"}</span>
        <span className="icon_red">{"删除"}</span>
      </div>
    ),
    //   <>
    //     <a onClick={() => Message.info("编辑")}>编辑</a>
    //     {/* <Divider type="vertical" /> */}
    //     <Popconfirm
    //       title="确认删除吗?"
    //       onOk={() => Message.error(`ID: ${data.id}`)}
    //     >
    //       <a>删除</a>
    //     </Popconfirm>
    //   </>
    //)
  },
];
const columns1 = [
  {
    title: "ID",
    dataIndex: "id",
    width: 100,
    render: (text) => <div className="over_text">{text || "--"}</div>,
  },
  {
    title: "名字",
    dataIndex: "name",
    width: 100,
    render: (text) => <div className="over_text">{text || "--"}</div>,
  },
  {
    title: "数量",
    dataIndex: "count",
    width: 100,
    render: (value) => (
      <div className="nowrap_text">
        <div>{value || "--"}</div>
      </div>
    ),
  },
  {
    title: "单价",
    dataIndex: "sscount",
    width: 100,
    render: (text) => <div className="over_text">{text || "--"}</div>,
  },
  {
    title: "总价",
    dataIndex: "all",
    width: 100,
    render: (text) => <div className="over_text">{text || "--"}</div>,
  },
  {
    title: "职位",
    dataIndex: "work",
    width: 100,
    render: (value) => (
      <div className="nowrap_text">
        <div>{value || "--"}</div>
      </div>
    ),
  },
  {
    title: "操作",
    fixed: "right",
    dataIndex: "setting",
    render: (text) => (
      <div className="over_text operation">
        <span>{"编辑"}</span>
        <span>{"新增"}</span>
      </div>
    ),

    //   <>
    //     <a onClick={() => Message.info("编辑")}>编辑</a>
    //     {/* <Divider type="vertical" /> */}
    //     <Popconfirm
    //       title="确认删除吗?"
    //       onOk={() => Message.error(`ID: ${data.id}`)}
    //     >
    //       <a>删除</a>
    //     </Popconfirm>
    //   </>
    //)
  },
];
const dataSource = [
  {
    name: "小明",
    name1: "小明",
    name2: "小明",
    name3: "小明",
    count: 1,
    id: 1,
  },
  {
    name: "小红",
    name1: "小明",
    name2: "小明",
    name3: "小明",
    count: "小嘻嘻嘻嘻嘻嘻嘻嘻寻寻寻寻寻",
    id: 2,
  },
  {
    name: "小李",
    name1: "小明",
    name2: "小明",
    name3: "小明",
    count: 199,
    id: 3,
  },
  {
    name: "小王",
    name1: "小明",
    name2: "小明",
    name3: "小明",
    count: 199,
    id: 4,
  },
];
const dataSource1 = [
  {
    name: "小明",
    count: 1,
    id: 1,
    sscount: 20,
    all: 30,
    work: "医生",
  },
  {
    name: "小红",
    count: 344,
    id: 2,
    sscount: 20,
    all: 30,
    work: "医生222222222222222222222",
  },
  {
    name: "小李",
    count: 199,
    id: 3,
    sscount: 20,
    all: 30,
    work: "医生",
  },
  {
    name: "小花",
    count: 199,
    id: 4,
    sscount: 20,
    all: 304,
    work: "学生",
  },
];
const tableRender = () => {
  return (
    <div
      style={{
        width: 1000,
        margin: "0 auto",
      }}
    >
      <div style={{ width: 1000, marginRight: 40 }}>
        <div style={{ fontSize: 24, marginLeft: 20 }}>1.普通表格(包括列，溢出隐藏)</div>
        <div style={{ marginBottom: 30, marginLeft: 20 }}>
          <Table
            className="no_datatable"
            columns={columns}
            dataSource={dataSource}
            rowkey="id"
            //   pagination={pagination}
            //   scroll={{ x: 2735 }}
            rowKey="id"
          ></Table>
        </div>
        <div style={{ marginBottom: 30, marginLeft: 20 }}>
          <div style={{ fontSize: 24, marginLeft: 20 }}>2.头部固定 </div>
          <Table
            className="no_datatable"
            columns={columns1}
            dataSource={dataSource}
            scroll={{ y: 130 }}
            rowkey="id"
            //   pagination={pagination}
            //   scroll={{ x: 2735 }}
            rowKey="id"
          ></Table>
        </div>
      </div>
      <div style={{ width: 1000 }}>
        <div style={{ fontSize: 24, marginLeft: 20 }}>3.侧边栏固定</div>
        <div style={{ marginBottom: 30, marginLeft: 20 }}>
          <Table
            className="no_datatable"
            columns={columns1}
            dataSource={dataSource1}
            rowkey="id"
            //   pagination={pagination}
            scroll={{ x: 1480 }}
            rowKey="id"
          ></Table>
        </div>
        <div style={{ marginBottom: 30, marginLeft: 20 }}>
          <div style={{ fontSize: 24, marginLeft: 20 }}>4.空页面</div>
          <Table
            className="no_datatable"
            columns={columns1}
            dataSource={[]}
            rowkey="id"
            //   pagination={pagination}
            scroll={{ x: 580 }}
            rowKey="id"
          ></Table>
        </div>
      </div>
      <div style={{ width: 1000 }}>
        <div style={{ fontSize: 24, marginLeft: 20 }}>5.无边框表格/用于背景块内</div>
        <div style={{ marginBottom: 30, marginLeft: 20 }}>
          <Table
            className="no_datatable no_border"
            columns={columns}
            dataSource={dataSource}
            rowkey="id"
            //   pagination={pagination}
          ></Table>
        </div>
      </div>
      <div style={{ width: 1000 }}>
        <div style={{ fontSize: 24, marginLeft: 20 }}>6.可展开表格</div>
        <div style={{ marginBottom: 30, marginLeft: 20 }}>
          <Table
            className="no_datatable"
            columns={columns}
            dataSource={data}
            expandedRowRender={expandedRowRender}
            rowkey="id"
            //   pagination={pagination}
          ></Table>
        </div>
      </div>
      <div style={{ width: 1000 }}>
        <div style={{ fontSize: 24, marginLeft: 20 }}>6.可展开表格（隐藏展开按钮）</div>
        <div style={{ marginBottom: 30, marginLeft: 20 }}>
          <Table
            hideExpandBtn
            className="no_datatable"
            columns={columns}
            dataSource={data}
            expandedRowRender={expandedRowRender}
            rowkey="id"
            //   pagination={pagination}
          ></Table>
        </div>
      </div>
    </div>
  );
};

storiesOf("数据展示", module).add("Table 表格", () => tableRender(), {
  notes: { markdown },
});
