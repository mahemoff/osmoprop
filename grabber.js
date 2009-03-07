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
      var incidentsPerWeek = incidents.length/elapsed;
      callback({
        message: incidentsPerWeek + " incidents per week",
        value: incidentsPerWeek,
        coolness: Math.max(incidentsPerWeek, 7)/7
      });
    });
  });
}
