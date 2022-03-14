<script setup lang="ts">
import { defineProps, ref, computed, onMounted } from "vue";
import { useIntersectionObserver } from "@vueuse/core";
import type { barChartSchema } from "../../data/barChart";
// props
const props = defineProps<{ data: barChartSchema }>();
// CONSTANT
type Countrys = "台北" | "新北" | "桃園" | "台中" | "台南" | "高雄"
const COUNTRYS: Countrys[] = ["台北", "新北", "桃園", "台中", "台南", "高雄"];
// ref
const showBars = ref(false);
// computed ref
const barsHeight = computed(() => {
  const result: { bar1: number; bar2: number; max: string }[] = [];
  for (const country of COUNTRYS) {
    const countryData: number[] = props.data[country];
    const yScaleMax = props.data.yAxisScales[props.data.yAxisScales.length - 1] || 0;
    const lastIdx = countryData.length - 1;
    const bar1 = parseFloat((((countryData[0] || 0) / yScaleMax) * 100).toFixed(2));
    const bar2 = parseFloat(
      (((countryData[lastIdx] || 0) / yScaleMax) * 100).toFixed(2)
    );
    result.push({
      bar1,
      bar2,
      max: `calc(${Math.max(bar1, bar2)}% + 10px)`,
    });
  }
  return result;
});
// method
function handleAnimation(
  entries: IntersectionObserverEntry[],
  observer: IntersectionObserver
): void {
  for (const entry of entries) {
    if (entry.target === document.getElementById("container")) {
      if (entry.isIntersecting) showBars.value = true;
      return;
    }
  }
}
// mounted
onMounted(() => {
  useIntersectionObserver(
    document.getElementById("container"),
    handleAnimation,
    { rootMargin: "0px", threshold: [0.5] }
  );
});
</script>
<template>
  <div id="container">
    <div class="title">{{ data.title }}</div>
    <div class="legendList">
      <div class="legend">
        <div class="circle bgColor1"></div>
        <div>2011</div>
      </div>
      <div class="legend">
        <div class="circle bgColor2"></div>
        <div>2020</div>
      </div>
    </div>
    <div class="subTitle">
      <div class="yAxisLabel">({{ data.yAxisLabel }})</div>
      {{ data.subTitle }}
    </div>
    <div class="chartBlock">
      <div class="yAxisScales">
        <div
          v-for="scale in data.yAxisScales.slice().reverse()"
          :key="scale"
          class="yAxisScale"
        >
          {{ scale }}
        </div>
      </div>
      <div class="hrs">
        <div v-for="i in data.yAxisScales" :key="i" class="hr">
          <div></div>
        </div>
      </div>
      <div v-show="showBars" class="chartContainer">
        <div
          v-for="(country, index) in COUNTRYS"
          :key="index"
          class="chartGroup"
        >
          <div class="barGroup">
            <div
              class="bar bgColor1"
              :style="{ height: `${barsHeight[index]?.bar1}%` }"
            ></div>
            <div
              class="bar bgColor2"
              :style="{ height: `${barsHeight[index]?.bar2}%` }"
            ></div>
            <div
              class="toolTip"
              :class="{ alignLeft: index >= 3 }"
              :style="{ bottom: `${barsHeight[index]?.max}` }"
            >
              <div>{{ country }}</div>
              <div class="legend">
                <div class="circle bgColor1"></div>
                <div class="legendText">2011年 {{ data[country][0] }}</div>
              </div>
              <div class="legend">
                <div class="circle bgColor2"></div>
                <div class="legendText">2020年 {{ data[country][1] }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="xAxisScales">
      <div v-for="scale in COUNTRYS" :key="scale" class="xAxisScale">
        {{ scale }}
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
#container {
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
.title {
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
.subTitle {
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
.yAxisLabel {
  position: absolute;
  width: 10%;
  text-align: right;
}
.legendList {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  width: 90%;
  margin: 0 auto;
  @media screen and (min-width: 768px) {
    width: 100%;
  }
}
.circle {
  width: 16px;
  height: 16px;
  margin-right: 0.25rem;
  border-radius: 50%;
}
.legend {
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
.chartBlock {
  display: flex;
  flex-grow: 1;
  position: relative;
}
.hrs {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 12.5%;
  right: 2.5%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  z-index: 0;
  @media screen and (min-width: 768px) {
    right: 5%;
  }
}
.chartContainer {
  width: 85%;
  margin: 11px 0px 12px 2.5%;
  display: flex;
  z-index: 1;
  @media screen and (min-width: 768px) {
    width: 82.5%;
    margin: 12px 0px 13px 2.5%;
  }
}
.chartGroup {
  display: flex;
  flex-grow: 1;
  justify-content: center;
}
.barGroup {
  position: relative;
  display: flex;
  height: 100%;
  align-items: flex-end;
  &:hover {
    background-color: #f1f1f1;
    & > .toolTip {
      display: flex;
    }
  }
}
.bar {
  &:first-child {
    margin-right: 5px;
  }
  width: 12px;
  animation: barGrowUp 1s;
  transform-origin: bottom;
  @media screen and (min-width: 768px) {
    width: 20px;
  }
}
@keyframes barGrowUp {
  0% {
    transform: scaleY(0);
  }
  100% {
    transform: scaleY(1);
  }
}
.hr {
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
.yAxisScales {
  width: 10%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.yAxisScale,
.xAxisScale {
  font-weight: normal;
  font-size: 15px;
  line-height: 22px;
  color: #404040;
  @media screen and (min-width: 768px) {
    font-size: 16px;
    line-height: 24px;
  }
}
.yAxisScale {
  text-align: right;
}
.xAxisScale {
  flex-grow: 1;
  text-align: center;
}
.xAxisScales {
  display: flex;
  margin-left: 12.5%;
  width: 85%;
  justify-content: space-between;
  @media screen and (min-width: 768px) {
    width: 82.5%;
  }
}
.toolTip {
  z-index: 2;
  position: absolute;
  width: 150px;
  padding: 10px 0px 10px 0px;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.25);
  background-color: white;
  display: none;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  & .legend {
    margin: 0;
    width: 90%;
  }
}
.alignLeft {
  left: -121px;
  @media screen and (min-width: 768px) {
    left: -105px;
  }
}
.legendText {
  flex-grow: 1;
}
.bgColor1 {
  background-color: #ffa800;
}
.bgColor2 {
  background-color: #32c5bc;
}
</style>
