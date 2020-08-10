# Tree 使用文档

> Tree 的属性与大部分与 Ant Design 的属性保持一致，此处指列出商用的属性使用方法，其他属性请参照 ant Design 文档；

---

> 以下文档的顺序与 Canval 中的案例保持一致

### **组件使用前**

```#
import FL from 'Fish-UI';
const { RTree, SearchTree, ParentTree } = FL;
const { TreeNode } = RTree;
//渲染tree的数据
const Data = [
  {
    title: "0-0",
    value: "0-0",
    children: [
      {
        title: "0-0-0",
        value: "0-0-0",
        children: [
          { title: "0-0-0-0", value: "0-0-0-0" },
          { title: "0-0-0-1", value: "0-0-0-1" },
          { title: "0-0-0-2", value: "0-0-0-2" }
        ]
      },
      {
        title: "0-0-1",
        value: "0-0-1",
        children: [
          { title: "0-0-1-0", value: "0-0-1-0" },
          { title: "0-0-1-1", value: "0-0-1-1" },
          { title: "0-0-1-2", value: "0-0-1-2" }
        ]
      },
      { title: "0-0-2", value: "0-0-2" }
    ]
  },
  {
    title: "0-1",
    value: "0-1",
    children: [
      {
        title: "0-1-0",
        value: "0-1-0",
        children: [
          { title: "0-1-0-0", value: "0-1-0-0" },
          { title: "0-1-0-1", value: "0-1-0-1" },
          { title: "0-1-0-2", value: "0-1-0-2" }
        ]
      },
      {
        title: "0-1-1",
        value: "0-1-1",
        children: [
          { title: "0-1-1-0", value: "0-1-1-0" },
          { title: "0-1-1-1", value: "0-1-1-1" },
          { title: "0-1-1-2", value: "0-1-1-2" }
        ]
      },
      { title: "0-1-2", value: "0-1-2" }
    ]
  },
  { title: "0-2", value: "0-2" }
];
```

---

### **树单选**

```#
<RTree treeData={Data} />
```

### **父带子复选/单选子级均可**

```#
<ParentTree
    treeData={Data}
    onSelect={(selectedKeys, allchoosekeys) =>
      onSelect(selectedKeys, allchoosekeys)
    }
/>
```

### **树复选**

###### 复现模式下，maxTagCount 属性为最多显示多少个 tag，超过此值则计数

```#
<RTree treeData={Data} checkable />
```

### **带搜索（树单）**

```#
<SearchTree
    Inputplaceholder="请输入"
    treeData={Data}
    onSelect={selectedKeys => onSelect(selectedKeys)}
/>
```

### **带搜索（复选）**

```#
<SearchTree
    Inputplaceholder="请输入"
    treeData={Data}
    checkable={true}
    onSelect={selectedKeys => onSelect(selectedKeys)}
/>
```
