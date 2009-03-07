(function($) {

resolvePostCode = function(query, callback) {
	var uriTemplate = "http://maps.google.com/maps/geo?q=%0&output=%1&oe=utf8&key=%2&callback=?"; // TODO: use Google Local Search?
	var format = "json";
	var key = "ABQIAAAAiES7eSQ0fgEdOg5320FTVhRIO2r3bGlKFP3hqP-1q0XwBHBFMRQJ4gVR6vXX3sN4RdadK8N9jRyA8A";
	var uri = uriTemplate.replace("%0", query).replace("%1", format).replace("%2", key);
	var _callback = function(data, textStatus) {
		resolvePostCodeCallback(data, callback);
	};
	$.getJSON(uri, null, _callback);
};

var resolvePostCodeCallback = function(data, callback) {
	try {
		var postcode = data.Placemark[0].
			AddressDetails.Country.AdministrativeArea.SubAdministrativeArea.
			Locality.PostalCode.PostalCodeNumber; // TODO: find PostalCodeNumber in object
		while(postcode.length < 7) { // Google strips last two chars -- XXX: hacky!?
			postcode += "A";
		}
	} catch(ex) {
		postcode = null;
	}
	callback(postcode);
};

})(jQuery);
