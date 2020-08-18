# TreeSelect 使用文档

> TreeSelect 的属性与 Ant Design 的属性保持一致，此处指列出商用的属性使用方法，其他属性请参照 ant Design 文档；

---

> 以下文档的顺序与 Canval 中的案例保持一致

### **组件使用前**

```#
import FL from 'Fish-UI';
const { RTreeSelect } = FL;

//渲染tree的数据
const treeData = [
  {
    title: "Node1",
    value: "0-0",
    children: [
      {
        title: "Child Node1",
        value: "0-0-0"
      }
    ]
  },
  {
    title: "Node2",
    value: "0-1",
    children: [
      {
        title: "Child Node3",
        value: "0-1-0"
      },
      {
        title: "Child Node4",
        value: "0-1-1"
      },
      {
        title: "Child Node5",
        value: "0-1-2"
      }
    ]
  }
];
```

---

### **树单选**

```#
<RTreeSelect
    treeData={treeData}
    placeholder="请选择"
    style={{ width: 250 }}
/>
```

### **禁用**

###### **添加 disabled 属性**

```#
<RTreeSelect
    treeData={treeData}
    disabled
    placeholder="请选择"
    style={{ width: 250 }}
/>

```

### **默认 value 值**

###### value 属性给 TreeSelect 赋值，onChange 返回新的值

```#

state = {
  singleValue: "0-1-0"
}
....
const { singleValue } = this.state;
return (
  <RTreeSelect
    treeData={treeData}
    value={singleValue}
    onChange={(value, label) => this.setState({ singleValue: value })}
    placeholder="请选择"
    style={{ width: 250 }}
  />
);
```

### **树复选**

###### 添加 treeCheckable 属性

```#
<RTreeSelect
    treeData={treeData}
    treeCheckable
    placeholder="请选择"
    style={{ width: 250 }}
/>
```

### **树复选默认 value**

```#
state = {
    multipleValue: ["0-0-0", "0-1-0"]
};
...
const { multipleValue } = this.state;
return (
  <RTreeSelect
    treeData={treeData}
    treeCheckable
    value={multipleValue}
    onChange={(value, label) => this.setState({ multipleValue: value })}
    placeholder="请选择"
    style={{ width: 250 }}
  />
);
```

### **树复选计数**

###### 复现模式下，maxTagCount 属性为最多显示多少个 tag，超过此值则计数

```#
<RTreeSelect
    treeData={treeData}
    treeCheckable
    placeholder="请选择"
    maxTagCount={1}
    style={{ width: 250 }}
/>
```

### **树复选溢出**

###### maxTagCount 属性为 0 时显示已选 n 个选项…

```#
<RTreeSelect
    treeData={treeData}
    treeCheckable
    placeholder="请选择"
    maxTagCount={0}
    style={{ width: 250 }}
/>
```

### **带搜索单选**

###### 搜索功能添加 showSearch 属性

```#
<RTreeSelect
    treeData={treeData}
    placeholder="请选择"
    style={{ width: 250 }}
    showSearch
/>
```

### **带搜索多选**

```#
<RTreeSelect
    treeData={treeData}
    treeCheckable
    showSearch
    placeholder="请选择"
    style={{ width: 250 }}
/>
```

### **带搜索计数**

```#
<RTreeSelect
    treeData={treeData}
    treeCheckable
    placeholder="请选择"
    maxTagCount={1}
    style={{ width: 250 }}
    showSearch
/>
```

### **带搜索溢出**

```#
<RTreeSelect
    treeData={treeData}
    treeCheckable
    placeholder="请选择"
    maxTagCount={0}
    style={{ width: 250 }}
    showSearch
/>
```

### **父带子复选+单选子级**

###### 添加 parentTree 属性

```#
<RTreeSelect
    treeData={treeData}
    placeholder="请选择"
    parentTree={true}
/>
```
