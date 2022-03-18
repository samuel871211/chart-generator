<script setup lang="ts">
import { reactive, ref, watch, onMounted } from 'vue'
import { useIntersectionObserver, useWindowSize } from '@vueuse/core'
// CONSTANT
type Countrys = '台北' | '新北' | '桃園' | '台中' | '台南' | '高雄'
const BGCOLORS: { [key in Countrys]: string } = {
  台北: '#32c5bc',
  新北: '#20619d',
  桃園: '#ff6265',
  台中: '#ffa800',
  台南: '#c6ad8f',
  高雄: '#ba79d7',
}
const COUNTRYS: Countrys[] = ['台北', '新北', '桃園', '台中', '台南', '高雄']
// props
const props = defineProps<{
  size: 'small' | 'normal',
  currentPage?: Countrys,
  data: {
    title: string,
    subTitle: string,
    xAxisLabel: string,
    yAxisLabel: string,
    xAxisScales: Array<number | string>,
    yAxisScales: number[],
    targetPoints?: { country: Countrys; index: number }[],
    台北: number[],
    新北: number[],
    桃園: number[],
    台中: number[],
    台南: number[],
    高雄: number[]
  }
}>()
/**
 *handle toolTip open, position and displayContent
 *@method open 滑鼠移入圖表的callback
 *@method move 滑鼠移動圖表的callback
 *@method close 滑鼠移出圖表的callback
 */
class ToolTip {
  public isOpen = ref(false)
  public xAxisScaleIndex = ref(0)
  public left = ref(0)
  public margin = ref(12)
  public maskEl = ref<HTMLDivElement>()

  open(e: MouseEvent): void {
    const width = this.maskEl.value?.clientWidth || 0
    const relativeWidth = (e.offsetX / width) * 100
    const division = 100 / props.data.台北.length
    this.isOpen.value = true
    this.left.value = e.offsetX
    this.xAxisScaleIndex.value = Math.floor(relativeWidth / division)
    this.margin.value = this.#calcMarginAdjust()
  }

  move(e: MouseEvent): void {
    if (Math.abs(e.offsetX) <= 1) return
    this.open(e)
  }

  close(e: MouseEvent): void {
    this.isOpen.value = false
  }

  #calcMarginAdjust(): number {
    const width = this.maskEl.value?.clientWidth || 0
    const remainWidth = width - this.left.value
    if (remainWidth > 142) return 12
    else return -142
  }
}
/**
 *handle SVG Element render
 *@method initSVGSize 紀錄SVG的寬高，用來繪製path
 *@method drawPaths 以迴圈的方式呼叫drawPath，並不處理邏輯細節
 *@method drawPath 真正繪製path的邏輯實作，回傳<path d="?"></path>的?字串
 *@method initCircleAndText 當path繪製完成之後，依據path繪製圓形跟文字
 *@method redrawPathsIfNeed 由於path d無法使用相對寬高，所以當頁面大小更動，需要重新繪製path，並且此方法需要當作watch的callback，所以方法內部不得使用this關鍵字，必須把class instance作為參數傳入
 *@method initOnMounted 初始化SVG，由於此方法需要當作onMounted的callback，所以不能設為私有，並且也不能使用this關鍵字，必須把class instance作為參數傳入
 */
class SVGDrawer {
  public isIntersecting = ref(false)
  public scaleY = ref(1)
  public windowWidth = useWindowSize().width
  public windowHeight = useWindowSize().height
  public svgEl = ref<SVGElement>()
  public currentSize = reactive({ width: 1, height: 1 })
  public points = reactive({
    台北: 'M0 0',
    新北: 'M0 0',
    桃園: 'M0 0',
    台中: 'M0 0',
    台南: 'M0 0',
    高雄: 'M0 0',
    targets: [{ x: 0, y: 0 }],
  })

