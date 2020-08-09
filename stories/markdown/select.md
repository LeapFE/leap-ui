# Select 使用文档

> Select 的属性与 Ant Design 的属性保持一致，此处指列出商用的属性使用方法，其他属性请参照 ant Design 文档；

---

> 以下文档的顺序与 Canval 中的案例保持一致

### **组件使用前**

```#
import FL from 'Fish-UI';
const { RSelect } = FL;
const { Option } = RSelect;
```

---

### **常规**

```#
<RSelect placeholder="请选择" style={{ width: 210 }}>
  <Option value="jaket">jaket</Option>
  <Option value="yousf">yousf</Option>
  <Option value="rose">rose</Option>
  <Option value="jodie">jodie</Option>
  <Option value="smiley">smiley</Option>
</RSelect>
```

### **禁用**

###### **添加 disabled 属性**

```#
<RSelect placeholder="请选择" style={{ width: 210 }} disabled>
  <Option value="jaket">jaket</Option>
  <Option value="yousf">yousf</Option>
  <Option value="rose">rose</Option>
  <Option value="jodie">jodie</Option>
  <Option value="smiley">smiley</Option>
</RSelect>

```

### **默认 value 值**

###### value 属性给 Select 赋值，onChange 返回新的值

```#

state = {
  value: "jaket"
}
....
const { value } = this.state;
return (
<RSelect
  placeholder="请选择"
  style={{ width: 210 }}
  value={value}
  onChange={(value, node) => this.setState({ value })}
>

  <Option value="jaket">jaket</Option>
  <Option value="yousf">yousf</Option>
  <Option value="rose">rose</Option>
  <Option value="jodie">jodie</Option>
  <Option value="smiley">smiley</Option>

</RSelect>
);
```

### **禁用选项**

###### 在星星的 Option 上添加 disabled 属性

```#
<RSelect placeholder="请选择" style={{ width: 210 }}>
    <Option value="jaket" disabled>jaket</Option>
    <Option value="yousf" disabled>yousf</Option>
    <Option value="rose">rose</Option>
    <Option value="jodie">jodie</Option>
    <Option value="smiley">smiley</Option>
</RSelect>
```

### **复选**

###### mode="multiple"时则变为复选模式

```#
<RSelect
    placeholder="请选择"
    style={{ width: 210 }}
    mode="multiple"
>
    <Option value="jaket">jaket</Option>
    <Option value="yousf">yousf</Option>
    <Option value="rose">rose</Option>
    <Option value="jodie">jodie</Option>
    <Option value="smiley">smiley</Option>
</RSelect>
```

### **复选计数**

###### 复现模式下，maxTagCount 属性为最多显示多少个 tag，超过此值则计数

```#
<RSelect
    placeholder="请选择"
    style={{ width: 210 }}
    mode="multiple"
    maxTagCount={1}
>
    <Option value="jaket">jaket</Option>
    <Option value="yousf">yousf</Option>
    <Option value="rose">rose</Option>
    <Option value="jodie">jodie</Option>
    <Option value="smiley">smiley</Option>
</RSelect>
```

### **复选溢出**

###### maxTagCount 属性为 0 时显示已选 n 个选项…

```#
<RSelect
    placeholder="请选择"
    style={{ width: 210 }}
    mode="multiple"
    maxTagCount={0}
>
    <Option value="jaket">jaket</Option>
    <Option value="yousf">yousf</Option>
    <Option value="rose">rose</Option>
    <Option value="jodie">jodie</Option>
    <Option value="smiley">smiley</Option>
</RSelect>
```

### **复选默认 value**

```#
state = {
    multipleValue: ["jaket"]
};
...
const { multipleValue } = this.state;
return (
  <RSelect
    placeholder="请选择"
    style={{ width: 210 }}
    mode="multiple"
    maxTagCount={0}
    value={multipleValue}
    onChange={(value, node) => this.setState({ multipleValue: value })}
  >
    <Option value="jaket">jaket</Option>
    <Option value="yousf">yousf</Option>
    <Option value="rose">rose</Option>
    <Option value="jodie">jodie</Option>
    <Option value="smiley">smiley</Option>
  </RSelect>
);
```
