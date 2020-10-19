import React, { FunctionComponent, useState, useRef } from "react";
import { TreeNodeValue } from "antd/es/tree-select/interface";

import { ProductTreeSelect } from "./productTreeSelect";

import { ProductListItemBySelected } from "./interface";

import productList from "./product.json";

const initSelectedProduct = [
  {
    product_name: "OL-SS4-N",
    product_id: 195,
  },
  {
    product_name: "G1A",
    product_id: 335,
  },
  {
    product_name: "外教小班Live一级下（已废弃）",
    product_id: 470,
  },
];

const ProductSelect: FunctionComponent = () => {
  const [selectedProduct, setSelectedProduct] = useState<ProductListItemBySelected[]>(
    initSelectedProduct,
  );

  const selectedProductRef = useRef<ProductListItemBySelected[]>(initSelectedProduct);

  // 全不选所有产品
  const unSelectAllProduct = useRef<boolean>(false);

  const handleSelectProduct = (
    selectedProduct: ProductListItemBySelected[],
    value: TreeNodeValue,
    selectAll: boolean,
  ) => {
    // eslint-disable-next-line no-console
    console.log("handleSelectProduct", selectedProduct, value, selectAll);

    if (selectedProduct.length === 0) {
      unSelectAllProduct.current = true;
    } else {
      unSelectAllProduct.current = false;
    }

    if (selectAll) {
      selectedProductRef.current = [];
    } else {
      selectedProductRef.current = selectedProduct;
    }

    setSelectedProduct(selectedProduct);
  };

  return (
    <ProductTreeSelect
      sourceTreeData={productList["data"]}
      onChange={handleSelectProduct}
      style={{ width: "200px" }}
      initSelectedProductList={selectedProduct}
      // autoSelectAllAfterInit
    />
  );
};

export default ProductSelect;
