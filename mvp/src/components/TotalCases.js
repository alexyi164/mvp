import * as d3 from 'd3';

const MARGIN = { TOP: 10, BOTTOM: 50, LEFT: 80, RIGHT: 10 }
const WIDTH = 800 - MARGIN.LEFT - MARGIN.RIGHT;
const HEIGHT = 500 - MARGIN.TOP - MARGIN.BOTTOM;

const topCasesSort = (data) => {
  data.sort((a, b) => {
    if (a.positive < b.positive) {
      return 1;
    } else if (a.positive > b.positive) {
      return -1;
    }
    return 0;
  })
  return data.slice(0, 15)
}

const topDeathsSort = (data) => {
  data.sort((a, b) => {
    if (a.death < b.death) {
      return 1;
    } else if (a.death > b.death) {
      return -1;
    }
    return 0;
  })
  return data.slice(0, 15)
}

export default class TotalCases {
  constructor(element) {
    const vis = this

    vis.svg = d3.select(element)
      .append("svg")
        .attr("width", WIDTH + MARGIN.LEFT + MARGIN.RIGHT)
        .attr("height", HEIGHT + MARGIN.TOP + MARGIN.BOTTOM)
      .append("g")
        .attr("transform", `translate(${MARGIN.LEFT}, ${MARGIN.TOP})`)

    vis.xLabel = vis.svg.append('text')
      .attr('x', WIDTH / 2)
      .attr('y', HEIGHT + 50)
      .attr('text-anchor', 'middle')

    vis.yLabel = vis.svg.append('text')
      .attr('x', -HEIGHT / 2)
      .attr('y', -60)
      .attr('text-anchor', 'middle')
      // .text("Positive Cases")
      .attr('transform', 'rotate(-90)')

    vis.xAxisGroup = vis.svg.append("g")
      .attr("transform", `translate(0, ${HEIGHT})`)

    vis.yAxisGroup = vis.svg.append("g")

    Promise.all([
      d3.json('https://api.covidtracking.com/v1/states/current.json'),
      d3.json('../../washingtonRace.json')
    ])
      .then((datasets) =>  {
        vis.topCases = topCasesSort(datasets[0]);
        vis.topDeaths = topDeathsSort(datasets[0]);
        vis.raceData = datasets[1];
        vis.update('totalCases')
      })

  }

