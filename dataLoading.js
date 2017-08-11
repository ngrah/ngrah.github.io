// all tooltip shit comes from the free d3-tip.js file and this example
// http://bl.ocks.org/davegotz/bd54b56723c154d25eedde6504d30ad7
var myData;
var margin = {top: 10, right: 10, bottom: 30, left: 100};
var currentBranch;
/*
var svgWidth = 800 - margin.left - margin.right;
var svgHeight = 500 - margin.top - margin.bottom;
*/
var svgWidth = 800 - margin.left - margin.right;
var svgHeight = 500 - margin.top - margin.bottom;

//can define fader as a thing also.
var color = d3.scaleOrdinal(d3.schemeCategory10);
//
//I think the idea is to have a bunch of loadData methods - one for each JSON file. Then just wipe shit and call createTreeMap
//naming conventions - (Branch)_(Consulting or LinkedIn)_(Employer, Industry, SizeCompany, Function).json

//basically all the JSON files have a common namihg scheme as described above. The string will be generated based on what the user selects
//Right now its just a bunch of buttons, but later on it'll be based on where he clicks
var consultingTag = "Consult";
var civilianTag = "Civilian";

var employerTag = "Employer";
var industryTag = "Industry";
var functionTag = "Function";
var sizeCompanyTag = "sizeCompany";

var airForceTag = "AF";
var armyTag = "Army";
var navyTag = "Navy";
var marineCorpsTag = "MC";
var coastGuardTag = "CG";
var militaryTag = "M";

var academyFlag = false;

var colorByParent = false;

var categoryToColorBy = industryTag; //variable to hold what category the user wants to look at

var currCategoryTag; //variable to hold whichever flag is chosen

 var preFolderString = "";

//called immediatley after data loading
function firstCall()
{
  loadUSNavy();
}

//function to make the fileName of the JSON file based on what the user has specified
function makeFileName(branchTag, sourceTag, categoryTag, academyFlag)
{
  colorByParent = false;
  if(categoryTag == industryTag) {colorByParent = true;}
  if(academyFlag)
  {
    return "US" + branchTag + "A" + "_" + sourceTag + "_" + categoryTag + ".json";
  }
  else
  {
    return "US" + branchTag  + "_" + sourceTag + "_" + categoryTag + ".json";
  }
}

//function to change the category tag to have what the user specifies be loaded.
function changeDisplayCategory()
{
  if(document.getElementById('CiviliansBtn').checked)
  {
    if(document.getElementById('civFunctionBtn').checked)
    {
      categoryToColorBy = functionTag;
    }
    if(document.getElementById('civIndustryBtn').checked)
    {
      categoryToColorBy = industryTag;
    }
    if(document.getElementById('civSizeCompanyBtn').checked)
    {
      categoryToColorBy = sizeCompanyTag;
    }
  }

  if(document.getElementById('ConsultantsBtn').checked)
  {
    if(document.getElementById('consEmplyerBtn').checked)
    {
      categoryToColorBy = employerTag;
    }
    if(document.getElementById('consIndustryBtn').checked)
    {
      categoryToColorBy = industryTag;
    }
  }
  //document.getElementById("USNavyBtn").checked = true;
  loadUSNavy();
}

//functions to change between civilians data and consultants data
function changeToCivilians()
{
  academyFlag = true;
  //document.getElementById("USNavyBtn").checked = true;
  changeDisplayCategory();
  loadUSNavy();
  makeCivBar();
}
function changeToConsultants()
{
  academyFlag = false;
 // document.getElementById("USNavyBtn").checked = true;
  changeDisplayCategory();
  loadUSNavy();
  makeConBar();
}

