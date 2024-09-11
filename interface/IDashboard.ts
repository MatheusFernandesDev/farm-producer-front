export interface IDashboard {
  totalFarms: number;
  totalHectares: number;
  farmsByState: { state: string; count: number }[];
  cropCounts: { [key: string]: number };
  landUsage: { cultivated: number; vegetation: number };
}
