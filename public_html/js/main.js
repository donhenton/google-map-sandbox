// This example requires the Geometry library. Include the libraries=geometry
// parameter when you first load the API. For example:
// <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=geometry">

var marker1, marker2;
var poly, geodesicPoly;

function initMap() {
  console.log("init map")
 
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 2,
    center: {lat: 43.036, lng: -89.390}
  });
// 43.0360176643466, -89.39013671875)
  map.controls[google.maps.ControlPosition.TOP_CENTER].push(
      document.getElementById('info'));

  marker1 = new google.maps.Marker({
    map: map,
    draggable: true,
    position: {lat: 43.036, lng: -89.390}
  });
//42.25613973999723, -89.082275390625)
  marker2 = new google.maps.Marker({
    map: map,
    draggable: true,
    position: {lat: 42.256, lng: -89.082}
  });

  var bounds = new google.maps.LatLngBounds(
      marker1.getPosition(), marker2.getPosition());
   map.fitBounds(bounds);

  google.maps.event.addListener(marker1, 'position_changed', update);
  google.maps.event.addListener(marker2, 'position_changed', update);
/*
  poly = new google.maps.Polyline({
    strokeColor: '#FF0000',
    strokeOpacity: 1.0,
    strokeWeight: 3,
    map: map,
  });

  geodesicPoly = new google.maps.Polyline({
    strokeColor: '#CC0099',
    strokeOpacity: 1.0,
    strokeWeight: 3,
    geodesic: true,
    map: map
  });
*/
  update();
}

function update() {
  var path = [marker1.getPosition(), marker2.getPosition()];
 // poly.setPath(path);
 // geodesicPoly.setPath(path);
  var heading = google.maps.geometry.spherical.computeHeading(path[0], path[1]);
  var distance = google.maps.geometry.spherical.computeDistanceBetween(path[0],path[1]);
  document.getElementById('heading').value = heading;
  document.getElementById('origin').value = path[0].toString();
  document.getElementById('destination').value = path[1].toString();
  distance = distance/1000; // now in kilometers;
  distance = distance/1.609;
  
  document.getElementById('distance').value = distance;
}

$(document).ready(function() {
  
  initMap();
  
  
})
