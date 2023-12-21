import { addMonths, getTime, intlFormatDistance, toDate } from "date-fns";

export const timestampToString = (timestamp: number): string => {
  return toDate(timestamp).toLocaleDateString("ru-Ru");
};

export const stringToTimestamp = (dateStr: string): number => {
  const pattern = /(\d{2})\.(\d{2})\.(\d{4})/;

  return getTime(new Date(dateStr?.replace(pattern, "$3-$2-$1")));
};

export const stringToUTC = (dateStr: string): Date => {
  const pattern = /(\d{2})\.(\d{2})\.(\d{4})/;

  return new Date(dateStr?.replace(pattern, "$3-$2-$1"));
};

export const calcDistanceEndFromExp = (exp: string): string => {
  return intlFormatDistance(stringToUTC(exp), new Date());
};

export const calcDistanceEndFromMonth = (
  mfd: string,
  month: string
): string => {
  return intlFormatDistance(
    addMonths(stringToUTC(mfd), parseInt(month)),
    new Date()
  );
};
