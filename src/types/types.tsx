export interface Holiday {
  country: string,
  date: string,
  day: string,
  iso: string,
  name: string,
  type: string,
  year: number,
}

export interface Observance {
  date: Date,
  holidayName: string,
}