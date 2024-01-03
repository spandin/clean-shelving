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

// Redux Data Types -
export interface DataState {
  products: ProductType[];
  barcodes: BarcodeType[];
  activity: ActivityState;
  filter: {
    category: string;
    exported: boolean | string;
  };
}

export interface BarcodeType {
  name: string;
  code: number;
  category: string;
}

export interface ActivityState {
  my: MyActivity[];
  all: AllActivity[];
}

export interface MyActivity {
  date: number;
  description: string;
}

export interface AllActivity {
  id: string;
  actioner: {
    name: string;
    email: string | null;
    id: string | null;
  };
  description: string;
  madeOn: number;
}

// Redux User Types -
export interface UserData {
  id: string | null;
  name: string;
  email: string | null;
  actions: {
    added: number;
    updated: number;
    deleted: number;
  };
  activity: {
    date: number;
    description: string;
  }[];
  isAuth: boolean;
}
