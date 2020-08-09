# notification 使用文档

> notification 的属性与 Ant Design 的属性保持一致，此处指列出商用的属性使用方法，其他属性请参照 ant Design 文档；

---

> 以下文档的顺序与 Canval 中的案例保持一致

### **组件使用前**

````#
import FL from 'Fish-UI';
const { RNotification } = FL;
---

### **不同状态**

```#
<>
  <Button
    onClick={() =>
      RNotification.info({
        message: `标题标题标题`,
        description: "内容内容内容内容内容内容内容内容内容内容",
      })
    }
    type="primary"
  >
    info
  </Button>
  <Button
    onClick={() =>
      RNotification.success({
        message: `标题标题标题`,
        description: "内容内容内容内容内容内容内容内容内容内容",
      })
    }
    type="primary"
    style={{ marginLeft: 10 }}
  >
    success
  </Button>
  <Button
    onClick={() =>
      RNotification.warning({
        message: `标题标题标题`,
        description: "内容内容内容内容内容内容内容内容内容内容",
      })
    }
    type="primary"
    style={{ marginLeft: 10 }}
  >
    warning
  </Button>
  <Button
    onClick={() =>
      RNotification.error({
        message: `标题标题标题`,
        description: "内容内容内容内容内容内容内容内容内容内容",
      })
    }
    type="primary"
    style={{ marginLeft: 10 }}
  >
    error
  </Button>
</>
````

### **open**

###### **没有状态 不显示 icon**

```#
<Button
  onClick={() =>
    RNotification.open({
      message: `标题标题标题`,
      description: "内容内容内容内容内容内容内容内容内容内容",
    })
  }
  type="primary"
>
  open
</Button>

```

### **不同状态,不显示 Icon**

###### hideIcon=true

```#

 <>
  <Button
    onClick={() =>
      RNotification.info({
        message: `标题标题标题`,
        description: "内容内容内容内容内容内容内容内容内容内容",
        hideIcon: true,
      })
    }
    type="primary"
  >
    Hide icon info
  </Button>
  <Button
    onClick={() =>
      RNotification.success({
        message: `标题标题标题`,
        description: "内容内容内容内容内容内容内容内容内容内容",
        hideIcon: true,
      })
    }
    type="primary"
    style={{ marginLeft: 10 }}
  >
    Hide icon success
  </Button>

  <Button
    onClick={() =>
      RNotification.warning({
        message: `标题标题标题`,
        description: "内容内容内容内容内容内容内容内容内容内容",
        hideIcon: true,
      })
    }
    type="primary"
    style={{ marginTop: 10 }}
  >
    Hide icon warning
  </Button>
  <Button
    onClick={() =>
      RNotification.error({
        message: `标题标题标题`,
        description: "内容内容内容内容内容内容内容内容内容内容",
        hideIcon: true,
      })
    }
    type="primary"
    style={{ marginLeft: 10, marginTop: 10 }}
  >
    Hide icon error
  </Button>
</>
```
