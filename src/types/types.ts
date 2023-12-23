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
      whoCreatedID?: string;
    };
    updated: {
      updatedAt: number;
      whoUpdated: string;
      whoUpdatedID?: string;
    };
    exported: {
      exportedOn: number;
      isExported: boolean;
      whoExported: string;
      whoExportedID?: string;
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

// Redux Data Types -
export interface DataState {
  products: ProductType[];
  barcodes: BarcodeType[];
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
