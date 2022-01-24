export const getUNIXTimestamp = (date: Date): number => {
  return Math.floor(date.getTime() / 1000);
};

export const getDateFromUNIX = (unix: number): string => {
  return new Date(unix * 1000).toLocaleDateString('en-US');
};
