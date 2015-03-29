var    w = 1800	;
var    h = 850;
var    pad = 40;
var    left_pad = 100;
var    Data_url = '/SessionOutput.json';
    
var svg = d3.select("#punchcard")
        .append("svg")
        .attr("width", w)
        .attr("height", h);
        

    
     
     $.ajaxSetup({
        async: false
    });
    //var color_20c = d3.scale.category20c();
	var x_axis_ticks=22;
d3.json('SessionOutput.json', function (punchcard_data) {
	var x = d3.scale.linear().domain([0,x_axis_ticks]).range([left_pad, w-pad]),
        y = d3.scale.linear().domain([punchcard_data.length	,0]).range([pad, h-pad*2]);
	 
	 var sessions=[];
	 $.each( punchcard_data, function( playerIndex, player ) {
	   sessions.push("user "+playerIndex);
     });
        var xAxis = d3.svg.axis().scale(x).orient("bottom")
		.ticks(x_axis_ticks*1.5)



        yAxis = d3.svg.axis().scale(y).orient("left")
        .ticks(punchcard_data.length)
        .tickFormat(function (d, i) {
            return sessions[d];
        });
        
     svg.append("g")
    .attr("class", "axis")
    .attr("transform", "translate(0, "+(h-pad)+")")
    .call(xAxis);
	
 
     svg.append("g")
    .attr("class", "axis")
    .attr("transform", "translate("+(left_pad-pad)+", 0)")
    .call(yAxis);


svg.append("text")
        .attr("fill", "#414241")
        .attr("text-anchor", "end")
        .attr("x", w /2 )
        .attr("y", h-1)
        .text("Time (sec)");	
    
    svg.append("text")
    .attr("class", "loading")
    .text("Loading ...")
    .attr("x", function () { return w/2; })
    .attr("y", function () { return h/2-5; });
	
 
var session_data = [];
	$.each( punchcard_data, function( playerIndex, player ) {
		
	       $.each( player.SessionData, function( sessionIndex, val ) {
			var rotation;
			var color_fill;
			
			 switch (val.direction) {
				  case "UP":
                      if (val.intensity >= 4 && val.intensity<=5.5 ) {
                        color_fill="#fdae6b";
                      } else if (val.intensity > 5 && val.intensity<=7 ) {
                        color_fill="#fd8d3c";
                      } else if (val.intensity > 7 && val.intensity<=9 ){
                        color_fill="#e6550d";
                      }
                        else if (val.intensity > 9 ){
                        color_fill="#d62728";
                      } 
					  rotation="";
					break;
				  case "DOWN":
				  if (val.intensity <= -4 && val.intensity>=-5.5 ) {
                        color_fill="#fdae6b";
                      } else if (val.intensity < -5 && val.intensity>=-7 ) {
                        color_fill="#fd8d3c";
                      } else if (val.intensity < -7 && val.intensity>=-9 ){
                        color_fill="#e6550d";
                      }
                        else if (val.intensity < -9 ){
                        color_fill="#d62728";
                      } 
					rotation="rotate(-180)"; 
					break;
				  case "LEFT":
				       if (val.intensity >= 4 && val.intensity<=5.5 ) {
                        color_fill="#fdae6b";
                      } else if (val.intensity > 5 && val.intensity<=7 ) {
                        color_fill="#fd8d3c";
                      } else if (val.intensity > 7 && val.intensity<=9 ){
                        color_fill="#e6550d";
                      }
                        else if (val.intensity > 9 ){
                        color_fill="#d62728";
                      } 

					rotation="rotate(-90)"; 
					break;
				  case "RIGHT":
				  if (val.intensity <= -4 && val.intensity>=-5.5 ) {
                        color_fill="#fdae6b";
                      } else if (val.intensity < -5 && val.intensity>=-7 ) {
                        color_fill="#fd8d3c";
                      } else if (val.intensity < -7 && val.intensity>=-9 ){
                        color_fill="#e6550d";
                      }
                        else if (val.intensity < -9 ){
                        color_fill="#d62728";
                      } 
					rotation="rotate(90)"; 
					break;
				}
			session_data.push({
					x: val.time,
					y:playerIndex,
					direction:rotation,
					color_fill:color_fill
					
				});

			
			});
	});
	
	
 svg.selectAll(".loading").remove(); 
       svg.selectAll(".point")
      .data(session_data)
      .enter()
      .append("path")
      .attr("class", "point")
      .attr("transform", "translate(0,0)")
      .transition()
      .duration(1000)
      .attr("d", d3.svg.symbol().type("triangle-up"))
      .style("fill", function(d) { return d.color_fill; })
      .attr("transform", function(d) {return "translate(" + x(d.x) + "," + y(d.y) +") "+d.direction; });	
         
      
      
      //.attr("transform", function(d) { 
			//return "translate(" + x(d.x) + "," + y(d.y) + ")"; });	
	

 });
      $.ajaxSetup({
        async: true
    });


