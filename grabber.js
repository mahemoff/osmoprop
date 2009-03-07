// needs major refactoring!
function grabIncidentStats(postcode, callback) {
  var postcodeURL = "http://www.fixmystreet.com/?pc="+postcode;
  console.log(postcodeURL);
  netscape.security.PrivilegeManager.enablePrivilege('UniversalBrowserRead');
  $.get(postcodeURL, null, function(response) {
    responseEl = document.createElement("div");
    // $(responseEl).hide();
    $("body").append(responseEl);
    responseEl.id = "fixMyStreet";
    $(responseEl).hide();
    responseEl.innerHTML = response;
    var incidents = $("#fixMyStreet #current_near li a");
    var firstIncident = incidents[incidents.length-1];
    var firstIncidentURL = "http://www.fixmystreet.com"+firstIncident.pathname;
    netscape.security.PrivilegeManager.enablePrivilege('UniversalBrowserRead');
    $.get(firstIncidentURL, null, function(incidentResponse) {
      incidentResponseEl = document.createElement("div");
      $(incidentResponseEl).hide();
      // $(incidentResponseEl).hide();
      $("body").append(incidentResponseEl);
      incidentResponseEl.id = "incident";
      incidentResponseEl.innerHTML = incidentResponse;
      // console.log("response", incidentResponse)
      var title = $("#incident #side p em").html();
      console.log("TITLE", title);
      var matches = title.match(/.*, [A-Z][a-z][a-z] (.*)\<br/);
      var theDate = matches[1];
      var firstIncidentDate = Date.parse(theDate);
      var elapsed = ((new Date()).getTime() - firstIncidentDate)/(7*24*60*60*1000);
      console.log("elapsed weeks", elapsed, "incidents", incidents.length);
      var incidentsPerWeek = neaten(incidents.length/elapsed);
      callback({
        message: incidentsPerWeek + " incidents per week",
        value: incidentsPerWeek,
        coolness: neaten(Math.min(incidentsPerWeek, 7)/7)
      });
    });
  });
}

function grabJobStats(postcode, callback) {
  console.log("job stats - postcode", postcode);
  $.getJSON("http://www.jobcentreproplus.com/search.json?postcode=" + postcode + "&callback=?&distance=1&limit=9999", function(jobs) {
    console.log("JOBS back");
    callback({
      message: jobs.length + " job postings",
      value: jobs.length,
      coolness: neaten(Math.min(jobs.length, 200)/200)
    });
  });
}

function neaten(val) {
  return (Math.floor(val*100))/100;
}
