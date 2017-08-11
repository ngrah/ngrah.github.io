//a treemap will always have been generated before anything here is ever called - it defaults to Consultants, USNavy Employer.
function createTreeMap_Civilians()
{
  //svg is defined in the body so its all good.
  //dont actually know if this will ever not exist - on every loading of data the wiping of the svg should happen.
  if(document.getElementById("the_treeMap") == null)
  {
    var svg = d3.select("body")
                .append("svg")
                .attr("width", svgWidth)
                .attr("height", svgHeight)
                .attr("id", "the_treeMap");
  }
  else
  {
    var svg = d3.select("#the_treeMap");
  }
  var treemap = d3.treemap()
                  .tile(d3.treemapResquarify)
                  .size([svgWidth, svgHeight])
                  .round(true)
                  .padding(1);
  
  var tip = d3.tip()
              .attr("class", "d3-tip")
              .attr("id", "the_toolTip")
              .html(function(d) {
              /*	return "Industry: " + d.data.name + "" + d.parent.data.count2    */
              
                if (d.parent.parent != null) {
                  return "<strong>Name: </strong> <span style='color:red'>" + d.data.name + "</span>" + "<br>" +
                    "<strong>Group: </strong> <span style='color:red'>" + d.parent.data.name + "</span>" + "<br>" +
                    "<strong>Size: </strong> <span style='color:red'>" + d.data.size + "</span>" + "<br>" + //br is the newline tag
                        "<strong>Avg Mos Service: </strong> <span style='color:red'>" + d3.format(".0f")(d.data.mos) + "</span>";
                }
                else if (d.parent.parent == null){
                 return "<strong>Name: </strong> <span style='color:red'>" + d.data.name + "</span>" + "<br>" +
                    "<strong>Size: </strong> <span style='color:red'>" + d.data.size + "</span>" ;//br is the newline tag
                }
              });
  svg.call(tip);


  //this is some black magic, gotta figure out what this means
  //apparently must re-do the root every time to disambiguate between size, avg mos, etc
  //like we can call .mos or .size, depending on the id in the JSON file
  //give it an id here, in the eachBefore method
  //dont know what sum or sort does in this case, sort probably arranges the items in size order

  //the syntax (...) ? (..) : (...) is an if/then/else statement
  //ie -       (if)  ? (then) : (else)
  //should replace it with a true if{} else{}
  var root = d3.hierarchy(myData)
             	 .eachBefore(function(d) { d.data.id = (d.parent ? d.parent.data.id + "." : "") + d.data.name; })
            	 .sum(function(d) { return d.size; })
            	 .sort(function(a, b) { return b.size - a.size; });;


  //console.log(root);
  treemap(root);
  //console.log(treemap);

  //define the generic cell element "g", then append other stuff like "rect" or "text" to it
  var cell = svg.selectAll("g")
                .data(root.leaves())
                .enter()
                .append("g");

  //Add the rectangles
  cell.append("rect")
      .attr("id", function(d) { return d.data.id; })
      .attr("x", function(d) { return d.x0; })
      .attr("y", function(d) { return d.y0; })
      .attr("width", function(d) { return d.x1 - d.x0; })
      .attr("height", function(d) { return d.y1 - d.y0; })
      .attr("fill", function(d) {
      					//check if were coloring by parent name or by regular name
      					if(colorByParent) { return d.children ? null : color(d.parent.data.name); }
      					else { return color(d.data.name); }
      					 })
      .attr("class", "myrect")
      .on("mouseover", tip.show)
      .on("mouseout", tip.hide);



  //need different text for the multi-section treemap vs the regular one
  /*cell.append("text")
  	  .text(function(d) { return d.data.acronym; })
      .style("font-size", function(d) { return Math.min(30, (d.x1 - d.x0) / 3); })
      .attr("dy", ".35em")
      .attr("clip-path", function(d) { return "url(#clip-" + d.data.id + ")"; })
      .attr("class", "text")
      .attr("x", function(d) { return d.x0; })
      .attr("y", function(d) { return (d.y1 + d.y0)/2; });
*/
  //need to add clipping or a summary ID to the cells, so they dont have massive text.
  //console.log(cell);
  d3.select("#size_label").text("Total Size: " + myData.count);
}



