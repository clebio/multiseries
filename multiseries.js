d3.tsv("data.tsv", function (d) {
    var series = d3.keys(d[0]).filter(function(key) { return key !== "date"; });
    var colors = d3.scale.category10();
    colors.domain(series);

    var margin = {top: 0, right: 0, bottom: 0, left: 0},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;
    
    var fmt = d3.time.format("%Y%m%d");
    var x0 = fmt.parse(d[0]['date']);
    d.forEach(function(o) { o.date = fmt.parse(o.date) - x0; });

    var dataSets = series.map(function(s) {
	d.forEach(function(o) { o['s'] = s; } );
	return {
	    color: colors(s),
	    data: d.map(function(e) {
		return { x: parseInt(e.date), y: parseFloat(e[e.s]) };
	    })
	};
    });
    
    var graph = new Rickshaw.Graph( {
	element: document.querySelector("#chart"), 
	renderer: 'line',
	width: width, 
	height: height, 
	series: dataSets
    });

    graph.render();
});
