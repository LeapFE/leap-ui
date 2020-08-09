#### 表格里面 td 里面统一类名,如：over_text.这是数据的长度不会超出

```#
    {
    title: "ID",
    dataIndex: "id",
    width: 50,
    render: text => <div className="over_text">{text || "--"}</div>
  }
```

#### 表格里面 td 里面统一类名: nowrap_text。超出宽度会溢出隐藏

```#
{
    title: "数量",
    dataIndex: "count",
    width: 50,
    render: value => (
        <div className="nowrap_text">
            <div>{value || "--"}</div>
        </div>
        )
}
```

#### 表格里面 td 里面的最后一列加上类名：operation。全是蓝色，css 手型

```#
{
    title: "操作",
    fixed: "right",
    dataIndex: "setting",
    key: "setting",
    render: text => (
      <div className="over_text operation">
        <span>{"编辑"}</span>
        <span>{"新增"}</span>
      </div>
    )
```

#### 表格里面 td 里面的最后一列加上类名：operation。颜色会变，css 手型

```#
{
    title: "操作",
    fixed: "right",
    dataIndex: "setting",
    key: "setting",
    render: text => (
      <div className="over_text">
        <span className="icon_green">{"新增"}</span>
        <span className="icon_blue">{"编辑"}</span>
        <span className="icon_red">{"删除"}</span>
      </div>
    )
```

#### 最后一列不加宽度(目的是最后一列向左对齐，距右 16px)

```#
const columns = [
  {
    title: "ID",
    dataIndex: "id",
    width: 50,
    key: "id",
    render: text => (
      <div className="over_text">
        <div className="write_text"> {text}</div>
      </div>
    )
  },
  {
    title: "名字",
    dataIndex: "name",
    width: 50,
    key: "name",
    render: text => (
      <div className="over_text">
        <div className="write_text"> {text}</div>
      </div>
    )
  },
  {
    title: "数量",
    dataIndex: "count",
    width: 50,
    key: "count",
    render: text => (
      <div className="over_text">
        <div className="write_text"> {text}</div>
      </div>
    )
  },
  {
    title: "操作",
    dataIndex: "setting",
    key: "setting",
    render: text => (
      <div className="over_text operation">
        <div className="write_text"> {text}</div>
      </div>
    )
  }
```

#### 表格必须加上类名:className="no_datatable" (没有数据的时候，空页面展示)

```#
<Table className="no_datatable"
        ></Table>
```

#### 如果是无边框表格，额外加上类名: no_border

```#
<Table
            className="no_datatable no_border"
          ></Table>
```
