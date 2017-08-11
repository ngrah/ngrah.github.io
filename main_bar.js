 var myEntireData;

            var myData_map;
            var myData_bar;


            var myPaths;


            var margin_bar = {top: 10, right: 10, bottom: 30, left: 150};
            var svgWidth_bar = 600 - margin_bar.left - margin_bar.right;
            var svgHeight_bar = 300 - margin_bar.top - margin_bar.bottom;


            function makeCivBar()
            {
              d3.json("jsonFiles/civillian_industry_bar.json", function(data)
              {

                myEntireData = data;
                console.log(JSON.stringify(myEntireData));

                // set dimensions for both svgs
                d3.select("#svg_bar")
                            .attr("width", svgWidth_bar + margin_bar.left + margin_bar.right)
                            .attr("height", svgHeight_bar + margin_bar.top + margin_bar.bottom)
                            .append("g")
                            .attr("id", "svg_bar_g_id")
                            .attr("transform", "translate(" + margin_bar.left + "," + margin_bar.top + ")");

            
                removeBarChart();
                generateDataBar(null);
                createBarChart();
              });
            }



            function makeConBar()
            {
              d3.json("jsonFiles/consulting_industry_bar.json", function(data)
              {

                myEntireData = data;
                console.log(JSON.stringify(myEntireData));

                // set dimensions for both svgs
                d3.select("#svg_bar")
                            .attr("width", svgWidth_bar + margin_bar.left + margin_bar.right)
                            .attr("height", svgHeight_bar + margin_bar.top + margin_bar.bottom)
                            .append("g")
                            .attr("id", "svg_bar_g_id")
                            .attr("transform", "translate(" + margin_bar.left + "," + margin_bar.top + ")");

            
                removeBarChart();
                generateDataBar(null);
                createBarChart();
              });
            }


             function generateDataBar(myState)
            {
                            


          myData_bar = d3.nest()
                            .key(function(d) { return d.name;})
                            .rollup(function(d) {
                              return d3.sum(d, function(g) {return g.size; });})
                            .entries(myEntireData.children)

                            //d3.key = function(d) {return d.children.name}
                            //d3.value = function(g) {return d.children.size}
                            //console.log(JSON.stringify(myData_bar));
                             console.log(JSON.stringify(myEntireData.children));
                             console.log(myData_bar);
                             //console.log(JSON.stringify(myData_bar));


              
              // datum = { key : Year, value : sum(Losses) }
            }


            function createBarChart() {

              var svg = d3.select("#svg_bar_g_id");

              // generate scales
              // var xScale = d3.scaleLinear()
              //   .domain([0, d3.max(myData_bar, function(d) { return d.value; })])
              //   .range([0, svgWidth_bar]);

              // var yScale = d3.scaleBand()
              //   .domain(myData_bar.map( function(d) { return d.key; } ))
              //   .range([svgHeight_bar, 0])
              //   .paddingInner(0.05);

               var tip = d3.tip()
              .attr("class", "d3-tip")
              .attr("id", "the_toolTip")
              .html(function(d) {
                return d.key + "    Size:" + d.value
                /*
                return "<strong>Name:</strong> <span style='color:red'>" + d.data.name + "</span>" + "<br>" +
                    "<strong>Size:</strong> <span style='color:red'>" + d.data.size + "</span>" + "<br>" + //br is the newline tag
                        "<strong>Avg Mos Service:</strong> <span style='color:red'>" + d.data.mos + "</span>";
                */
              });
  svg.call(tip);




              var xScale = d3.scaleBand()
                                    .domain(myData_bar.map( function(d)
                                      { return d.key;
                                      }))
                                    .range([0, svgWidth_bar])
                                    .paddingInner(0.05);

              var yScale = d3.scaleLinear()
                                    .domain([0, d3.max(myData_bar, function(d) { return d.value; })])
                                    .range([svgHeight_bar, 0]);

              // generate axis
              svg.append("g")
                  .attr("transform", "translate(0," + (svgHeight_bar) + ")")
                  .call(d3.axisBottom(xScale));

              svg.append("g")
                  // .attr("transform", "translate(" + 100 + ",0)")
                  .call(d3.axisLeft(yScale));

              // generate bars
              svg.selectAll("rect_bar")
                  .data(myData_bar)
                  .enter()
                  .append("rect")
                  .attr("x", function(d, i)
                    {
                       return xScale(d.key);
                    })
                  .attr("y", function(d, i)
                    {
                      return yScale(d.value);
                    })
                  .attr("height", function(d, i)
                    {
                      return svgHeight_bar-yScale(d.value);
                    })
                  .attr("width", function(d, i)
                    {
                      return xScale.bandwidth();
                    })
                  .attr("class", "myrect_bar")
                  .on("mouseover", tip.show)
                  .on("mouseout", tip.hide)
                  .on("click", function(d){
                    console.log(d.key);
                    changeTree(d.key);
                  } 
                  );

                  

            }

            function removeBarChart() {
              var svg = d3.select("#svg_bar_g_id");
              svg.selectAll("rect").remove();
              svg.selectAll("g").remove();
              //svg.selectAll("text").remove();
            }
            function changeTree(input) {
              console.log(input);
              if (input == "USAFA" || input == "USAF") {
                loadUSAirForce();
                var t = document.getElementById('treeMap_title')
                t.innerHTML='Air Force';
              }
              if (input=="USNavyA" || input == "US_Navy") {
                loadUSNavy();
                var t = document.getElementById('treeMap_title')
                t.innerHTML='Navy';

              }
              if (input == "USMA" || input == "US_Army") {
                  loadUSArmy();
                  var t = document.getElementById("treeMap_title")
                t.innerHTML='Army';
              }
              if (input == "USCGA" || input == "USCG") {
                loadUSCoastGuard();
                var t = document.getElementById('treeMap_title')
                t.innerHTML='Coast Guard';
              }
              

            }