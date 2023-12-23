export interface ProductType {
  id: string;
  name: string;
  code: number;
  category: string;
  quantity: number;
  dates: {
    createdAt: number;
    mfd: number;
    exp: number;
  };
  actions: {
    created: {
      createdAt: number;
      whoCreated: string;
      whoCreatedID: string;
    };
    updated: {
      updatedAt: number;
      isUpdated: boolean;
      whoUpdated: string;
      whoUpdatedID: string;
    };
    exported: {
      exportedOn: number;
      isExported: boolean;
      whoExported: string;
      whoExportedID: string;
    };
  };
}

export interface AddFormInputsType {
  code: string;
  name: string;
  category: string;
  quantity: string;
  dates: {
    mfd: string;
    exp: string;
  };
}

export interface UpdateFormInputsType {
  code: string;
  name: string;
  category: string;
  quantity: string;
  dates: {
    mfd: string;
    exp: string;
  };
}

// Redux Data Types -
export interface DataState {
  products: ProductsType[];
  barcodes: BarcodeType[];
}

export interface ProductsType {
  id: string;
  name: string;
  code: string;
  category: string;
  quantity: string;
  dates: {
    createdAt: string;
    mfd: string;
    exp: string;
  };
  actions: {
    created: {
      createdAt: string;
      whoCreated: string;
      whoCreatedID: string;
    };
    updated: {
      updatedAt: string;
      isUpdated: boolean;
      whoUpdated: string;
      whoUpdatedID: string;
    };
    exported: {
      exportedOn: string;
      isExported: boolean;
      whoExported: string;
      whoExportedID: string;
    };
  };
}

export interface BarcodeType {
  name: string;
  code: number;
  category: string;
}

//Redux Activity Types -
export interface ActivityState {
  my: MyActivity[];
  all: AllActivity[];
}

interface MyActivity {
  date: number;
  description: string;
}

interface AllActivity {
  actioner: {
    name: string;
    email: string;
    id: string;
  };
  description: string;
  madeOn: number;
}
