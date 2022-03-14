<template>
  <div class="treemap">
    <h2>{{ data.title }}</h2>
  </div>
</template>

<script>
import { defineComponent, onMounted } from "vue"
import * as d3 from 'd3'

export default defineComponent({
  props: ["data"],
  setup(props) {
    onMounted(() => {
      function drawTreemap() {
        const rwdSvgWidth = parseInt(d3.select(".treemap").style("width"));
        const margin = { top: 10, right: 10, bottom: 10, left: 10 };
        const width =
          rwdSvgWidth < 1269 ? rwdSvgWidth - margin.left - margin.right : 620;
        const height = 348 - margin.top - margin.bottom;
        const clientWidth = document.body.clientWidth;
        const colorMap = {
          台北: "#32C5BC",
          新北: "#20619D",
          桃園: "#FF6265",
          台中: "#FFA800",
          台南: "#C6AD8F",
          高雄: "#BA79D7",
        };

        // append the svg object to the element
        const svg = d3
          .select(".treemap")
          .append("svg")
          .attr("width", width + margin.left + margin.right)
          .attr("height", height + margin.top + margin.bottom)
          .append("g")
          .attr("transform", `translate(${margin.left}, ${margin.top})`);

        // stratify the data
        const root = d3
          .stratify()
          .id(function (d) {
            return d.name;
          })
          .parentId((d) => {
            return d.parent;
          })(props.data.data);
        root.sum((d) => {
          return +d.value;
        }); // Compute the value for each entity

        // Compute the position of each element
        d3
          .treemap()
          .tile(d3.treemapBinary) // type of layout algorithm
          .size([width, height])
          .padding(4)
          .round(true)(root);

        // add rectangles
        const nodes = svg
          .selectAll("rect")
          .data(root.leaves())
          .enter()
          .append("g");

        nodes
          .append("rect")
          .attr("x", function (d) {
            return d.x0;
          })
          .attr("y", function (d) {
            return d.y0;
          })
          .attr("width", function (d) {
            return d.x1 - d.x0;
          })
          .attr("height", function (d) {
            return d.y1 - d.y0;
          })
          .style("fill", function (d) {
            return colorMap[d.data.name];
          });

        // add the text labels
        nodes
          .append("text")
          .attr("x", function (d) {
            return clientWidth <= 414 ? d.x0 + 5 : d.x0 + 7;
          })
          .attr("y", function (d) {
            return d.y0 + 20;
          })
          .text(function (d) {
            return d.data.name;
          })
          .attr("fill", "white");

        if (clientWidth <= 375) {
          nodes
            .append("text")
            .attr("x", function (d) {
              return clientWidth <= 414 ? d.x0 + 5 : d.x0 + 7;
            })
            .attr("y", function (d) {
              return d.y0 + 38;
            })
            .text(function (d) {
              return d.data.value;
            })
            .attr("fill", "white");
          nodes
            .append("text")
            .attr("x", function (d) {
              return clientWidth <= 414 ? d.x0 + 5 : d.x0 + 7;
            })
            .attr("y", function (d) {
              return d.y0 + 55;
            })
            .text(function (d) {
              return "公頃";
            })
            .attr("fill", "white");
        } else {
          nodes
            .append("text")
            .attr("x", function (d) {
              return clientWidth <= 414 ? d.x0 + 5 : d.x0 + 7;
            })
            .attr("y", function (d) {
              return d.y0 + 40;
            })
            .text(function (d) {
              return `${d.data.value}公頃`;
            })
            .attr("fill", "white");
        }
      }
      // resize
      drawTreemap();
      d3.select(window).on("resize", () => {
        d3.select(".treemap > svg").remove();
        drawTreemap();
      });
    });
  },
});
</script>

<style lang="scss">
.treemap {
  height: 440px;
  margin: 0 auto;
  background: #ffffff;
  @media screen and (min-width: 1280px) {
    height: 420px;
  }
  & h2 {
    font-size: 18px;
    text-align: center;
    font-weight: 700;
    margin-bottom: 53px;
    color: #404040;
    @media screen and (min-width: 375px) {
      font-size: 20px;
    }
    @media screen and (min-width: 768px) {
      font-size: 24px;
      margin-bottom: 8px;
    }
  }
  & text {
    font-size: 13px;
    font-weight: 700;
    @media screen and (min-width: 375px) {
      font-size: 15px;
    }
    @media screen and (min-width: 768px) {
      font-size: 16px;
    }
  }
}
</style>
