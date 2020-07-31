export function addDays(date: Date, days: number): Date {
  const newDate = new Date();
  newDate.setDate(date.getDate() + days);

  return newDate;
}
