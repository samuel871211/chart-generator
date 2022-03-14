export const PUREHTML = `
<html>
  <head>

  </head>
  <body>
    <div class="chart-line-container">
      <div class="chart-line-title">{title}</div>
      <div class="chart-line-legendList">
        <!-- 動態生成 -->
        <div class="chart-line-legend">
          <div class="chart-line-circle chart-line-bgColor1"></div>
          <div>{線段}</div>
        </div>
        <div class="chart-line-legend">
          <div class="chart-line-circle chart-line-bgColor2"></div>
          <div>{線段}</div>
        </div>
        <div class="chart-line-legend">
          <div class="chart-line-circle chart-line-bgColor3"></div>
          <div>{線段}</div>
        </div>
        <div class="chart-line-legend">
          <div class="chart-line-circle chart-line-bgColor4"></div>
          <div>{線段}</div>
        </div>
        <div class="chart-line-legend">
          <div class="chart-line-circle chart-line-bgColor5"></div>
          <div>{線段}</div>
        </div>
        <div class="chart-line-legend">
          <div class="chart-line-circle chart-line-bgColor6"></div>
          <div>{線段}</div>
        </div>
      </div>
      <div class="chart-line-subTitle">
        <div class="chart-line-yAxisLabel">{yAxisLabel}</div>
        {subTitle}
      </div>
      <div class="chart-line-chartBlock">
        <div class="chart-line-yAxisScales">
          <!-- 動態生成 -->
          <div class="chart-line-yAxisScale">{yAxisScales}</div>
          <div class="chart-line-yAxisScale">{yAxisScales}</div>
          <div class="chart-line-yAxisScale">{yAxisScales}</div>
          <div class="chart-line-yAxisScale">{yAxisScales}</div>
        </div>
        <div class="chart-line-hrs">
          <!-- 動態生成 -->
          <!-- require v-show -->
          <div class="chart-line-hr">
              <div></div>
          </div>
          <div class="chart-line-hr">
              <div></div>
          </div>
          <div class="chart-line-hr">
              <div></div>
          </div>
          <div class="chart-line-hr">
              <div></div>
          </div>
        </div>
        <svg class="chart-line-svg">
          <!-- 動態生成 -->
          <g transform="scale(0.8888888888888888, 0.9327217125382263)">
              <path fill="none" d="M 0 147.477 L 61.111111111111114 171.02100000000002 L 122.22222222222223 186.281 L 183.33333333333334 175.70799999999997 L 244.44444444444446 216.90999999999997 L 305.55555555555554 239.03699999999998 L 366.6666666666667 260.51 L 427.7777777777778 274.026 L 488.8888888888889 287.21500000000003 L 550 297.897" stroke="#32c5bc" stroke-width="2"></path>
              <path fill="none" d="M 0 92.323 L 61.111111111111114 96.683 L 122.22222222222223 212.986 L 183.33333333333334 233.69599999999997 L 244.44444444444446 252.88 L 305.55555555555554 263.671 L 366.6666666666667 284.272 L 427.7777777777778 290.158 L 488.8888888888889 298.65999999999997 L 550 301.49399999999997" stroke="#20619d" stroke-width="2"></path>
              <path fill="none" d="M 0 157.069 L 61.111111111111114 212.114 L 122.22222222222223 235.549 L 183.33333333333334 264.325 L 244.44444444444446 270.429 L 305.55555555555554 269.121 L 366.6666666666667 288.74100000000004 L 427.7777777777778 298.33299999999997 L 488.8888888888889 302.58399999999995 L 550 302.36600000000004" stroke="#ff6265" stroke-width="2"></path>
              <path fill="none" d="M 0 186.71700000000004 L 61.111111111111114 198.271 L 122.22222222222223 246.013 L 183.33333333333334 264.325 L 244.44444444444446 265.96 L 305.55555555555554 268.903 L 366.6666666666667 287.32399999999996 L 427.7777777777778 298.115 L 488.8888888888889 304.10999999999996 L 550 313.048" stroke="#ffa800" stroke-width="2"></path>
              <path fill="none" d="M 0 113.142 L 61.111111111111114 136.141 L 122.22222222222223 171.239 L 183.33333333333334 145.297 L 244.44444444444446 178.43299999999996 L 305.55555555555554 234.568 L 366.6666666666667 270.32 L 427.7777777777778 273.263 L 488.8888888888889 281.22 L 550 280.56600000000003" stroke="#c6ad8f" stroke-width="2"></path>
              <path fill="none" d="M 0 0.10900000000001704 L 61.111111111111114 166.443 L 122.22222222222223 218.763 L 183.33333333333334 237.947 L 244.44444444444446 251.245 L 305.55555555555554 256.041 L 366.6666666666667 255.16899999999998 L 427.7777777777778 285.362 L 488.8888888888889 292.447 L 550 297.13399999999996" stroke="#ba79d7" stroke-width="2"></path>
          </g>
        </svg>
        <!-- require v-show -->
        <div class="chart-line-toolTipMask">
          <div class="chart-line-vLine" style="transform: translateX(480px); display: none;">
              <div class="chart-line-toolTipContainer" style="margin-left: -142px;">
                <div class="chart-line-toolTip">
                    <!-- 動態生成 -->
                    <div></div>
                    <div class="chart-line-legend">
                      <div class="chart-line-circle chart-line-bgColor1"></div>
                      <div class="chart-line-legendText"> 台北 10.1</div>
                    </div>
                    <div class="chart-line-legend">
                      <div class="chart-line-circle chart-line-bgColor2"></div>
                      <div class="chart-line-legendText"> 新北 6.8</div>
                    </div>
                    <div class="chart-line-legend">
                      <div class="chart-line-circle chart-line-bgColor3"></div>
                      <div class="chart-line-legendText"> 桃園 5.19</div>
                    </div>
                    <div class="chart-line-legend">
                      <div class="chart-line-circle chart-line-bgColor4"></div>
                      <div class="chart-line-legendText"> 台中 5.6</div>
                    </div>
                    <div class="chart-line-legend">
                      <div class="chart-line-circle chart-line-bgColor5"></div>
                      <div class="chart-line-legendText"> 台南 13.63</div>
                    </div>
                    <div class="chart-line-legend">
                      <div class="chart-line-circle chart-line-bgColor6"></div>
                      <div class="chart-line-legendText"> 高雄 6.95</div>
                    </div>
                </div>
              </div>
          </div>
        </div>
      </div>
      <div class="chart-line-xAxisScales">
        <!-- 動態生成 -->
        <div class="chart-line-xAxisScale">
          <span>{xAxisScales}</span>
          <span>{xAxisLabel}</span>
        </div>
        <div class="chart-line-xAxisScale">
          <span>{xAxisScales}</span>
        </div>
        <div class="chart-line-xAxisScale">
          <span>{xAxisScales}</span>
        </div>
        <div class="chart-line-xAxisScale">
          <span>{xAxisScales}</span>
        </div>
        <div class="chart-line-xAxisScale">
          <span>{xAxisScales}</span>
        </div>
      </div>
   </div>
  </body>
  <style>
    .chart-line-container {
      font-family: Noto Sans TC;
      font-style: normal;
      position: relative;
      background-color: white;
      margin: 0 auto;
      width: 100%;
      height: 440px;
      display: flex;
      flex-direction: column;
      overflow: hidden;
      margin-top: 300vh;
    }
    @media screen and (min-width: 768px) {
      .chart-line-container {
        height: 420px;
      }
    }
    .chart-line-title {
      color: #404040;
      font-weight: bold;
      font-size: 20px;
      line-height: 30px;
      text-align: center;
      padding-top: 10px;
      margin-bottom: 5px;
    }
    @media screen and (min-width: 768px) {
      .chart-line-title {
        font-size: 24px;
        line-height: 34px;
        padding-top: 6px;
      }
    }
    .chart-line-subTitle {
      color: #404040;
      font-weight: bold;
      font-size: 15px;
      line-height: 22px;
      min-height: 22px;
      text-align: center;
      width: 100%;
      position: relative;
    }
    @media screen and (min-width: 768px) {
      .chart-line-subTitle {
        font-size: 16px;
        line-height: 24px;
        min-height: 24px;
      }
    }
    .chart-line-yAxisLabel {
      position: absolute;
      width: 10%;
      text-align: right;
    }
    .chart-line-legendList {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      width: 90%;
      margin: 0 auto;
    }
    @media screen and (min-width: 768px) {
      .chart-line-legendList {
        width: 100%;
      }
    }
    .chart-line-circle {
      width: 16px;
      height: 16px;
      margin-right: 0.25rem;
      border-radius: 50%;
    }
    .chart-line-legend {
      display: flex;
      align-items: center;
      font-weight: normal;
      font-size: 15px;
      line-height: 22px;
      color: #404040;
      margin-right: 10px;
    }
    @media screen and (min-width: 768px) {
      .chart-line-legend {
        font-size: 16px;
        line-height: 24px;
      }
    }
    .chart-line-chartBlock {
      display: flex;
      flex-grow: 1;
      position: relative;
    }
    .chart-line-hrs {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 15%;
      right: 5%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      z-index: 0;
      animation: MoveZIndexToTopWhenSlideRight 1s;
    }
    @keyframes MoveZIndexToTopWhenSlideRight {
      0% {
        z-index: 3;
      }
      100% {
        z-index: 3;
      }
    }
    .chart-line-hr {
      width: 100%;
      height: 22px;
    }
    @media screen and (min-width: 768px) {
      .chart-line-hr {
        height: 24px;
      }
    }
    .chart-line-hr > div {
      width: 100%;
      height: calc(50% - 1px);
      border-bottom: 1px dashed #404040;
    }
    .chart-line-hr:last-child > div {
      border-bottom: 1px solid #404040;
    }
    .chart-line-yAxisScales {
      width: 10%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      z-index: 3;
    }
    .chart-line-yAxisScale, .chart-line-xAxisScale {
      text-align: right;
      font-weight: normal;
      font-size: 15px;
      line-height: 22px;
      color: #404040;
    }
    @media screen and (min-width: 768px) {
      .chart-line-yAxisScale, .chart-line-xAxisScale {
        font-size: 16px;
        line-height: 24px;
      }
    }
    .chart-line-xAxisScale > span:nth-child(2) {
      position: absolute;
    }
    .chart-line-xAxisScales {
      display: flex;
      margin-left: calc(15% - 15px);
      width: calc(80% + 30px);
      justify-content: space-between;
    }
    @media screen and (min-width: 768px) {
      .chart-line-xAxisScales {
        margin-left: calc(15% - 16px);
        width: calc(80% + 32px);
      }
    }
    .chart-line-svg {
      width: 90%;
      height: 100%;
      z-index: 1;
    }
    .chart-line-svg > g {
      transform-origin: center;
    }
    .chart-line-svg > g > text {
      fill: #404040;
    }
    @media screen and (min-width: 768px) {
      .chart-line-svg > g > text {
        font-size: 18px;
      }
    }
    .chart-line-toolTipMask {
      position: absolute;
      z-index: 2;
      top: 11px;
      bottom: 11px;
      left: 15%;
      right: 5%;
      background-color: transparent;
      display: flex;
      align-items: center;
      animation: slideRight 1s;
    }
    @keyframes slideRight {
      0% {
        transform: none;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background-color: white;
      }
      100% {
        transform: translateX(100%);
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background-color: white;
      }
    }
    .chart-line-vLine {
      width: 0;
      height: 100%;
      border-right: 1px solid #404040;
      pointer-events: none;
    }
    .chart-line-toolTipContainer {
      width: 130px;
      height: 100%;
      display: flex;
      align-items: center;
    }
    .chart-line-toolTip {
      width: 100%;
      height: 80%;
      max-height: 216px;
      box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.25);
      background-color: white;
      display: flex;
      flex-direction: column;
      justify-content: space-evenly;
      align-items: center;
    }
    .chart-line-toolTip .legend {
      margin: 0;
      width: 90%;
    }
    .chart-line-legendText {
      flex-grow: 1;
    }
    .chart-line-alignLeft {
      transform: translateX(-100px);
    }
    .chart-line-bgColor1 {
      background-color: #32c5bc;
    }
    .chart-line-bgColor2 {
      background-color: #20619d;
    }
    .chart-line-bgColor3 {
      background-color: #ff6265;
    }
    .chart-line-bgColor4 {
      background-color: #ffa800;
    }
    .chart-line-bgColor5 {
      background-color: #c6ad8f;
    }
    .chart-line-bgColor6 {
      background-color: #ba79d7;
    }
  </style>
  <script>
    (function registerGlobalEvt () {
      const options = {
        rootMargin: '0px',
        threshold: 0.5
      }
      const observer = new IntersectionObserver(lineChartAnimation, options)
      const HTMLElement = document.querySelector('.chart-line-container')
      observer.observe(HTMLElement)
      function lineChartAnimation () {
        console.log('hello')
      }
    })()
  </script>
</html>
`