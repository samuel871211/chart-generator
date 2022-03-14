import type { pollSchema } from "./poll";

export interface barChartSchema extends pollSchema {
  yAxisLabel: string;
  yAxisScales: number[];
}

export const barChartDefaultData: barChartSchema = {
  台中: [15, 17.04],
  新北: [9.69, 11.31],
  桃園: [14.1, 15.3],
  台南: [14.46, 17.89],
  高雄: [15.09, 16.49],
  台北: [9.53, 10.54],
  title: "grouped bar chart title",
  subTitle: "grouped bar chart subtitle",
  yAxisLabel: "坪",
  yAxisScales: [0, 5, 10, 15, 20],
};
