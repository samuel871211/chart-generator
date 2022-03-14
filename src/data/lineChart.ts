interface sixTargetSchema {
  title: string;
  subTitle: string;
  xAxisLabel: string;
  yAxisLabel: string;
  // xAxisScales:
  //   | [number, number]
  //   | [number, number, number]
  //   | [number, number, number, number]
  //   | [number, number, number, number, number];
  xAxisScales: Array<number | string>;
  yAxisScales: number[];
  台北: number[];
  新北: number[];
  桃園: number[];
  台中: number[];
  台南: number[];
  高雄: number[];
  // 台北、新北、桃園、台中、台南、高雄、xAxisScales的陣列長度要相同，不然UI會出錯
}

interface StrengthAndWeaknessSchema extends sixTargetSchema {
  targetPoints: { country: string; index: number }[];
}

// 六大指標(sixTarget)
interface 經濟民生schema {
  薪資勞動: sixTargetSchema[];
  房價居住: sixTargetSchema[];
  經濟發展: sixTargetSchema[];
  縣市舉債: sixTargetSchema[];
  人口生育: sixTargetSchema[];
}
interface 環境品質schema {
  空氣: sixTargetSchema[];
  垃圾處理: sixTargetSchema[];
  綠地水質: sixTargetSchema[];
}
interface 教育文化schema {
  教育程度: sixTargetSchema[];
  藝文機會: sixTargetSchema[];
}
interface 公共安全schema {
  治安: sixTargetSchema[];
  交通安全: sixTargetSchema[];
  消防安全: sixTargetSchema[];
}
interface 醫療健康schema {
  民眾健康: sixTargetSchema[];
  醫療資源: sixTargetSchema[];
}
interface 社福長照schema {
  弱勢照顧: sixTargetSchema[];
  高齡長照: sixTargetSchema[];
}

// 優勢、劣勢(strengthAndWeakness)
interface 台北schema {
  strength: StrengthAndWeaknessSchema[];
  weakness: StrengthAndWeaknessSchema[];
}
interface 新北schema {
  strength: StrengthAndWeaknessSchema[];
  weakness: StrengthAndWeaknessSchema[];
}
interface 桃園schema {
  strength: StrengthAndWeaknessSchema[];
  weakness: StrengthAndWeaknessSchema[];
}
interface 台中schema {
  strength: StrengthAndWeaknessSchema[];
  weakness: StrengthAndWeaknessSchema[];
}
interface 台南schema {
  strength: StrengthAndWeaknessSchema[];
  weakness: StrengthAndWeaknessSchema[];
}
interface 高雄schema {
  strength: StrengthAndWeaknessSchema[];
  weakness: StrengthAndWeaknessSchema[];
}

