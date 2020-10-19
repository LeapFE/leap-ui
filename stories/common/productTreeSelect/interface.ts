export type ProductTree = {
  id: number;
  name: string;
  category_status_id?: number;
  pid?: number;
  product_id?: number;
  product_category_id?: number;
  version_name?: string;
  child?: ProductTree[];
};

export type ProductListItemBySelected = {
  product_id: number;
  product_name: string;
};

interface Datum {
  id: number;
  name: string;
  category_status_id: number;
  pid: number;
  child: Child4[];
}

interface Child4 {
  id: number;
  name: string;
  category_status_id: number;
  pid: number;
  child: Child3[];
}

interface Child3 {
  id: number;
  name: string;
  category_status_id: number;
  pid: number;
  child: Child2[];
}

interface Child2 {
  id: number;
  name: string;
  category_status_id?: number;
  pid?: number;
  child?: Child[];
  product_id?: number;
  product_category_id?: number;
  version_name?: string;
}

interface Child {
  id: number;
  name: string;
  product_id: number;
  product_category_id: number;
  version_name: string;
}

// eslint-disable-next-line @typescript-eslint/class-name-casing
export interface getBackendResourceProduct_listData {
  code: number;
  message: string;
  data: Datum[];
  trace_id: string;
  ts: number;
}
