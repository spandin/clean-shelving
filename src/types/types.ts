import { Timestamp } from "firebase/firestore";

export interface ProductType {
  id: string;
  name: string;
  code: string;
  category: string;
  quantity: string;
  dates: {
    createdAt: Timestamp;
    mfd: Timestamp;
    exp: Timestamp;
  };
  actions: {
    created: { createdAt: Timestamp; whoCreated: string; whoCreatedID: string };
    updated: {
      updatedAt: Timestamp;
      whoUpdated: string;
      whoUpdatedID: string;
    };
    exported: {
      exportedOn: Timestamp;
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
