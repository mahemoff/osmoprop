$(function() {
  $("button").click(function() {
    grabIncidentStats($("#postcode").val(), function(stats) {
      $("#incidentStats").html(stats.message + "<br/>"
        + "Raw Value: " + stats.value
        + " (Coolness Factor: " + stats.coolness + ")");
    });
    grabJobStats($("#postcode").val(), function(stats) {
      $("#jobStats").html(stats.message + "<br/>"
        + "Raw Value: " + stats.value
        + " (Coolness Factor: " + stats.coolness + ")");
    });
  });
});

