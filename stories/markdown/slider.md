## 使用方式如下

### 1.常规滑块 （不可用按钮 ：disabled）

```#
<Slider defaultValue={20} />

<Slider disabled />
```

### 2.双滑块 （range)

```#
<Slider range defaultValue={[20, 50]} />

<Slider
  range
  customBotMark={["MIN", "MAX"]}
  max={30}
  min={0}
  value={[11, 20]}
  onChange={e => {}} //[min, max]
/>
```

### 3.可输入 （range)

```#
<Slider
  range
  max={100}
  min={0}
  defaultValue={[11, 40]}
  input={true}
/>

<Slider
  width={200}
  range
  max={100}
  min={0}
  defaultValue={[11, 40]}
  input={true}
/>
```
