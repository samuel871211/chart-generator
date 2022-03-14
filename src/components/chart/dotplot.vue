<template>
  <div ref="target" class="dotplot">
    <h2>{{ data.title }}</h2>
    <div class="dotplot__legend">
      <div
        :class="`dotplot__legend-${data.label.start}`"
        :style="`--legend-color: ${data.label.startColor};`"
      >
        {{ data.label.start }}
      </div>
      <div
        :class="`dotplot__legend-${data.label.end}`"
        :style="`--legend-color: ${data.label.endColor};`"
      >
        {{ data.label.end }}
      </div>
    </div>
    <div class="dotplot__tooltip"></div>
  </div>
</template>

<script>
import { useIntersectionObserver } from "@vueuse/core";
import { defineComponent, ref, onMounted } from "vue"
import * as d3 from 'd3'

export default defineComponent({
  props: ["data"],
  setup(props) {
    const target = ref(null);
    const targetIsVisible = ref(false);

    // animate
    useIntersectionObserver(target, ([{ isIntersecting }]) => {
      targetIsVisible.value = isIntersecting;
      if (targetIsVisible.value) {
        d3.selectAll(".lollipop-start")
          .transition()
          .attr("opacity", 1)
          .duration(100);
        d3.selectAll(".lollipop-line")
          .transition()
          .ease(d3.easeLinear)
          .attr("stroke-dashoffset", 0)
          .duration(1000)
          .on("end", () => {
            d3.selectAll(".lollipop-end")
              .transition()
              .attr("opacity", 1)
              .duration(500);
          });
      }
    });
    onMounted(() => {
      const clientWidth = document.body.clientWidth;
      const margin = { top: 20, right: 30, bottom: 22, left: 45 };
      const width = parseInt(d3.select(".dotplot").style("width"));
      const height =
        368 - margin.top - (clientWidth < 1280 ? margin.bottom : 45);
      const innerWidth = width - margin.left - margin.right;
      const innerHeight = height - margin.top - margin.bottom;

      // append the svg object to the element
      const svg = d3
        .select(".dotplot")
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);

      // layout
      const xScale = d3
        .scaleLinear()
        .domain([240000, 480000])
        .range([12, innerWidth])
        .nice();

      const yScale = d3
        .scaleBand()
        .domain(props.data.data.map((d) => d.city))
        .range([0, innerHeight]);

      const xAxis = d3
        .axisBottom(xScale)
        .tickSize(innerHeight)
        .tickValues([240000, 300000, 400000, 480000])
        .tickPadding(10)
        .tickFormat((y) => y.toString());

      const yAxis = d3
        .axisLeft(yScale)
        .tickSize(0)
        .tickPadding(10)
        .tickFormat((y) => y.substring(0, y.length - 1));

      const xAxisGroup = svg.append("g").attr("class", "x-axis-group");
      xAxisGroup
        .append("g")
        .attr("class", "x-axis")
        .call(xAxis)
        .style("stroke-dasharray", "1 3");

      const yAxisGroup = svg.append("g").attr("class", "y-axis-group");
      yAxisGroup.append("g").attr("class", "y-axis").call(yAxis);

      svg
        .append("text")
        .attr("class", "axis-label")
        .attr("x", -40)
        .attr("y", innerHeight + 19)
        .text(props.data.label.unit);

      // Create line & circle
      const lollipopLinePath = function (d) {
        return d3.line()([
          [xScale(d.start), 0],
          [xScale(d.end), 0],
        ]);
      };

      const lollipopsGroup = svg.append("g").attr("class", "lollipops");
      const lollipops = lollipopsGroup
        .selectAll("g")
        .data(props.data.data)
        .enter()
        .append("g")
        .attr("class", "lollipop")
        .attr(
          "transform",
          (d) => `translate(0, ${yScale(d.city) + yScale.bandwidth() / 2})`
        )
        .attr("stroke-dashoffset", 500);

      lollipops
        .append("path")
        .attr("class", "lollipop-line")
        .attr("d", lollipopLinePath);

      lollipops
        .append("path")
        .attr("class", "lollipop-line-transparent")
        .attr("d", lollipopLinePath)
        .style("stroke-width", 30);

      lollipops
        .append("circle")
        .attr("class", "lollipop-start")
        .attr("r", 5)
        .attr("cx", (d) => xScale(d.start));

      lollipops
        .append("circle")
        .attr("class", "lollipop-end")
        .attr("r", 5)
        .attr("cx", (d) => xScale(d.end));

      d3.selectAll(".lollipop-start").attr("opacity", 0);
      d3.selectAll(".lollipop-end").attr("opacity", 0);
      d3.selectAll(".lollipop-line")
        .attr("stroke-dashoffset", clientWidth <= 414 ? 150 : 500)
        .attr("stroke-dasharray", clientWidth <= 414 ? 150 : 500);

      // Create tooltip and compute the position
      const tooltip = d3.select(".dotplot__tooltip");
      const svgWidth = parseInt(d3.select(".dotplot > svg").style("width"));

      d3.selectAll(".lollipop")
        .on("mousemove", function (d, e) {
          const { city, start, end } = { ...d };
          const pageX = d3.mouse(this)[0];
          const tooltipWidth = parseInt(tooltip.style("width"));
          const maxX = svgWidth - tooltipWidth - 40;
          tooltip.transition().style("opacity", 1).duration(100);
          tooltip
            .html(
              `<div>
                <div>${city}</div>
                <p class="dotplot__legend-${props.data.label.start}" style="--legend-color: ${props.data.label.startColor};">2011 年 ${start}</p>
                <p class="dotplot__legend-${props.data.label.end}" style="--legend-color: ${props.data.label.endColor};">2020年 ${end}</p>
              </div>`
            )
            .style("left", `${pageX <= maxX ? pageX + 40 : maxX + 40}px`)
            .style("top", `${e * yScale.bandwidth() + 40}px`);
        })
        .on("mouseout", function () {
          tooltip.transition().style("opacity", 0).duration(100);
        });
    });
    return {
      target,
      targetIsVisible,
    };
  },
});
</script>