export const 經濟民生: 經濟民生schema = {
  薪資勞動: [
    {
      title: "平均每人每年可支配所得",
      subTitle: "",
      xAxisLabel: "年",
      yAxisLabel: "元",
      xAxisScales: [2012, 2014, 2016, 2018, 2020],
      yAxisScales: [0, 100000, 200000, 300000, 400000, 500000],
      台北: [
        381561, 398217, 408688, 412973, 426633, 440278, 436538, 436489, 458839,
        472710,
      ],
      新北: [
        279239, 278023, 284783, 291591, 305575, 326152, 337605, 350606, 371156,
        396813,
      ],
      桃園: [
        273295, 287727, 288668, 314701, 311248, 325471, 327133, 346623, 357432,
        363913,
      ],
      台中: [
        265316, 271157, 282352, 303365, 311948, 322806, 337637, 343713, 352633,
        362089,
      ],
      台南: [
        245524, 242163, 261153, 266012, 269302, 286254, 293031, 293762, 305444,
        320617,
      ],
      高雄: [
        270996, 283843, 295244, 300872, 319905, 304104, 321015, 328911, 331657,
        350964,
      ],
    },
    {
      title: "CHART-2",
      subTitle: "",
      xAxisLabel: "年",
      yAxisLabel: "元",
      xAxisScales: [2012, 2014, 2016, 2018, 2020],
      yAxisScales: [0, 100000, 200000, 300000, 400000, 500000],
      台北: [
        381561, 398217, 408688, 412973, 426633, 440278, 436538, 436489, 458839,
        472710,
      ],
      新北: [
        279239, 278023, 284783, 291591, 305575, 326152, 337605, 350606, 371156,
        396813,
      ],
      桃園: [
        273295, 287727, 288668, 314701, 311248, 325471, 327133, 346623, 357432,
        363913,
      ],
      台中: [
        265316, 271157, 282352, 303365, 311948, 322806, 337637, 343713, 352633,
        362089,
      ],
      台南: [
        245524, 242163, 261153, 266012, 269302, 286254, 293031, 293762, 305444,
        320617,
      ],
      高雄: [
        270996, 283843, 295244, 300872, 319905, 304104, 321015, 328911, 331657,
        350964,
      ],
    },
  ],
  房價居住: [
    {
      title: "房價居住",
      subTitle: "",
      xAxisLabel: "年",
      yAxisLabel: "元",
      xAxisScales: [2012, 2014, 2016, 2018, 2020],
      yAxisScales: [0, 100000, 200000, 300000, 400000, 500000],
      台北: [
        381561, 398217, 408688, 412973, 426633, 440278, 436538, 436489, 458839,
        472710,
      ],
      新北: [
        279239, 278023, 284783, 291591, 305575, 326152, 337605, 350606, 371156,
        396813,
      ],
      桃園: [
        273295, 287727, 288668, 314701, 311248, 325471, 327133, 346623, 357432,
        363913,
      ],
      台中: [
        265316, 271157, 282352, 303365, 311948, 322806, 337637, 343713, 352633,
        362089,
      ],
      台南: [
        245524, 242163, 261153, 266012, 269302, 286254, 293031, 293762, 305444,
        320617,
      ],
      高雄: [
        270996, 283843, 295244, 300872, 319905, 304104, 321015, 328911, 331657,
        350964,
      ],
    },
  ],
  經濟發展: [
    {
      title: "經濟發展",
      subTitle: "",
      xAxisLabel: "年",
      yAxisLabel: "元",
      xAxisScales: [2012, 2014, 2016, 2018, 2020],
      yAxisScales: [0, 100000, 200000, 300000, 400000, 500000],
      台北: [
        381561, 398217, 408688, 412973, 426633, 440278, 436538, 436489, 458839,
        472710,
      ],
      新北: [
        279239, 278023, 284783, 291591, 305575, 326152, 337605, 350606, 371156,
        396813,
      ],
      桃園: [
        273295, 287727, 288668, 314701, 311248, 325471, 327133, 346623, 357432,
        363913,
      ],
      台中: [
        265316, 271157, 282352, 303365, 311948, 322806, 337637, 343713, 352633,
        362089,
      ],
      台南: [
        245524, 242163, 261153, 266012, 269302, 286254, 293031, 293762, 305444,
        320617,
      ],
      高雄: [
        270996, 283843, 295244, 300872, 319905, 304104, 321015, 328911, 331657,
        350964,
      ],
    },
  ],
  縣市舉債: [
    {
      title: "縣市舉債",
      subTitle: "",
      xAxisLabel: "年",
      yAxisLabel: "元",
      xAxisScales: [2012, 2014, 2016, 2018, 2020],
      yAxisScales: [0, 100000, 200000, 300000, 400000, 500000],
      台北: [
        381561, 398217, 408688, 412973, 426633, 440278, 436538, 436489, 458839,
        472710,
      ],
      新北: [
        279239, 278023, 284783, 291591, 305575, 326152, 337605, 350606, 371156,
        396813,
      ],
      桃園: [
        273295, 287727, 288668, 314701, 311248, 325471, 327133, 346623, 357432,
        363913,
      ],
      台中: [
        265316, 271157, 282352, 303365, 311948, 322806, 337637, 343713, 352633,
        362089,
      ],
      台南: [
        245524, 242163, 261153, 266012, 269302, 286254, 293031, 293762, 305444,
        320617,
      ],
      高雄: [
        270996, 283843, 295244, 300872, 319905, 304104, 321015, 328911, 331657,
        350964,
      ],
    },
  ],
  人口生育: [
    {
      title: "人口生育",
      subTitle: "",
      xAxisLabel: "年",
      yAxisLabel: "元",
      xAxisScales: [2012, 2014, 2016, 2018, 2020],
      yAxisScales: [0, 100000, 200000, 300000, 400000, 500000],
      台北: [
        381561, 398217, 408688, 412973, 426633, 440278, 436538, 436489, 458839,
        472710,
      ],
      新北: [
        279239, 278023, 284783, 291591, 305575, 326152, 337605, 350606, 371156,
        396813,
      ],
      桃園: [
        273295, 287727, 288668, 314701, 311248, 325471, 327133, 346623, 357432,
        363913,
      ],
      台中: [
        265316, 271157, 282352, 303365, 311948, 322806, 337637, 343713, 352633,
        362089,
      ],
      台南: [
        245524, 242163, 261153, 266012, 269302, 286254, 293031, 293762, 305444,
        320617,
      ],
      高雄: [
        270996, 283843, 295244, 300872, 319905, 304104, 321015, 328911, 331657,
        350964,
      ],
    },
  ],
};
export const 環境品質: 環境品質schema = {
  空氣: [],
  垃圾處理: [],
  綠地水質: [],
};
export const 教育文化: 教育文化schema = {
  教育程度: [],
  藝文機會: [],
};
export const 公共安全: 公共安全schema = {
  治安: [],
  交通安全: [],
  消防安全: [],
};
export const 醫療健康: 醫療健康schema = {
  民眾健康: [],
  醫療資源: [],
};
export const 社福長照: 社福長照schema = {
  弱勢照顧: [],
  高齡長照: [],
};

