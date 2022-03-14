<script setup lang="ts">
import { defineProps, reactive, ref, computed, onMounted } from "vue";
import { useIntersectionObserver } from "@vueuse/core";
// import { detectMob } from "../../utils/udn-newmedia-utils";
// constant
const RATELIST = [
  "非常滿意",
  "還算滿意",
  "不太滿意",
  "非常不滿意",
  "不知道/未回答",
];
type Countrys = "台北" | "新北" | "桃園" | "台中" | "台南" | "高雄"
const COUNTRYS: Countrys[] = ["台北", "新北", "桃園", "台中", "台南", "高雄"];
// reactive data
const isInterSecting = ref(false);
const containerEl = ref<HTMLDivElement>();
const toolTipEl = ref<HTMLDivElement>();
const toolTipEvtHandler = reactive({
  click: null,
  mouseover: handleToolTip,
  mouseleave: () => (toolTip.open = false),
});
const toolTip = reactive({
  open: false,
  top: -1,
  left: -1,
  text: "",
});
// props
const props = defineProps<{
  data: {
    台中: number[];
    新北: number[];
    桃園: number[];
    台南: number[];
    高雄: number[];
    台北: number[];
    title: string;
    subTitle: string;
  };
}>();
// computed
const bestCountryAndRate = computed(() => {
  let bestCountry = "";
  let bestRate = 0;
  for (const country of COUNTRYS) {
    const rate: number = props.data[country]
      ?.slice(0, 2)
      .reduce((a: number, b: number) => a + b);
    if (rate > bestRate) {
      bestRate = rate;
      bestCountry = country;
    }
  }
  return `${bestCountry}${bestRate.toFixed(1)}%`;
});
// methods
function handleToolTip(e: MouseEvent | PointerEvent): void {
  // 因為這隻call back func都是register在HTMLDivElement
  if (!containerEl.value || !toolTipEl.value) return
  const targetEl = e.currentTarget as HTMLDivElement;
  const title = targetEl.getAttribute("data-title");
  const {
    x: containerX,
    y: containerY,
    width: containerWidth,
  } = containerEl.value.getBoundingClientRect();
  toolTip.open = (function determineByEventType(): boolean {
    if (e.type === "mouseover") return true;
    if (toolTip.text !== title) return true;
    return !toolTip.open;
  })();
  toolTip.text = title || '';
  // toolTip的定位是相對於ref containerEl，可以確保toolTip不會飄到圖表外面
  // Y軸座標一律放在滑鼠指標的上方
  // X軸座標會根據containerEl寬度以及toolTip寬度，來決定放在第一象限or第二象限
  toolTip.top = e.clientY - containerY - 30;
  toolTip.left = (function determineByWidth(): number {
    const toolTipElWidth = toolTipEl.value.clientWidth;
    let result = e.clientX - containerX;
    if (result > containerWidth / 2) result -= toolTipElWidth + 2;
    else if (result <= containerWidth / 2) result += 2;
    return result;
  })();
}

// mounted
onMounted(function registerToolTipEvtHandler() {
  // const isMobile = detectMob();
  // toolTipEvtHandler.click = isMobile ? handleToolTip : null;
  // toolTipEvtHandler.mouseover = isMobile ? null : handleToolTip;
  // toolTipEvtHandler.mouseleave = isMobile ? null : () => (toolTip.open = false);
});

// init animation
onMounted(() => {
  const { stop } = useIntersectionObserver(containerEl.value, ([entry]) => {
    if (entry?.isIntersecting) {
      isInterSecting.value = true;
      stop();
    }
  });
});
</script>

