export interface ProductType {
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
      whoCreatedID?: string;
    };
    updated: {
      updatedAt: string;
      whoUpdated: string;
      whoUpdatedID?: string;
    };
    exported: {
      exportedOn: string;
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
  quantity: number;
  dates: {
    mfd: string;
    exp: string;
  };
}
