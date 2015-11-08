var drawline = function(width, height, items, path) {
    
    var margin = {top: 40, right: 20, bottom: 30, left: 40},
    width = 300 - margin.left - margin.right,
    height = 200 - margin.top - margin.bottom;
    
    items = [
    {
        "name":"工银瑞信",
        "frequency":0.43
    },
    {
        "name":"汇添富",
        "frequency":0.38
    },
    {
        "name":"东海",
        "frequency":0.29
    },
    {
        "name":"财通",
        "frequency":0.21
    },
    {
        "name":"长信",
        "frequency":0.245
    },
    {
        "name":"东方",
        "frequency":0.234
    }
    ]
    
    var formatPercent = d3.format(".0%");
    
    var x = d3.scale.ordinal()
        .rangeRoundBands([0, width], .1);
    
    var y = d3.scale.linear()
        .range([height, 0]);
    
    var xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom");
    
    var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left")
        .tickFormat(formatPercent);
        
    var color = d3.scale.category10();
    
    var formsvg = d3.select(path).selectAll("svg").remove();
    
    var svg = d3.select(path).append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
   
    

    x.domain(items.map(function(d) { return d.name; }));
    y.domain([0, d3.max(items, function(d) { return d.frequency; })]);
    
    svg.append("g")
        .attr("class", "x axis")
        .attr("fill",color(0))
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);
    
    svg.append("g")
        .attr("class", "y axis")
        .attr("fill",color(0))
        .call(yAxis)
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .text("Frequency")
        
    
    svg.selectAll(".bar")
        .data(items)
        .enter().append("rect")
        .attr("class", "bar")
        .attr("x", function(d) { return x(d.name); })
        .attr("width", x.rangeBand()/3)
        .attr("y", function(d) { return y(d.frequency); })
        .attr("height", function(d) { return height - y(d.frequency); })
        .attr("fill",function(d,i){
			return color(i);
		})
}


var drawbubble = function(width, height, items, path) {
	width = 200
    height = 200
    var format = d3.format(",d"),
    color = d3.scale.category10();
    
    items = {
        "name": "工行",
        "children": [
        {
            "name": "工银瑞信",
            "children": [
            {
                "name": "中高级",
                "children": [
                {"name": "中银A", "size": 3938},
                {"name": "中银B", "size": 3812}
                ]
            },
            {
                "name": "东方证券",
                "children": [
                {"name": "东方红A", "size": 3534},
                {"name": "东方红B", "size": 5731}
                ]
            },
            {
                "name": "华安基金",
                "children": [
                {"name": "华安安益", "size": 7074}
                ]
            }]
        }
        ]
    }
    
    var bubble = d3.layout.pack()
        .sort(null)
        .size([width, height])
        .padding(1.5);
        
    var formsvg = d3.select(path).selectAll("svg").remove();
    var svg = d3.select(path).append("svg")
        .attr("width", width)
        .attr("height", height)
        .attr("class", "bubble");

      var node = svg.selectAll(".node")
          .data(bubble.nodes(classes(items))
          .filter(function(d) { return !d.children; }))
        .enter().append("g")
          .attr("class", "node")
          .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });

      node.append("title")
          .text(function(d) { return d.className + ": " + format(d.value); });

      node.append("circle")
          .attr("r", function(d) { return d.r; })
          .style("fill", function(d) { return color(d.packageName); });

      node.append("text")
          .attr("dy", ".3em")
          .style("text-anchor", "middle")
          .text(function(d) { return d.className.substring(0, d.r / 3); });
}

var drawpartition = function(width, height, items, path) {
	width = 200
    height = 200
    var radius = Math.min(width, height) / 2,
    color = d3.scale.category20c();
    
    items = {
        "name": "flare",
        "children": [
        {
            "name": "analytics",
            "children": [
            {
                "name": "cluster",
                "children": [
                {"name": "AgglomerativeCluster", "size": 3938},
                {"name": "CommunityStructure", "size": 3812}
                ]
            },
            {
                "name": "graph",
                "children": [
                {"name": "BetweennessCentrality", "size": 3534},
                {"name": "LinkDistance", "size": 5731},
                {"name": "SpanningTree", "size": 3416}
                ]
            },
            {
                "name": "optimization",
                "children": [
                {"name": "AspectRatioBanker", "size": 7074}
                ]
            }]
        }
        ]
    }
    
    var formsvg = d3.select(path).selectAll("svg").remove();
    
    var svg = d3.select(path).append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", "translate(" + width / 2 + "," + height * .52 + ")");

    var partition = d3.layout.partition()
        .sort(null)
        .size([2 * Math.PI, radius * radius])
        .value(function(d) { return 1; });

    var arc = d3.svg.arc()
        .startAngle(function(d) { return d.x; })
        .endAngle(function(d) { return d.x + d.dx; })
        .innerRadius(function(d) { return Math.sqrt(d.y); })
        .outerRadius(function(d) { return Math.sqrt(d.y + d.dy); });

    var path = svg.datum(items).selectAll("path")
        .data(partition.nodes)
        .enter().append("path")
        .attr("display", function(d) { return d.depth ? null : "none"; }) // hide inner ring
        .attr("d", arc)
        .style("stroke", "#fff")
        .style("fill", function(d) { return color((d.children ? d : d.parent).name); })
        .style("fill-rule", "evenodd")
        .each(stash)
        
    
    d3.selectAll("input").on("change", function change() {
        var value = this.value === "count"
            ? function() { return 1; }
            : function(d) { return d.size; };
    
        path
            .data(partition.value(value).nodes)
            .transition()
            .duration(1500)
            .attrTween("d", arcTween);
    });
}



function classes(root) {
    var classes = [];
    
    function recurse(name, node) {
        if (node.children) 
            node.children.forEach(function(child) { recurse(node.name, child); });
        else 
            classes.push({packageName: name, className: node.name, value: node.size});
    }
    
    recurse(null, root);
    return {children: classes};
}

function stash(d) {
    d.x0 = d.x;
    d.dx0 = d.dx;
}

// Interpolate the arcs in data space.
function arcTween(a) {
    var i = d3.interpolate({x: a.x0, dx: a.dx0}, a);
    return function(t) {
    var b = i(t);
    a.x0 = b.x;
    a.dx0 = b.dx;
    return arc(b);
    };
}