  #initSVGSize(): void {
    const height = this.svgEl.value?.clientHeight || 0
    this.currentSize.width = this.svgEl.value?.clientWidth || 0
    this.currentSize.height = height
    this.scaleY.value = (height - 22) / height
  }

  #drawPath(arr: number[]): string {
    const width = this.currentSize.width
    const height = this.currentSize.height
    const yAxisMaxScale = props.data.yAxisScales.slice(-1)[0] || 0
    const yAxisRange = (yAxisMaxScale || 0) - (props.data.yAxisScales[0] || 0)
    let result = ''
    arr.forEach((num, index) => {
      const xPoint = (width / (arr.length - 1)) * index
      const yPoint = ((yAxisMaxScale - num) * height) / yAxisRange
      result += `L ${xPoint} ${yPoint} `
    })
    // path d starts with M
    return result.replace('L', 'M').trim()
  }

  #drawPaths(): void {
    for (const country of COUNTRYS)
      this.points[country] = this.#drawPath(props.data[country])
  }

  #initCircleAndText(): void {
    props.data.targetPoints?.forEach((targetPoint, index) => {
      const country = targetPoint.country
      const refIndex = targetPoint.index
      const PointX = parseInt(this.points[country]?.split(' ')[3 * refIndex + 1] || '0')
      const PointY = parseInt(this.points[country]?.split(' ')[3 * refIndex + 2] || '0')
      const relativeWidth = (PointX / (this.svgEl.value?.clientWidth || 0)) * 100
      const relativeHeight = (PointY / (this.svgEl.value?.clientHeight || 0)) * 100
      this.points.targets[index] = {
        x: relativeWidth,
        y: relativeHeight,
      }
    })
  }

  #redrawPathsIfNeed(instance: SVGDrawer): void {
    let changed = false
    const newWidth = instance.svgEl.value?.clientWidth || 0
    const newHeight = instance.svgEl.value?.clientHeight || 0
    if (instance.currentSize.width !== newWidth) {
      changed = true
      instance.currentSize.width = newWidth
    }
    if (instance.currentSize.height !== newHeight) {
      changed = true
      instance.currentSize.height = newHeight
      this.scaleY.value = (newHeight - 22) / newHeight
    }
    if (changed) instance.#drawPaths()
  }

  #handleAnimation(
    entries: IntersectionObserverEntry[],
    stop: () => void,
  ): void {
    for (const entry of entries) {
      if (entry.target === this.svgEl.value) {
        if (entry.isIntersecting === true) {
          stop()
          this.isIntersecting.value = entry.isIntersecting
        }
        // 為了不讓toolTip也跟著向右滑動，所以畫面移出移入就先關閉toolTip
        // toolTip.isOpen.value = false
        return
      }
    }
  }

  initOnMounted(instance: SVGDrawer): void {
    instance.#initSVGSize()
    instance.#drawPaths()
    instance.#initCircleAndText()
    watch([instance.windowWidth, instance.windowHeight], () => {
      instance.#redrawPathsIfNeed(instance)
    })
    const { stop } = useIntersectionObserver(
      instance.svgEl.value,
      (entries: IntersectionObserverEntry[], observer: IntersectionObserver) =>
        instance.#handleAnimation(entries, stop)
    )
  }
}
const toolTip = new ToolTip()
const svgDrawer = new SVGDrawer()
// mounted
onMounted(() => svgDrawer.initOnMounted(svgDrawer))
</script>