<style lang="scss">
.dotplot {
  height: 440px;
  position: relative;
  margin: 0 auto;
  background: #ffffff;
  @media screen and (min-width: 1280px) {
    height: 420px;
  }
  & > h2 {
    font-size: 18px;
    text-align: center;
    font-weight: 700;
    color: #404040;
    margin: 10px 0;
    @media screen and (min-width: 375px) {
      font-size: 20px;
    }
    @media screen and (min-width: 768px) {
      font-size: 24px;
    }
  }
}
.dotplot__legend {
  display: flex;
  justify-content: center;
  margin-bottom: 30px;
}
[class^="dotplot__legend-"] {
  font-size: 16px;
  font-weight: 400;
  color: #404040;
  margin: 0 5px;
  display: flex;
  align-items: center;
  &::before {
    content: "";
    display: inline-block;
    min-width: 16px;
    min-height: 16px;
    border-radius: 50%;
    background-color: var(--legend-color);
    margin: 0 5px;
  }
}
.lollipop {
  &-start {
    fill: #ffa800;
  }
  &-end {
    fill: #32c5bc;
  }
  &-line {
    stroke: #ffa800;
    stroke-width: 2px;
    &-transparent {
      stroke-width: 20px;
      stroke: #eeeded;
      opacity: 0;
    }
  }
}
.tick {
  fill: #404040;
  & text {
    font-size: 12px;
    font-weight: 400;
    @media screen and (min-width: 375px) {
      font-size: 14px;
    }
    @media screen and (min-width: 768px) {
      font-size: 16px;
    }
  }
}
.axis-label {
  font-size: 12px;
  font-weight: 400;
}
.x-axis,
.y-axis {
  & > path {
    opacity: 0;
  }
}
.dotplot__tooltip {
  position: absolute;
  color: #404040;
  text-align: center;
  width: fit-content;
  height: auto;
  & > div {
    background: white;
    padding: 3px 10px;
    border: 0px;
    box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.25);
    text-align: center;
    margin: 0 auto;
    & > div {
      margin: 10px 0 4px 0;
    }
    & > p {
      margin: -5px 0;
    }
  }
}
</style>
