export interface CRUD {
  filter: (startDate: Date, endDate: Date, minCount: number, maxCount: number) => Promise<any>;
}