(function($) {

displayRating = function(query, container) {
	console.log("dR", query);
	var _callback = function(postcode) {
		console.log("_dR", postcode);
		getRating(postcode, container, displayGraph);
	};
	resolvePostCode(query, _callback);
};

var getRating = function(postcode, container, callback) {
	console.log("gR", postcode);
	var _callback = function(data) {
		console.log("_gR", data);
		//var rating = data.value;
		var rating = data.coolness;
		displayGraph(rating, container);
	};
	grabIncidentStats(postcode, _callback);
};

var displayGraph = function(rating, container) {
	rating = Math.round(rating * 100);
	console.log("dG", rating);
	$('<div style="height: 100px; width: 100px; background-color: #AAA;" />').appendTo(container).sparkline([rating, 100, 100, 66, 33], {
		type: "bullet"
	});
};

})(jQuery);
