import * as d3 from 'd3';

const MARGIN = { TOP: 10, BOTTOM: 50, LEFT: 70, RIGHT: 10 }
const WIDTH = 800 - MARGIN.LEFT - MARGIN.RIGHT;
const HEIGHT = 500 - MARGIN.TOP - MARGIN.BOTTOM;

export default class D3Chart {
  constructor(props) {
    const vis = this
    vis.svg = d3.select(props)
      .append("svg")
      .append("g")

    vis.svg.append("g")
      .attr("class", "slices");
    vis.svg.append("g")
      .attr("class", "labels");
    vis.svg.append("g")
      .attr("class", "lines");

    var width = 960,
        height = 450,
        radius = Math.min(width, height) / 2;

    var pie = d3.pie()
      .sort(null)
      .value(function(d) {
        return d.value;
      });

    var arc = d3.arc()
      .outerRadius(radius * 0.8)
      .innerRadius(radius * 0.4);

    var outerArc = d3.arc()
      .innerRadius(radius * 0.9)
      .outerRadius(radius * 0.9);

    svg.attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

    var key = function(d){ return d.data.label; };

    var color = d3.scaleOrdinal()
      .domain(["Lorem ipsum", "dolor sit", "amet", "consectetur", "adipisicing", "elit", "sed", "do", "eiusmod", "tempor", "incididunt"])
      .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);

    function randomData (){
      var labels = color.domain();
      return labels.map(function(label){
        return { label: label, value: Math.random() }
      });
    }

    this.change(randomData());

    d3.select(".randomize")
      .on("click", function(){
        this.change(randomData());
      });
  }

  change(gender) {

    var slice = svg.select(".slices").selectAll("path.slice")
      .data(this.pie(gender), this.key);

    slice.enter()
      .insert("path")
      .style("fill", function(d) { return this.color(d.data.label); })
      .attr("class", "slice");

    slice
      .transition().duration(1000)
      .attrTween("d", function(d) {
        this._current = this._current || d;
        var interpolate = d3.interpolate(this._current, d);
        this._current = interpolate(0);
        return function(t) {
          return this.arc(interpolate(t));
        };
      })

    slice.exit()
      .remove();

    /* ------- TEXT LABELS -------*/

    var text = svg.select(".labels").selectAll("text")
      .data(this.pie(gender), this.key);

    text.enter()
      .append("text")
      .attr("dy", ".35em")
      .text(function(d) {
        return d.data.label;
      });

    function midAngle(d){
      return d.startAngle + (d.endAngle - d.startAngle)/2;
    }

    text.transition().duration(1000)
      .attrTween("transform", function(d) {
        this._current = this._current || d;
        var interpolate = d3.interpolate(this._current, d);
        this._current = interpolate(0);
        return function(t) {
          var d2 = interpolate(t);
          var pos = this.outerArc.centroid(d2);
          pos[0] = this.radius * (midAngle(d2) < Math.PI ? 1 : -1);
          return "translate("+ pos +")";
        };
      })
      .styleTween("text-anchor", function(d){
        this._current = this._current || d;
        var interpolate = d3.interpolate(this._current, d);
        this._current = interpolate(0);
        return function(t) {
          var d2 = interpolate(t);
          return midAngle(d2) < Math.PI ? "start":"end";
        };
      });

    text.exit()
      .remove();

    /* ------- SLICE TO TEXT POLYLINES -------*/

    var polyline = svg.select(".lines").selectAll("polyline")
      .data(this.pie(gender), this.key);

    polyline.enter()
      .append("polyline");

    polyline.transition().duration(1000)
      .attrTween("points", function(d){
        this._current = this._current || d;
        var interpolate = d3.interpolate(this._current, d);
        this._current = interpolate(0);
        return function(t) {
          var d2 = interpolate(t);
          var pos = this.outerArc.centroid(d2);
          pos[0] = this.radius * 0.95 * (midAngle(d2) < Math.PI ? 1 : -1);
          return [this.arc.centroid(d2), this.outerArc.centroid(d2), pos];
        };
      });

    polyline.exit()
      .remove();
  };
}

//possibly refactor into functional and then do this.prototype.update instead