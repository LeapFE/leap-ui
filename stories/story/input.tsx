import React from "react";
import { storiesOf } from "@storybook/react";

import { Input, Select } from "leap-ui";
import markdown from "../markdown/input.md";

const Search = Input.Search;

console.log(Input.TextArea);

const InputRender = () => {
  return (
    <div>
      <h3 style={{ margin: 20 }}>1.文本输入框</h3>
      <div style={{ width: 300 }}>
        <div style={{ margin: 20 }}>
          <Input placeholder="请输入内容" />
        </div>
        <div style={{ margin: 20 }}>
          <Input disabled placeholder="不可点击" />
        </div>
      </div>
      <h3 style={{ margin: 20 }}>2.带有提示信息</h3>
      <div style={{ width: 300 }}>
        <div style={{ margin: 20 }}>
          <Input defaultValue="错误" error="错误提示反馈文案" />
        </div>
        <div style={{ margin: "30px 20px" }}>
          <Input defaultValue="正确" success="正确反馈文案" />
        </div>
        <div style={{ margin: 20 }}>
          <Input
            defaultValue="有提示信息"
            popover={{
              title: "标题",
              content: "内容内容内容内容内容内容",
            }}
          />
        </div>
        <div style={{ margin: "20px 20px 50px 20px" }}>
          <Input defaultValue="即时加载" loading />
        </div>
      </div>
      <h3 style={{ margin: 20 }}>3.搜索输入框</h3>
      <div style={{ width: 300 }}>
        <div style={{ margin: 20 }}>
          <Search
            style={{ width: 260 }}
            placeholder="请输入工号/英文/中文名字"
            onSearch={(e) => console.log(111, e)}
          />
          <Search
            style={{ width: 260 }}
            placeholder="请输入工号/英文/中文名字"
            enterButton
            onSearch={(e) => console.log(222, e)}
          />
        </div>
        <div style={{ margin: 20 }}>
          <Input.SearchGroup placeholder="带搜索按钮" />
        </div>
        <div style={{ margin: "20px 20px 60px 20px" }}>
          <Input.SearchGroup nullResult={"没有搜到结果哦~"} />
        </div>
      </div>
      <h3 style={{ margin: 20 }}>4.前后缀</h3>
      <div style={{ width: 300 }}>
        <div style={{ margin: 20 }}>
          <Input addonBefore="￥" addonAfter=".com" defaultValue="13234.22" />
        </div>
        <div style={{ margin: 20 }}>
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
        </div>
      </div>
      <h3 style={{ margin: 20 }}>5.区域文本</h3>
      <div style={{ width: 300 }}>
        <div style={{ margin: 20 }}>
          <Input.TextArea placeholder="文本域" count={50} style={{ width: 260 }} />
        </div>
        <div style={{ margin: 20 }}>
          <Input.TextArea value="内容" count={50} style={{ width: 260 }} />
        </div>
        <div style={{ margin: 20 }}>
          <Input.TextArea placeholder="文本域" disabled style={{ width: 260 }} />
        </div>
      </div>
    </div>
  );
};
storiesOf("通用", module).add("Input 输入框", () => <InputRender />, {
  notes: { markdown },
});