  update(view) {
    if (view === 'totalCases') {
      const vis = this;

      vis.data = vis.topCases;
      vis.yLabel.text('Positive Cases')
      vis.xLabel.text(`Top 15 US States by Covid Cases`)

      const y = d3.scaleLinear()
      .domain([d3.min(vis.data, d => d.positive) * 0.95, d3.max(vis.data, d =>  d.positive)])
      .range([HEIGHT, 0])

      const x = d3.scaleBand()
        .domain(vis.data.map(d => d.state))
        .range([0, WIDTH])
        .padding(0.4)

      const xAxisCall = d3.axisBottom(x)
      vis.xAxisGroup.transition().duration(500).call(xAxisCall)

      const yAxisCall = d3.axisLeft(y)
      vis.yAxisGroup.transition().duration(500).call(yAxisCall)


      //DATA JOIN
      const rects = vis.svg.selectAll("rect")
        .data(vis.data)

      //EXIT
      rects.exit()
        .attr('height', 0)
        .attr('y', HEIGHT)
        .transition().duration(500)
        .remove()

      //UPDATE
      rects.transition().duration(500)
        .attr("x", d => x(d.state))
        .attr("y", d => y(d.positive))
        .attr('width', x.bandwidth)
        .attr('height', d => HEIGHT - y(d.positive))
        .attr('fill', (d, i) => {
          if (i === 0) {
            return 'red';
          } else if (i === 14) {
            return 'green';
          }
          return 'grey';
        })

      rects.enter()
        .append("rect")
          .attr("x", d => x(d.state))
          .attr('width', x.bandwidth)
          .attr('fill', (d, i) => {
            if (i === 0) {
              return 'red';
            } else if (i === 14) {
              return 'green';
            }
            return 'grey';
          })
          .attr('y', HEIGHT)
          .transition('duration', 500)
            .attr("y", d => y(d.positive))
            .attr('height', d => HEIGHT - y(d.positive))

    } else if (view === 'totalDeaths') {
      const vis = this;

      vis.data = vis.topDeaths;
      vis.yLabel.text('Total Deaths')
      vis.xLabel.text(`Top 15 States by Covid Deaths`)

      const y = d3.scaleLinear()
      .domain([d3.min(vis.data, d => d.death) * 0.95, d3.max(vis.data, d =>  d.death)])
      .range([HEIGHT, 0])

      const x = d3.scaleBand()
        .domain(vis.data.map(d => d.state))
        .range([0, WIDTH])
        .padding(0.4)

      const xAxisCall = d3.axisBottom(x)
      vis.xAxisGroup.transition().duration(500).call(xAxisCall)

      const yAxisCall = d3.axisLeft(y)
      vis.yAxisGroup.transition().duration(500).call(yAxisCall)


      //DATA JOIN
      const rects = vis.svg.selectAll("rect")
        .data(vis.data)

      //EXIT
      rects.exit()
        .attr('height', 0)
        .attr('y', HEIGHT)
        .transition().duration(500)
        .remove()

      //UPDATE
      rects.transition().duration(500)
        .attr("x", d => x(d.state))
        .attr("y", d => y(d.death))
        .attr('width', x.bandwidth)
        .attr('height', d => HEIGHT - y(d.death))
        .attr('fill', (d, i) => {
          if (i === 0) {
            return 'red';
          } else if (i === 14) {
            return 'green';
          }
          return 'grey';
        })

      rects.enter()
        .append("rect")
        .attr("x", d => x(d.state))
        .attr('width', x.bandwidth)
        .attr('fill', 'grey')
        .attr('y', HEIGHT)
        .transition('duration', 500)
        .attr("y", d => y(d.death))
        .attr('height', d => HEIGHT - y(d.death))
    } else if (view === 'byRace') {
      const vis = this;

      vis.data = vis.raceData;
      vis.yLabel.text('Total Cases')
      vis.xLabel.text(`Cases By Race in Washington State`)

      const y = d3.scaleLinear()
      .domain([d3.min(vis.data, d => d.cases) * 0.95, d3.max(vis.data, d =>  d.cases)])
      .range([HEIGHT, 0])

      const x = d3.scaleBand()
        .domain(vis.data.map(d => d.race))
        .range([0, WIDTH])
        .padding(0.4)

      const xAxisCall = d3.axisBottom(x)
      vis.xAxisGroup.transition().duration(500).call(xAxisCall)

      const yAxisCall = d3.axisLeft(y)
      vis.yAxisGroup.transition().duration(500).call(yAxisCall)

      //DATA JOIN
      const rects = vis.svg.selectAll("rect")
        .data(vis.data)

      //EXIT
      rects.exit()
        .attr('height', 0)
        .attr('y', HEIGHT)
        .transition().duration(500)
        .remove()

      //UPDATE
      rects.transition().duration(500)
        .attr("x", d => x(d.race))
        .attr("y", d => y(d.cases))
        .attr('width', x.bandwidth)
        .attr('height', d => HEIGHT - y(d.cases))
        .attr('fill', (d, i) => {
          if (d.race === 'White') {
            return 'red';
          } else if (d.race === "Black") {
            return 'orange';
          } else if (i === 2) {
            return 'yellow';
          } else if (d.race === 'Asian') {
            return 'green';
          } else if (d.race === 'AIAN') {
            return 'blue';
          } else if (d.race === 'NHPI') {
            return 'indigo';
          } else if (d.race === 'Multiracial') {
            return 'violet';
          }
          return 'black';
        })

      rects.enter()
        .append("rect")
        .attr("x", d => x(d.race))
        .attr('width', x.bandwidth)
        .attr('y', HEIGHT)
        .transition('duration', 500)
        .attr("y", d => y(d.cases))
        .attr('height', d => HEIGHT - y(d.cases))
    }
  }

}