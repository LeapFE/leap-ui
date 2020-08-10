## 使用方式如下

### 1.常规输入框 （不可用按钮 ：disabled）

```#
<Input placeholder="请输入内容" />

<Input disabled placeholder="不可点击" />
```

### 2.带有提示信息

```#
<Input defaultValue="错误" error="错误提示反馈文案" />

<Input defaultValue="正确" success="正确反馈文案" />

<Input
  defaultValue="有提示信息"
  popover={{
    title: "标题",
    content: "内容内容内容内容内容内容"
  }}
/>

<Input defaultValue="即时加载" loading />
```

### 3.搜索输入框

```#
<Input.SearchGroup placeholder="带搜索按钮" />

<Input.SearchGroup nullResult={"没有搜到结果哦~"} />
```

### 4.前后缀

```#
<Input addonBefore="￥" addonAfter=".com" defaultValue="13234.22" />

<Input
  addonBefore={
    <Select defaultValue="1">
      <Select.Option value="1">选择器</Select.Option>
      <Select.Option value="2">选择器2</Select.Option>
    </Select>
  }
  placeholder="带select前后复合型"
  addonAfter=".com"
/>
```

### 5.区域文本

```#
<Input.TextArea
  placeholder="文本域"
  count={50}
/>

<Input.TextArea value="内容" count={50} />

<Input.TextArea
  placeholder="文本域"
  disabled
/>
```
