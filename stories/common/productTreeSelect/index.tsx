import React, { FunctionComponent, useState, useRef } from "react";
import { TreeNodeValue } from "antd/es/tree-select/interface";

import { ProductTreeSelect } from "./productTreeSelect";

import { ProductListItemBySelected } from "./interface";

import productList from "./product.json";

const ProductSelect: FunctionComponent = () => {
  const [selectedProduct, setSelectedProduct] = useState<ProductListItemBySelected[]>([]);

  const selectedProductRef = useRef<ProductListItemBySelected[]>([]);

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
      autoSelectAllAfterInit
    />
  );
};

export default ProductSelect;