export const 數據指標 = {
  經濟民生,
  環境品質,
  教育文化,
  公共安全,
  醫療健康,
  社福長照,
};

export const 台北: 台北schema = {
  strength: [
    {
      title: "空氣不良日數比率 台北僅高雄的1/6",
      subTitle: "AQI>100之日數比率",
      xAxisLabel: "年",
      yAxisLabel: "%",
      xAxisScales: [2017, 2018, 2019, 2020],
      yAxisScales: [0, 10, 20, 30, 40],
      targetPoints: [
        { country: "台北", index: 1 },
        { country: "新北", index: 3 },
      ],
      台北: [5.45, 4.11, 3.52, 3.28],
      新北: [9.07, 7.09, 4.39, 4.98],
      桃園: [9.75, 9.4, 5.72, 5.4],
      台中: [17, 15.95, 11.84, 8.58],
      台南: [28.4, 23.63, 23.14, 15.64],
      高雄: [35.68, 32.07, 25.5, 20.8],
    },
  ],
  weakness: [
    {
      title: "空氣不良日數比率 台北僅高雄的1/6",
      subTitle: "AQI>100之日數比率",
      xAxisLabel: "年",
      yAxisLabel: "%",
      xAxisScales: [2017, 2018, 2019, 2020],
      yAxisScales: [0, 10, 20, 30, 40],
      targetPoints: [
        { country: "台北", index: 1 },
        { country: "新北", index: 3 },
      ],
      台北: [5.45, 4.11, 3.52, 3.28],
      新北: [9.07, 7.09, 4.39, 4.98],
      桃園: [9.75, 9.4, 5.72, 5.4],
      台中: [17, 15.95, 11.84, 8.58],
      台南: [28.4, 23.63, 23.14, 15.64],
      高雄: [35.68, 32.07, 25.5, 20.8],
    },
  ],
};
export const 新北: 新北schema = {
  strength: [],
  weakness: [],
};
export const 桃園: 桃園schema = {
  strength: [],
  weakness: [],
};
export const 台中: 台中schema = {
  strength: [],
  weakness: [],
};
export const 台南: 台南schema = {
  strength: [],
  weakness: [],
};
export const 高雄: 高雄schema = {
  strength: [],
  weakness: [],
};
export const lineChartDefaultData: sixTargetSchema = {
  title: "line chart title",
  subTitle: "line chart subtitle",
  xAxisLabel: "年",
  yAxisLabel: "%",
  xAxisScales: [2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020],
  yAxisScales: [10, 20, 30, 40],
  台北: [16.47, 14.31, 12.91, 13.88, 10.1, 18.07, 16.1, 24.86, 13.65, 12.67],
  新北: [21.53, 21.13, 10.46, 18.56, 16.8, 25.81, 13.92, 23.38, 12.6, 22.34],
  桃園: [15.59, 10.54, 18.39, 15.75, 15.19, 15.31, 13.51, 12.63, 12.24, 22.26],
  台中: [12.87, 11.81, 17.43, 25.75, 25.6, 25.33, 33.64, 12.65, 12.1, 11.28],
  台南: [19.62, 17.51, 14.29, 16.67, 13.63, 18.48, 25.2, 14.93, 14.2, 14.26],
  高雄: [29.99, 14.73, 19.93, 18.17, 11.95, 23.51, 16.59, 23.82, 23.17, 22.74],
};
