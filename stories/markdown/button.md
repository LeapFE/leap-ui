#### 使用方式如下，可以加自定义类名(3,5 的区别在于 icon 和文字的间距)

#### 0.不可用按钮 ：disabled

```#
 <Button disable><span>主操作按钮</span></Button>
```

#### 1.主按钮（背景为主色、文字为白色)：type="primary"；线框按钮：不加 type；文字按钮(不带边框的按钮)：type="text"；幽灵按钮：不加 type,加 ghost;

```#
 <Button type="primary"><span>主操作按钮</span></Button>

 <Button> <span>线框按钮/次按钮</span></Button>

 <Button type="text"><span> 文字按钮</span></Button>

 <Button ghost > <span>幽灵按钮</span></Button>
```

#### 2.加图标按钮有边框（带图标、文字灰色、图标为主色）： type="icon-primary"；加图标按钮有边框（带图标、文字灰色、图标为红色）type="icon-danger"；加图标按钮有边框（、图标为红色、文字红色，背景白色）：type="danger"

```#
<Button type="icon-primary">
  <Icon type="heart"></Icon>
          <span>已收藏</span>
</Button>

<Button type="icon-danger">
  <Icon type="heart"></Icon>
         <span> 已收藏</span>
</Button>

<Button >
  <Icon type="heart"></Icon>
  <span>已收藏</span>
</Button>

<Button type="danger">
  <Icon type="rest"></Icon>
         <span> 危险按钮</span>
</Button>
```

#### 3.图标按钮无边框（有 icon 的按钮 文字灰色、图标蓝灰色）：type="link-icon right"；图标按钮无边框（有 icon 的按钮 文字、图标蓝主色）type="link-icon-primary right"

```#
<Button type="icon-primary right">
         <span> 重要操作</span>
  <Icon type="heart"></Icon>
</Button>

<Button type="icon-danger right">
         <span> 危险操作</span>
  <Icon type="rest"></Icon>
</Button>
```

#### 4.按钮组（ 按钮为选中的状态 则在相应的按钮上添加 className='active'）;按钮组有间隙： ButtonGroup 上加 type="spice";只有 icon 的按钮:type="sigle-icon"；

```#
    <ButtonGroup>
          <Button><span>一</span></Button>
          <Button className="active"><span>二</span></Button>
          <Button><span>三</span></Button>
          <Button className="active"><span>四</span></Button>
          <Button className="active"><span>五</span></Button>
          <Button><span>六</span></Button>
          <Button><span>七</span></Button>
      </ButtonGroup>

      <ButtonGroup type="spice">
          <Button><span>进班</span></Button>
          <Button className="active"><span>订单支付</span></Button>
          <Button><span>转入</span></Button>
          <Button><span>转出</span></Button>
          <Button><span>续费</span></Button>
      </ButtonGroup>

      <ButtonGroup>
          <Button type="sigle-icon">
            <Icon type="appstore"></Icon>
          </Button>
          <Button type="sigle-icon">
            <Icon type="appstore"></Icon>
          </Button>
          <Button type="sigle-icon" className="active">
            <Icon type="appstore"></Icon>
          </Button>
      </ButtonGroup>
```

#### 5.其他按钮.

```#
 <Button type="link-icon" style={{ display: "block", marginRight: 30 }}>
          <Icon type="appstore"></Icon>
          <span>分享</span>
        </Button>

        <Button type="link-icon-primary" style={{ display: "block" }}>
          <span>分享</span>
          <Icon type="appstore"></Icon>
        </Button>
```
