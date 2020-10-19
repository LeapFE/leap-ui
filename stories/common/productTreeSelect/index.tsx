import React, { FunctionComponent, useState, useRef } from "react";
import { TreeNodeValue } from "antd/es/tree-select/interface";

import { ProductTreeSelect } from "./productTreeSelect";

import { ProductListItemBySelected } from "./interface";

import productList from "./product.json";

const initSelectedProduct = [
  {
    product_id: 42,
    product_name: "Stage 1",
  },
  {
    product_id: 43,
    product_name: "Stage 10",
  },
  {
    product_id: 44,
    product_name: "Stage 2",
  },
  {
    product_id: 45,
    product_name: "Stage 3",
  },
  {
    product_id: 48,
    product_name: "Stage 4(入口)",
  },
  {
    product_id: 48,
    product_name: "Stage 4(升级)",
  },
  {
    product_id: 50,
    product_name: "Stage 5",
  },
  {
    product_id: 51,
    product_name: "Stage 6",
  },
  {
    product_id: 52,
    product_name: "Stage 7",
  },
  {
    product_id: 53,
    product_name: "Stage 8",
  },
  {
    product_id: 54,
    product_name: "Stage 9",
  },
  {
    product_id: 44,
    product_name: "Stage 2(入口)",
  },
  {
    product_id: 312,
    product_name: "Stage 1-129",
  },
  {
    product_id: 313,
    product_name: "Stage 2-129",
  },
  {
    product_id: 314,
    product_name: "Stage 4-129",
  },
  {
    product_id: 315,
    product_name: "Stage 3-129",
  },
  {
    product_id: 324,
    product_name: "Stage 5-129",
  },
  {
    product_id: 344,
    product_name: "Stage 1-129-HF",
  },
  {
    product_id: 345,
    product_name: "Stage 2-129-HF",
  },
  {
    product_id: 346,
    product_name: "Stage 3-129-HF",
  },
  {
    product_id: 347,
    product_name: "Stage 4-129-HF",
  },
  {
    product_id: 348,
    product_name: "Stage 5-129-HF",
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
