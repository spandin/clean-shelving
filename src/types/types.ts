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

export interface BarcodeType {
  name: string;
  code: number;
  category: string;
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
