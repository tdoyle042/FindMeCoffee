$(document).ready(function(){
	var mapModel = Backbone.Model.extend({
		map : null,
		initialize : function(map) {
			this.map = map;
		}
	});

	var mapView = Backbone.View.extend({
		el : $(".map"),
		model : null,
		initialize : function() {
			this.model = new mapModel(L.mapbox.map('map','examples.map-9ijuk24y'));
			console.log(this.model);
			// this.myMap.setView([40, -74.50], 9);
		},
		refocusMap : function(coordinates) {
			console.log("Got: ", coordinates);
			console.log(this.model);
			// this.myMap.setView([coordinates.coords.latitude,coordinates.coords.longitude],9);
		},
		render : function() {
		}
	});

	var centralMap = new mapView();
	getLocation(centralMap)
});

function getLocation (map) {
	if (navigator.geolocation) {
    	navigator.geolocation.getCurrentPosition(map.refocusMap);
    }
}