//Functions that load the data actual data. One of these is called on any change. They all look the same except different file names
function loadUSNavy()
{
  removeTreeMap();
  if(document.getElementById("CiviliansBtn").checked == true)
  {
    d3.json(preFolderString + "jsonFiles/" + makeFileName(navyTag, civilianTag, categoryToColorBy, academyFlag), function(data)
    {
      //console.log(makeFileName(navyTag, civilianTag, industryTag, academyFlag));
      myData = data
      //console.log(myData);
      createTreeMap_Civilians();
    });
  }
  else if(document.getElementById("ConsultantsBtn").checked == true)
  {
    d3.json(preFolderString + "jsonFiles/" + makeFileName(navyTag, consultingTag, categoryToColorBy, academyFlag), function(data)
    {
      myData = data
      //console.log(myData);
      createTreeMap_Consultants();
    });
  }
  else
  {
    console.log("fuk");
  }
}
function loadUSAirForce()
{
  removeTreeMap();
  if(document.getElementById("CiviliansBtn").checked == true)
  {
    d3.json(preFolderString + "jsonFiles/" + makeFileName(airForceTag, civilianTag, categoryToColorBy, academyFlag), function(data)
    {
      myData = data
      //console.log(myData);
      createTreeMap_Civilians();
    });
  }
  else if(document.getElementById("ConsultantsBtn").checked == true)
  {
    d3.json(preFolderString + "jsonFiles/" + makeFileName(airForceTag, consultingTag, categoryToColorBy, academyFlag), function(data)
    {
      myData = data
      //console.log(myData);
      createTreeMap_Consultants();
    });
  }
  else
  {
    console.log("fuk");
  }
}
//maybe we shold lump the USMA and USArmy_Consultants into the same button
function loadUSArmy()
{
  removeTreeMap();
  if(document.getElementById("CiviliansBtn").checked == true)
  {
    d3.json(preFolderString + "jsonFiles/" + makeFileName(militaryTag, civilianTag, categoryToColorBy, academyFlag), function(data)
    {
      myData = data
      //console.log(myData);
      createTreeMap_Civilians();
    });
  }
  else if(document.getElementById("ConsultantsBtn").checked == true)
  {
    d3.json(preFolderString + "jsonFiles/" + makeFileName(armyTag, consultingTag, categoryToColorBy, academyFlag), function(data)
    {
      myData = data
      //console.log(myData);
      createTreeMap_Consultants();
    });
  }
  else
  {
    console.log("fuk");
  }
}
function loadUSCoastGuard()
{
  removeTreeMap();
  if(document.getElementById("CiviliansBtn").checked == true)
  {
    d3.json(preFolderString + "jsonFiles/" + makeFileName(coastGuardTag, civilianTag, categoryToColorBy, academyFlag), function(data)
    {
      myData = data
      //console.log(myData);
      createTreeMap_Civilians();
    });
  }
  else if(document.getElementById("ConsultantsBtn").checked == true)
  {
    d3.json(preFolderString + "jsonFiles/" + makeFileName(coastGuardTag, consultingTag, categoryToColorBy, academyFlag), function(data)
    {
      myData = data
      //console.log(myData);
      createTreeMap_Consultants();
    });
  }
  else
  {
    console.log("fuk");
  }
}

//We should get rid of the USMC data altogether. Its minimal.
//I've taken out the option to select USMC but left this in just to have it around
function loadUSMarineCorps()
{
  removeTreeMap();
  if(document.getElementById("CiviliansBtn").checked == true)
  {
    //theres only 4 things here
    loadNoData();
  }
  else if(document.getElementById("ConsultantsBtn").checked == true)
  {
    loadNoData();
    /*
    d3.json(preFolderString + "jsonFiles/" + makeFileName(marineCorpsTag, consultingTag, industryTag, academyFlag), function(data)
    {
      myData = data
      console.log(makeFileName(marineCorpsTag, consultingTag, industryTag, academyFlag));
      console.log(myData);
      createTreeMap_Consultants();
    });
    */
  }
  else
  {
    console.log("fuk");
  }
}

//
function loadNoData()
{
  //for some reason this doesnt work all the time. but we shouldnt ever need to use it
  removeTreeMap()
  d3.json(preFolderString + "jsonFiles/noData.json", function(data)
  {
    myData = data
    //console.log(myData);
    createTreeMap_Consultants();
  });
}

//Function to remove the treemap and tooltips for whenever we change around the stuff
function removeTreeMap() {
  d3.select("#the_treeMap").remove();
  d3.select("#the_toolTip").remove();
}

window.onload = firstCall();