<template>
  <div class="chart-line-container">
    <div class="chart-line-title">
      {{ data.title }}
    </div>
    <div v-show="size === 'normal'" class="chart-line-legendList">
      <div class="chart-line-legend">
        <div class="chart-line-circle chart-line-bgColor1" />
        <div>台北</div>
      </div>
      <div class="chart-line-legend">
        <div class="chart-line-circle chart-line-bgColor2" />
        <div>新北</div>
      </div>
      <div class="chart-line-legend">
        <div class="chart-line-circle chart-line-bgColor3" />
        <div>桃園</div>
      </div>
      <div class="chart-line-legend">
        <div class="chart-line-circle chart-line-bgColor4" />
        <div>台中</div>
      </div>
      <div class="chart-line-legend">
        <div class="chart-line-circle chart-line-bgColor5" />
        <div>台南</div>
      </div>
      <div class="chart-line-legend">
        <div class="chart-line-circle chart-line-bgColor6" />
        <div>高雄</div>
      </div>
    </div>
    <div class="chart-line-subTitle">
      <div class="chart-line-yAxisLabel">
        ({{ data.yAxisLabel }})
      </div>
      {{ size === "normal" ? data.subTitle : "" }}
    </div>
    <div class="chart-line-chartBlock">
      <div class="chart-line-yAxisScales">
        <div
          v-for="scale in data.yAxisScales.slice().reverse()"
          :key="scale"
          class="chart-line-yAxisScale"
        >
          {{ scale }}
        </div>
      </div>
      <div v-show="svgDrawer.isIntersecting.value" class="chart-line-hrs">
        <div v-for="i in data.yAxisScales" :key="i" class="chart-line-hr">
          <div />
        </div>
      </div>
      <svg :ref="svgDrawer.svgEl" class="chart-line-svg">
        <g
          v-if="svgDrawer.svgEl.value"
          :transform="`scale(${85 / 90}, ${svgDrawer.scaleY.value})`"
        >
          <path
            v-for="country in COUNTRYS"
            :key="country"
            fill="none"
            :d="svgDrawer.points[country]"
            :stroke="BGCOLORS[country]"
            :stroke-width="currentPage === country ? 5 : 2"
          />
          <circle
            v-for="(point, index) in data.targetPoints || []"
            :key="index"
            r="5"
            fill="white"
            stroke-width="2"
            :stroke="BGCOLORS[point.country]"
            :cx="`${svgDrawer.points.targets[index]?.x}%`"
            :cy="`${svgDrawer.points.targets[index]?.y}%`"
          />
          <!-- <text
            v-for="(point, index) in data.targetPoints || []"
            :key="index"
            :class="
              point.index === data.xAxisScales.length - 1
                ? 'chart-line-alignLeft'
                : ''
            "
          >
            <tspan
              :x="`${svgDrawer.points.targets[index]?.x}%`"
              :y="`${svgDrawer.points.targets[index]?.y}%`"
              dy="-24"
            >
              {{ point.country }}
            </tspan>
            <tspan
              :x="`${svgDrawer.points.targets[index]?.x}%`"
              :y="`${svgDrawer.points.targets[index]?.y}%`"
            >
              {{ data.xAxisScales[point.index] }}年
              {{ data[point.country][point.index] }}
            </tspan>
          </text> -->
        </g>
      </svg>
      <div
        v-show="svgDrawer.isIntersecting.value"
        :ref="toolTip.maskEl"
        class="chart-line-toolTipMask"
        @mouseenter="toolTip.open"
        @mousemove="toolTip.move"
        @mouseleave="toolTip.close"
      >
        <div
          v-show="toolTip.isOpen.value"
          class="chart-line-vLine"
          :style="{ transform: `translateX(${toolTip.left.value}px)` }"
        >
          <div
            class="chart-line-toolTipContainer"
            :style="{ marginLeft: `${toolTip.margin.value}px` }"
          >
            <div class="chart-line-toolTip">
              <div>{{ data.xAxisScales[toolTip.xAxisScaleIndex.value] }}年</div>
              <div class="chart-line-legend">
                <div class="chart-line-circle chart-line-bgColor1" />
                <div class="chart-line-legendText">
                  台北 {{ data.台北[toolTip.xAxisScaleIndex.value] }}
                </div>
              </div>
              <div class="chart-line-legend">
                <div class="chart-line-circle chart-line-bgColor2" />
                <div class="chart-line-legendText">
                  新北 {{ data.新北[toolTip.xAxisScaleIndex.value] }}
                </div>
              </div>
              <div class="chart-line-legend">
                <div class="chart-line-circle chart-line-bgColor3" />
                <div class="chart-line-legendText">
                  桃園 {{ data.桃園[toolTip.xAxisScaleIndex.value] }}
                </div>
              </div>
              <div class="chart-line-legend">
                <div class="chart-line-circle chart-line-bgColor4" />
                <div class="chart-line-legendText">
                  台中 {{ data.台中[toolTip.xAxisScaleIndex.value] }}
                </div>
              </div>
              <div class="chart-line-legend">
                <div class="chart-line-circle chart-line-bgColor5" />
                <div class="chart-line-legendText">
                  台南 {{ data.台南[toolTip.xAxisScaleIndex.value] }}
                </div>
              </div>
              <div class="chart-line-legend">
                <div class="chart-line-circle chart-line-bgColor6" />
                <div class="chart-line-legendText">
                  高雄 {{ data.高雄[toolTip.xAxisScaleIndex.value] }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="chart-line-xAxisScales">
      <div
        v-for="scale in data.xAxisScales"
        :key="scale"
        class="chart-line-xAxisScale"
        :style="{ 
          maxWidth: `${100 / data.台北.length}%`,
          minWidth: `${100 / data.台北.length}%`
        }"
      >
        <span>{{ scale }}</span>
        <!-- <span v-if="index === 0">
          {{ data.xAxisLabel }}
        </span> -->
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
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
  @media screen and (min-width: 768px) {
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
  @media screen and (min-width: 768px) {
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
  @media screen and (min-width: 768px) {
    font-size: 16px;
    line-height: 24px;
    min-height: 24px;
  }
}
.chart-line-yAxisLabel {
  position: absolute;
  min-width: 10%;
  text-align: right;
}
.chart-line-legendList {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  width: 90%;
  margin: 0 auto;
  @media screen and (min-width: 768px) {
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
  @media screen and (min-width: 768px) {
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
  left: 12.5%;
  right: 2.5%;
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
  @media screen and (min-width: 768px) {
    height: 24px;
  }
  & > div {
    width: 100%;
    height: calc(50% - 1px);
    border-bottom: 1px dashed #404040;
  }
  &:last-child > div {
    border-bottom: 1px solid #404040;
  }
}
.chart-line-yAxisScales {
  width: 10%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  z-index: 3;
}
.chart-line-yAxisScale,
.chart-line-xAxisScale {
  text-align: right;
  font-weight: normal;
  font-size: 15px;
  line-height: 22px;
  color: #404040;
  @media screen and (min-width: 768px) {
    font-size: 16px;
    line-height: 24px;
  }
}
.chart-line-xAxisScale {
  transform: rotate(330deg) translateY(-5px);
}
// .chart-line-xAxisScale:nth-child(n+10) {
//   @media screen and (max-width: 768px) {
//     visibility: hidden;
//   }
// }
// .chart-line-xAxisScale:nth-child(n+11) {
//   @media screen and (min-width: 768px) {
//     visibility: hidden;
//   }
// }
.chart-line-xAxisScale:nth-child(even) {
  @media screen and (max-width: 768px) {
    visibility: hidden;
  }
}
.chart-line-xAxisScales {
  display: flex;
  flex-grow: 1;
  flex-wrap: wrap;
  max-height: 10%;
  padding-left: 10%;
}
.chart-line-svg {
  width: 90%;
  height: 100%;
  z-index: 1;
  & > g {
    transform-origin: center;
    & > text {
      fill: #404040;
      @media screen and (min-width: 768px) {
        font-size: 18px;
      }
    }
  }
}
.chart-line-toolTipMask {
  position: absolute;
  z-index: 2;
  top: 11px;
  bottom: 11px;
  left: 12.5%;
  right: 2.5%;
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
  & .legend {
    margin: 0;
    width: 90%;
  }
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
