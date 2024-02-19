export interface Profile {
  name: string;
  email: string;
  isAuth: boolean;
}

interface Product {
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

interface Barcode {
  name: string;
  code: number;
  category: string;
}

interface Activity {
  id: string;
  actioner: {
    name: string;
    email: string | null;
    id: string | null;
  };
  description: string;
  madeOn: number;
}

export interface Schema {
  products: Product;
  barcodes: Barcode;
  activity: Activity;
}
