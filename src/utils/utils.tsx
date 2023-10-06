export const getSundayDatesInYear = (year: number) => {
  const sundays = [];
  const date = new Date(year, 0, 1);

  while (date.getDay() !== 0) {
    date.setDate(date.getDate() + 1);
  }

  while (date.getFullYear() === year) {
    sundays.push(new Date(date));
    date.setDate(date.getDate() + 7);
  }

  const formattedSundays = sundays.map((sunday) => {
    const year = sunday.getFullYear();
    const month = String(sunday.getMonth() + 1).padStart(2, '0');
    const day = String(sunday.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  });

  return formattedSundays;
};

export const convertToDateObject = (dateString: string) => {
  const [year, month, day] = dateString.split('-').map(Number);
  return new Date(year, month - 1, day);
};

export const calculatePercentage = (currentValue: number, minRange: number, maxRange: number) => {
  const percentage = ((currentValue - minRange) / (maxRange - minRange)) * 100;
  return Number(percentage.toFixed(5))
}