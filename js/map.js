var citiesServedIn = [
	['Bogota CCM', 4.646904,-74.083574, 1, 4.487437, -75.264995],
	['Buga', 3.902272, -76.306636, 2, 4.487437, -75.264995]
];
var pathsBetweenCities = [
	new google.maps.LatLng(4.646904,-74.083574),
	new google.maps.LatLng(3.902272, -76.306636)
];

var centerPointsForArcs = [
    new google.maps.LatLng(4.487437, -75.264995)
];

function setMarkers(map, locations) {
	var image = new google.maps.MarkerImage('http://cdn-kylejaycritchlow.appspot.com/img/map-icon.png',
			// size of the marker image
			new google.maps.Size(20,20),
			// the origin for this image
			new google.maps.Point(0,0),
			// the anchor for this image
			new google.maps.Point(0,32));
	var shape = {
		coord: [1, 1, 1, 20, 20, 20, 20, 1],
		type: 'poly'
	};

	for (var i = 0; i < locations.length; i++){
		var cityServed = locations[i];
		var myLatLng = new google.maps.LatLng(cityServed[1], cityServed[2]);
		var marker = new google.maps.Marker({
			position: myLatLng,
			map: map,
			icon: image,
			shape: shape,
			title: cityServed[0],
			zIndex: cityServed[3]
		});
	}
}

function setPathBetweenCities(map, path){

	var lineSymbol = {
      path: 'M 0,-1 0,1',
      strokeOpacity: 1,
      scale: 4
	};

	var beginningSymbol = {
      path: 'M -2,0 0,-2 2,0 0,2 z',
      strokeColor: '#008000',
      fillColor: '#008000',
      fillOpacity: 1
    };

    var lineEndingSymbol = {
      path: 'M -2.5,0 0,-2.5 2.5,0',
      strokeColor: '#000',
      fillColor: '#000',
      fillOpacity: 1
      //path: google.maps.SymbolPath.CIRCLE,
      //scale: 10
    };

  var line = new google.maps.Polyline({
    path: path,
    strokeOpacity: 0,
    icons: [
      {
        icon: lineSymbol,
        offset: '0',
        repeat: '20px'
      }
      , {
        icon: beginningSymbol, //beginningSymbol,
        offset: '0%'
      }
      ,{
        icon: lineEndingSymbol,
        offset: '100%'
        //icon: {path: google.maps.SymbolPath.CIRCLE}
      }
    ],
    map: map
  });

};

function initialize() {
  var buga = new google.maps.LatLng(3.85603,-76.116435);
  var mapOptions = {
    zoom: 9,
    center: buga,
    streetViewControl: false
  }

  var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
  setMarkers(map, citiesServedIn);
  setPathBetweenCities(map, pathsBetweenCities);
  //setArcPath(map, centerPointsForArcs, pathsBetweenCities);
}

google.maps.event.addDomListener(window, 'load', initialize);