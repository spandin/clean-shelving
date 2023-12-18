import { Timestamp } from "firebase/firestore";

export const convetTimestampToString = (timestamp: Timestamp): string => {
  const date: Date = new Date(timestamp.seconds * 1000);
  return date.toLocaleDateString("ru-Ru");
};
