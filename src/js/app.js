//Load Google Map
var map;

// Create array for all markers
var markers = [];

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


  // Add several locations to our map in an array
  // TODO: Update locations to points of interest (e.g. restaurants or apartments)
  var locations = [{
      title: 'North Loop',
      location: {
        lat: 30.318867,
        lng: -97.718588
      }
    },
    {
      title: 'Central Austin',
      location: {
        lat: 30.296171,
        lng: -97.738954
      }
    },
    {
      title: 'Downtown Austin',
      location: {
        lat: 30.272921,
        lng: -97.744386
      }
    },
    {
      title: 'East Austin',
      location: {
        lat: 30.274415,
        lng: -97.715923
      }
    },
    {
      title: 'South Lamar',
      location: {
        lat: 30.236265,
        lng: -97.782422
      }
    }
  ];

  // Style the markers a bit. This will be our listing marker icon.
  var defaultIcon = makeMarkerIcon('0091ff');
  // Create a "highlighted location" marker color for when the user
  // mouses over the marker.
  var highlightedIcon = makeMarkerIcon('ffff24');

  for (var i = 0; i < locations.length; i++) {
    // Get the position and title of the location array
    var position = locations[i].location;
    var title = locations[i].title;
    //Create a maker per position, and put markers into array
    var marker = new google.maps.Marker({
      position: position,
      title: title,
      icon: defaultIcon,
      animation: google.maps.Animation.DROP,
      id: i
    });

    // Push the markers to the array of markers
    markers.push(marker);

    // Two event listeners - one for mouseover, one for mouseout
    // to change the colors back and forth
    marker.addListener('mouseover', function() {
      this.setIcon(highlightedIcon);
    });
    marker.addListener('mouseout', function() {
      this.setIcon(defaultIcon);
    });

  }
} // end initMap


// When button is clicked, run appropriate function to show/hide listings
document.getElementById('show-listings').addEventListener('click', showListings);

/**
 * showListings - This function displays map markers at predefined locations within the boundaries of
 * the map window
 */
function showListings() {
  // In case our markers move outside boundaries of original maps location
  var bounds = new google.maps.LatLngBounds();
  // Loop through all of the locations
  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(map); // now set the map
    // Extend the boundaries of the map each marker
    bounds.extend(markers[i].position);
  }
  // Fit map to bounds
  map.fitBounds(bounds);
}


/**
 * makeMarkerIcon - This function takes in a COLOR, and then creates a new marker icon
 * of that color.  The icon will be 21 px wide and 34 high, have an origin
 * of 0,0 and be anchored at 10,34
 * @param markerColor  The color of the map marker.
 */
 // TODO: Update marker style
function makeMarkerIcon(markerColor) {
  var markerImage = new google.maps.MarkerImage(
    'http://chart.googleapis.com/chart?chst=d_map_spin&chld=1.15|0|' + markerColor + '|40|_|%E2%80%A2',
    new google.maps.Size(21, 34),
    new google.maps.Point(0, 0),
    new google.maps.Point(10, 34),
    new google.maps.Size(21, 34));
  return markerImage;
}
