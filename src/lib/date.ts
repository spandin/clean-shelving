import { addMonths, getTime, toDate } from "date-fns";

export const timestampToString = (timestamp: number): string => {
  return toDate(timestamp).toLocaleDateString("ru-Ru");
};

export const stringToUTC = (dateStr: string): number => {
  const pattern = /(\d{2})\.(\d{2})\.(\d{4})/;
  return getTime(new Date(dateStr?.replace(pattern, "$3-$2-$1")));
};

export const calcEndDate = (mfd: string, exp: number): Date => {
  return addMonths(new Date(mfd), exp);
};
