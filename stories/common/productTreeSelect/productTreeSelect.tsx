import React, { FunctionComponent, useState, CSSProperties, useMemo, useEffect } from "react";
import { TreeSelect } from "leap-ui";

import { TreeNode } from "antd/es/tree-select";
import { TreeNodeValue } from "antd/es/tree-select/interface";

import {
  getBackendResourceProduct_listData,
  ProductTree,
  ProductListItemBySelected,
} from "./interface";

type TreeNodeWithoutChildren = Omit<TreeNode, "children">;

interface ProductTreeSelectProps {
  sourceTreeData: getBackendResourceProduct_listData["data"];
  initSelectedProductList?: ProductListItemBySelected[];
  onChange?: (
    selectedProductList: Array<ProductListItemBySelected>,
    value: TreeNodeValue,
    selectAll: boolean,
  ) => void;
  disabled?: boolean;
  autoSelectAllAfterInit?: boolean;
  style?: CSSProperties;
}

function transformerSourceTreeData(sourceTreeData: ProductTree[], preKey?: string): TreeNode[] {
  const result: TreeNode[] = [];
  const _preKey = preKey || "0";

  sourceTreeData.forEach((item, i) => {
    if (
      Array.isArray(item.child) &&
      item.child.length > 0 &&
      item.child.every((c) => !c.product_id && Array.isArray(c.child) && c.child.length === 0)
    ) {
      return;
    }
    if (!item.product_id && Array.isArray(item.child) && item.child.length === 0) {
      return;
    }

    const key = `${_preKey}-${i}`;

    result[i] = {};

    result[i].key = key;
    result[i].title = item.name;

    if (item.product_id && item.product_category_id) {
      // product_id^name
      result[i].value = `${item.product_id}^${item.name}`;
    } else {
      // id^name
      result[i].value = `${item.id}^${item.name}`;
    }

    if (Array.isArray(item.child) && item.child.length > 0) {
      result[i].children = transformerSourceTreeData(item.child, key);
    }
  });

  return result;
}

function calcProductAmount(
  transformedTreeData: TreeNode[],
): { productValueList: string[]; size: number } {
  const productList: Array<TreeNodeWithoutChildren> = [];
  const productValueList: string[] = [];

  function calc(transformedTreeData: TreeNode[], length?: number): number {
    let _length = length || 0;

    transformedTreeData.forEach((item) => {
      if (!Array.isArray(item.children) && item) {
        if (!productList.find((m) => m.value === item.value)) {
          _length += 1;
          productList.push(item as TreeNodeWithoutChildren);
          productValueList.push(item.value as string);
        }
      }

      if (Array.isArray(item.children) && item.children.length > 0) {
        _length = calc(item.children as TreeNode[], _length);
      }
    });

    return _length;
  }

  return { productValueList, size: calc(transformedTreeData) };
}

const ProductTreeSelect: FunctionComponent<ProductTreeSelectProps> = ({
  sourceTreeData,
  onChange,
  initSelectedProductList = [],
  disabled,
  autoSelectAllAfterInit,
  style = {},
}) => {
  const treeData = useMemo(() => transformerSourceTreeData(sourceTreeData), [sourceTreeData]);

  const { productValueList, size } = useMemo(() => calcProductAmount(treeData), [treeData]);

  const initSelectedProductValue = useMemo(() => {
    if (autoSelectAllAfterInit) {
      return productValueList;
    }

    return initSelectedProductList.map((v) => `${v.product_id}^${v.product_name}`);
  }, [initSelectedProductList, autoSelectAllAfterInit, productValueList]);

  const [selectedProductValue, setSelectedProductValue] = useState<TreeNodeValue>(
    initSelectedProductValue,
  );

  const handleProductTreeChange = (value: TreeNodeValue) => {
    setSelectedProductValue(value);

    if (Array.isArray(value)) {
      const selectedProductList: ProductListItemBySelected[] = (value as string[]).map((v) => {
        const d = v.split("^");
        return { product_name: d[1], product_id: Number(d[0]) };
      });

      if (typeof onChange === "function") {
        onChange(selectedProductList, value, selectedProductList.length === size);
      }
    }
  };

  useEffect(() => {
    setSelectedProductValue(initSelectedProductValue);
  }, [initSelectedProductValue]);

  return (
    <TreeSelect
      disabled={disabled}
      value={selectedProductValue}
      treeData={treeData}
      onChange={handleProductTreeChange}
      placeholder="选择产品"
      searchPlaceholder="搜索产品"
      maxTagCount={0}
      showSearch
      treeCheckable
      style={{ width: "200px", ...style }}
      popoverOverlayStyle={{ width: "340px" }}
    />
  );
};

export { ProductTreeSelect };
