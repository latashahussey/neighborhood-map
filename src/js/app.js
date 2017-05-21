/* Load Google Map */
var map;

/**
 * initMap - This is the main function in our app that drives the entire application.
 * It generates the map and sets the locations
 */
function initMap() {
  // Constructor creates a new map - only center and zoom are required.
  map = new google.maps.Map(document.getElementById('map'), { // which element to use to display map
    center: { // location of the map to be centered
      lat: 30.3071816, //Austin, TX
      lng: -97.7559964
    },
    zoom: 13,
    mapTypeControl: false // disable user ability to change map type
  });
}
