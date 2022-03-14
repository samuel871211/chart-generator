<template>
  <div class="donut">
    <div class="donut__info">
      <div class="donut__info-title">{{ data.title }}</div>
      <div class="donut__info-subtitle">{{ data.subtitle }}</div>
      <div class="donut__info-legend">
        <template v-for="legend in data.data" :key="legend">
          <div
            class="legend"
            :class="legend.option"
            :style="`--legend-color: ${legend.color};`"
          >
            {{ legend.option }}
          </div>
        </template>
      </div>
    </div>
    <div ref="target" :class="`donut__chart-${data.id}`"></div>
  </div>
</template>

<script>
import { useIntersectionObserver } from '@vueuse/core'
import { defineComponent, ref, onMounted } from 'vue'
import * as d3 from 'd3'
import * as c3 from 'c3'

export default defineComponent({
  props: ["data"],
  setup(props) {
    const target = ref(null);
    const targetIsVisible = ref(false);

    useIntersectionObserver(target, ([{ isIntersecting }]) => {
      targetIsVisible.value = isIntersecting;
      if (targetIsVisible.value) {
        d3.select(`.donut__chart-${props.data.id} circle`)
          .transition()
          .attr("stroke-dashoffset", 610)
          .duration(1000);
      }
    });
    onMounted(() => {
      const datas = props.data.data.map((d) => [d.option, d.value]);
      const colors = {};
      props.data.data.forEach((d) => (colors[d.option] = d.color));

      const width = document.body.clientWidth;
      c3.generate({
        bindto: `.donut__chart-${props.data.id}`,
        data: {
          type: "donut",
          order: "dsc",
          columns: datas,
          colors,
        },
        size: {
          height: width <= 375 ? 270 : 300,
        },
        legend: {
          hide: true,
        },
        tooltip: {
          contents: (d) => {
            return `<div id="donut__tooltip"><div> ${d[0].name} ${d[0].value} %</div></div>`;
          },
        },
        donut: {
          label: {
            threshold: 0.07,
            format(value, ratio, id) {
              return id !== "不知道/未回答" ? `${value}%` : "";
            },
          },
          width: width <= 375 ? 49 : 55,
        },
      });
      d3.select(`.donut__chart-${props.data.id} .c3-chart-arcs`)
        .append("circle")
        .attr("class", "donut-circle")
        .attr("r", 97)
        .attr("fill", "none")
        .attr("stroke", "#ffffff")
        .attr("stroke-width", 77)
        .attr("stroke-dashoffset", 0)
        .attr("stroke-dasharray", 610);
    });
    return {
      target,
      targetIsVisible,
    };
  },
});
</script>

<style lang="scss">
.donut {
  height: 440px;
  padding: 9px 20px;
  margin: 0 auto;
  background: #ffffff;
  @media screen and (min-width: 414px) {
    padding: 9px 25px;
  }
  @media screen and (min-width: 768px) {
    // width: 530px;
    height: 420px;
  }
  @media screen and (min-width: 1280px) {
    // width: 620px;
  }
  &__info {
    text-align: center;
    &-title {
      font-size: 20px;
      text-align: left;
      font-weight: 700;
      margin-bottom: 5px;
      color: #404040;
      display: inline-block;
      @media screen and (min-width: 768px) {
        font-size: 24px;
        margin-bottom: 8px;
      }
    }
    &-subtitle {
      font-size: 15px;
      font-weight: 700;
      margin-bottom: 10px;
      color: #808080;
      text-align: left;
      display: inline-block;
      @media screen and (min-width: 768px) {
        font-size: 18px;
        margin-bottom: 8px;
      }
    }
    &-legend {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      align-items: center;
      margin-bottom: 20px;
      @media screen and (min-width: 375px) {
        margin-bottom: 40px;
      }
    }
  }
}
.legend {
  font-size: 15px;
  font-weight: 400;
  color: #404040;
  margin: 0 4px 5px 4px;
  display: flex;
  align-items: center;
  @media screen and (min-width: 768px) {
    font-size: 16px;
  }
  &::before {
    content: "";
    display: inline-block;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background-color: var(--legend-color);
    margin-right: 3px;
    @media screen and (min-width: 375px) {
      margin-right: 5px;
      width: 16px;
      height: 16px;
    }
  }
}
.c3-chart-arcs {
  & > g > text {
    font-size: 15px;
    fill: white;
    @media screen and (min-width: 414px) {
      font-size: 18px;
    }
  }
}
#donut__tooltip {
  position: absolute;
  font-size: 18px;
  color: #404040;
  text-align: center;
  display: contents;
  & > div {
    padding: 3px 10px;
    background: white;
    border: 0px;
    border-radius: 4px;
    box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.25);
    pointer-events: none;
  }
}
.c3-defocused {
  opacity: 0.3;
}
.donut__chart {
  margin: 0 auto;
}
.donut-circle {
  transform: rotate(90deg) rotateY(180deg);
}
</style>
