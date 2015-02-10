function Location(name, lat, lng, map){
  this.name = name;
  this.lat = lat;
  this.lng = lng;
  this.map = map;
  console.log("Location created: " + this.name);
}
Location.prototype = {
  constructor: Location,
  addMarker: function(){
    var image = new google.maps.MarkerImage('http://cdn-kylejaycritchlow.appspot.com/img/map-icon.png',
        // size of the marker image
        new google.maps.Size(20,20),
        // the origin for this image
        new google.maps.Point(0,0),
        // the anchor for this image
        new google.maps.Point(0,32)
    );
    var shape = {
      coord: [1,1,1,20,20,20,20,1],
      type: 'poly'
    };
    var myLatLng = new google.maps.LatLng(this.lat, this.lng);
    new google.maps.Marker({
      position: myLatLng,
      map: this.map,
      icon: image,
      shape: shape,
      title: this.name
    });
  },
  addPathTo: function(otherLocation){
    var path = [
      new google.maps.LatLng(this.lat, this.lng),
      new google.maps.LatLng(otherLocation.lat, otherLocation.lng)
    ];
    var lineSymbol = {
      path: 'M 0,-1 0,1',
      strokeOpacity: 1,
      scale: 3
    };
    var beginningSymbol = {
      path: 'M -2,0 0,-2 2,0 0,2 z',
      strokeColor: '#008000',
      fillColor: '#008000',
      fillOpacity: 1
    };
    var lineEndingSymbol = {
      path: 'M -1,0 0,-3 1,0',
      strokeColor: '#000',
      fillColor: '#000',
      fillOpacity: 1
    };
    new google.maps.Polyline({
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
        }
      ],
      map: this.map
    });
  }
};

function initialize() {
  var center = new google.maps.LatLng(3.912206, -75.248515);
  var mapOptions = {
    zoom: 8,
    center: center,
    streetViewControl: false
  };

  var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
  var bogotaCCM = new Location('Bogota CCM', 4.646904,-74.083574, map);
  var buga = new Location('Buga', 3.902272, -76.306636, map);
  bogotaCCM.addMarker();
  buga.addMarker();
  bogotaCCM.addPathTo(buga);
}

google.maps.event.addDomListener(window, 'load', initialize);