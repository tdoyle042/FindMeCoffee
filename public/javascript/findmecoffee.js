$(document).ready(function(){
	var mapModel = Backbone.Model.extend({
		map : null,
		coordinates: null,
		initialize : function() {
		}
	});

	var mapView = Backbone.View.extend({
		el : $(".map"),
		initialize : function() {
			this.listenTo(this.model,"change",this.render);
		},
		render : function() {
			console.log("Render!");
			if (this.model.get("coordinates")) {
				var latitude = this.model.get("coordinates").latitude;
				var longitude = this.model.get("coordinates").longitude;
				this.model.get("map").setView([latitude,longitude],16);
			}
		}
	});

	var map = L.mapbox.map('map','examples.map-9ijuk24y')
	var centralMapModel = new mapModel({"map" : map});
	var centralMapView = new mapView({model : centralMapModel});
	centralMapView.render();
	getLocation(centralMapModel)
});

function getLocation (map) {
	if (navigator.geolocation) {
    	navigator.geolocation.getCurrentPosition(function (coordinates){
    		map.set({"coordinates" : coordinates.coords});
    	});
    }
}