<template>
  <div ref="containerEl" class="shb-container">
    <div class="shb-title">{{ data.title }}</div>
    <div class="shb-subTitle">{{ data.subTitle }}</div>
    <div class="shb-legendList">
      <div class="shb-legend">
        <div class="shb-circle shb-bgColor1"></div>
        <div>非常滿意</div>
      </div>
      <div class="shb-legend">
        <div class="shb-circle shb-bgColor2"></div>
        <div>還算滿意</div>
      </div>
      <div class="shb-legend">
        <div class="shb-circle shb-bgColor3"></div>
        <div>不太滿意</div>
      </div>
      <div class="shb-legend">
        <div class="shb-circle shb-bgColor4"></div>
        <div>非常不滿意</div>
      </div>
      <div class="shb-legend">
        <div class="shb-circle shb-bgColor5"></div>
        <div>不知道/未回答</div>
      </div>
    </div>
    <div class="shb-chartArea">
      <div class="shb-chartBlock">
        <div class="shb-barTitle">台中</div>
        <div v-show="isInterSecting" class="shb-bars">
          <div
            v-for="(rate, index) in props.data.台中"
            :key="index"
            :class="['shb-bar', `shb-bgColor${index + 1}`]"
            :style="{ width: `${rate}%` }"
            :data-title="(RATELIST[index] || '') + rate + '%'"
            v-on="toolTipEvtHandler"
          >
            {{ index === 4 ? "" : rate }}
          </div>
        </div>
      </div>
      <div class="shb-chartBlock">
        <div class="shb-barTitle">新北</div>
        <div v-show="isInterSecting" class="shb-bars">
          <div
            v-for="(rate, index) in props.data.新北"
            :key="index"
            :class="['shb-bar', `shb-bgColor${index + 1}`]"
            :style="{ width: `${rate}%` }"
            :data-title="(RATELIST[index] || '') + rate + '%'"
            v-on="toolTipEvtHandler"
          >
            {{ index === 4 ? "" : rate }}
          </div>
        </div>
      </div>
      <div class="shb-chartBlock">
        <div class="shb-barTitle">桃園</div>
        <div v-show="isInterSecting" class="shb-bars">
          <div
            v-for="(rate, index) in props.data.桃園"
            :key="index"
            :class="['shb-bar', `shb-bgColor${index + 1}`]"
            :style="{ width: `${rate}%` }"
            :data-title="(RATELIST[index] || '') + rate + '%'"
            v-on="toolTipEvtHandler"
          >
            {{ index === 4 ? "" : rate }}
          </div>
        </div>
      </div>
      <div class="shb-chartBlock">
        <div class="shb-barTitle">台南</div>
        <div v-show="isInterSecting" class="shb-bars">
          <div
            v-for="(rate, index) in props.data.台南"
            :key="index"
            :class="['shb-bar', `shb-bgColor${index + 1}`]"
            :style="{ width: `${rate}%` }"
            :data-title="(RATELIST[index] || '') + rate + '%'"
            v-on="toolTipEvtHandler"
          >
            {{ index === 4 ? "" : rate }}
          </div>
        </div>
      </div>
      <div class="shb-chartBlock">
        <div class="shb-barTitle">高雄</div>
        <div v-show="isInterSecting" class="shb-bars">
          <div
            v-for="(rate, index) in props.data.高雄"
            :key="index"
            :class="['shb-bar', `shb-bgColor${index + 1}`]"
            :style="{ width: `${rate}%` }"
            :data-title="(RATELIST[index] || '') + rate + '%'"
            v-on="toolTipEvtHandler"
          >
            {{ index === 4 ? "" : rate }}
          </div>
        </div>
      </div>
      <div class="shb-chartBlock">
        <div class="shb-barTitle">台北</div>
        <div v-show="isInterSecting" class="shb-bars">
          <div
            v-for="(rate, index) in props.data.台北"
            :key="index"
            :class="['shb-bar', `shb-bgColor${index + 1}`]"
            :style="{ width: `${rate}%` }"
            :data-title="(RATELIST[index] || '') + rate + '%'"
            v-on="toolTipEvtHandler"
          >
            {{ index === 4 ? "" : rate }}
          </div>
        </div>
      </div>
      <div class="shb-chartBlock">
        <div class="shb-barTitle shb-unitTitle">
          <div class="shb-verticalLine shb-emptyLine"></div>
          <div class="shb-unit">(%)</div>
        </div>
        <div class="shb-unitNumbers">
          <div>
            <div class="shb-verticalLine"></div>
            <div class="shb-unit">0</div>
          </div>
          <div>
            <div class="shb-verticalLine"></div>
            <div class="shb-unit">25</div>
          </div>
          <div>
            <div class="shb-verticalLine"></div>
            <div class="shb-unit">50</div>
          </div>
          <div>
            <div class="shb-verticalLine"></div>
            <div class="shb-unit">75</div>
          </div>
          <div>
            <div class="shb-verticalLine"></div>
            <div class="shb-unit">100</div>
          </div>
        </div>
      </div>
    </div>
    <div
      ref="toolTipEl"
      class="shb-toolTip"
      :style="{
        visibility: toolTip.open ? 'visible' : 'hidden',
        top: `${toolTip.top}px`,
        left: `${toolTip.left}px`,
      }"
    >
      {{ toolTip.text }}
    </div>
  </div>
