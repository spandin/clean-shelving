export const timestampToString = (timestamp: number): string => {
  const date: Date = new Date(timestamp * 1000);
  return date.toLocaleDateString("ru-Ru");
};

export const stringToTimestamp = (strDate: string): number => {
  const date = Date.parse(strDate);
  return date / 1000;
};
