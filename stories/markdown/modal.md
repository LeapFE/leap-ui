## 使用方式如下

```#
import {Modal,Button} from 'Fish-UI';
```

### 1.普通 modal()

```#
  <Modal
                  title=""
                  width={}
                  visible={}
                  onCancel={}
                  footer={
                    <div>
                      <Button type="primary">
                        确认
                      </Button>
                      <Button>
                        取消
                      </Button>
                    </div>
                  }
                >
                </Modal>

```

### 2.高度超出限制 modal(在普通 modal 的基础上加个类名“modal_scroll”)

```#
   <Modal
                  className="modal_scroll"
                  title=""
                  width={}
                  visible={}
                  onCancel={}
                  footer={
                    <div>
                      <Button type="primary">
                        确认
                      </Button>
                      <Button>
                        取消
                      </Button>
                    </div>
                  }
                >

                </Modal>
```

### 3.没有 footer 的 modal(footer={false})

```#
  <Modal
                  title=""
                  visible={}
                  footer={false}

                >

                </Modal>
```

### 4.警告单行文字 1

```#
  <Modal.single
                  single_btn={false}
                  fl_single_ok={"确定"}
                  fl_single_cancel={"取消"}
                  fl_onChange={() => {}}
                  fl_onCancel={() => {}}
                  width={461}
                  visible={}
                  fl_icon_title={
                    <Icon type="exclamation-circle" theme="filled" />
                  }
                  fl_content={
                    "确定要退出登录吗？退出登录后，将不会删除任何数据~"
                  }
                ></Modal.single>
```

### 5.警告单行文字 2

```#
  <Modal.single
                  fl_single_btn={true}
                  fl_single_text={"知道了"}
                  fl_onChange={() => {}}
                  width={461}
                  visible={}
                  fl_icon_title={
                    <Icon type="exclamation-circle" theme="filled" />
                  }
                  fl_content={
                    "确定要退出登录吗？退出登录后，将不会删除任何数据~"
                  }
                ></Modal.single>
```

### 6.警告带说明文字 1(width 属性不传默认 460px)

```#
  Modal.confirm({
      width: 460,
      title: "确定要删除该班级吗？",
      content: "如果删除该班级，则该班级所有内容将不会修复！请慎重操作！",
      okText: "删除",
      cancelText: "取消",
      onOk() {},
      onCancel() {},
    });
```

### 7.警告带说明文字 2(width 属性不传默认 460px)

```#
  Modal.info({
      width: 460,
      title: "确定要删除该班级吗？",
      content: "如果删除该班级，则该班级所有内容将不会修复！请慎重操作！",
      okText: "确定",
      onOk() {},
    });
```