</template>

<style scoped lang="scss">
.shb-container {
  font-family: Noto Sans TC;
  font-style: normal;
  position: relative;
  background-color: white;
  width: 100%;
  // margin: 0 auto;
  // width: 90%;
  // max-width: 530px;
  // height: 440px;
  // @media screen and (min-width: 768px) {
  //   width: 530px;
  //   height: 420px;
  // }
  // @media screen and (min-width: 1280px) {
  //   width: 620px;
  //   max-width: 620px;
  //   height: 420px;
  // }
}
.shb-title {
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
    padding-top: 8px;
    margin-bottom: 0px;
  }
  @media screen and (min-width: 1280px) {
    font-size: 24px;
    line-height: 34px;
    padding-top: 20px;
    margin-bottom: 0px;
  }
}
.shb-subTitle {
  color: #808080;
  font-weight: bold;
  font-size: 15px;
  line-height: 22px;
  text-align: center;
  width: 90%;
  margin: 0 auto 5px auto;
  @media screen and (min-width: 768px) {
    font-size: 18px;
    line-height: 34px;
    margin: 0 auto 10px auto;
  }
}
.shb-legendList {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  width: 90%;
  margin: 0 auto 20px auto;
  @media screen and (min-width: 768px) {
    width: 100%;
  }
}
.shb-circle {
  width: 16px;
  height: 16px;
  margin-right: 0.25rem;
  border-radius: 50%;
}
.shb-legend {
  display: flex;
  align-items: center;
  font-weight: normal;
  font-size: 15px;
  line-height: 22px;
  color: #404040;
  @media screen and (min-width: 768px) {
    font-size: 16px;
    line-height: 24px;
  }
}
.shb-chartArea {
  color: black;
  width: 90%;
  margin: 0 auto;
}
.shb-chartBlock {
  display: flex;
  width: 100%;
  align-items: center;
  margin-bottom: 13px;
  &:nth-child(6) {
    margin-bottom: 10px;
  }
  &:last-child {
    margin-bottom: 0px;
  }
  @media screen and (min-width: 768px) {
    margin-bottom: 10px;
  }
}
.shb-unitTitle {
  width: 30px;
  margin-right: 8px;
  text-align: right;
  @media screen and (min-width: 768px) {
    width: 36px;
  }
}
.shb-unit {
  font-size: 15px;
  font-weight: normal;
  line-height: 22px;
  @media screen and (min-width: 768px) {
    font-size: 16px;
    line-height: 24px;
  }
}
.shb-barTitle {
  font-size: 15px;
  font-weight: normal;
  line-height: 22px;
  color: #404040;
  margin-right: 8px;
  @media screen and (min-width: 768px) {
    font-size: 18px;
    line-height: 24px;
  }
}
.shb-bars {
  display: flex;
  flex-grow: 1;
  animation: extend 1.5s;
}
@keyframes extend {
  0% {
    flex-grow: 0;
  }
  100% {
    flex-grow: 1;
  }
}
@keyframes squeeze {
  0% {
    flex-grow: 1;
  }
  100% {
    flex-grow: 0;
  }
}
.shb-bar {
  user-select: none;
  height: 26px;
  font-size: 15px;
  font-weight: bold;
  text-align: right;
  color: #ffffff;
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  @media screen and (min-width: 768px) {
    height: 30px;
    font-size: 18px;
  }
}
.shb-unitNumbers {
  display: flex;
  flex-grow: 1;
  justify-content: space-between;
}
.shb-verticalLine {
  width: 50%;
  height: 5px;
  border: none;
  border-right: 1px solid #404040;
  margin-bottom: 5px;
  @media screen and (min-width: 768px) {
    margin-bottom: 0px;
  }
}
.shb-emptyLine {
  border: none;
}
.shb-toolTip {
  user-select: none;
  position: absolute;
  width: max-content;
  font-size: 15px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #404040;
  background-color: #ffffff;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.25);
  @media screen and (min-width: 768px) {
    font-size: 18px;
  }
}
.shb-bgColor1 {
  background-color: #ffa800;
}
.shb-bgColor2 {
  background-color: rgba(255, 168, 0, 0.5);
}
.shb-bgColor3 {
  background-color: rgba(50, 197, 188, 0.5);
}
.shb-bgColor4 {
  background-color: #32c5bc;
}
.shb-bgColor5 {
  background-color: #808080;
}
</style>
