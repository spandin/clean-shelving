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
  actions: [
    {
      createdAt: Timestamp;
      whoCreated: string;
      whoCreatedID: string;
    },
    {
      updatedAt: Timestamp;
      whoUpdated: string;
      whoUpdatedID: string;
    },
    {
      exportedOn: Timestamp;
      isExported: boolean;
      whoExported: string;
      whoExportedID: string;
    }
  ];
}
