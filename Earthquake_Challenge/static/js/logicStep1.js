console.log("roll out");

// // Create the map object with center and zoom level.
// let map = L.map('mapid').setView([30, 30], 2);

// // Add GeoJSON data.
// let sanFranAirport =
// {"type":"FeatureCollection","features":[{
//     "type":"Feature",
//     "properties":{
//         "id":"3469",
//         "name":"San Francisco International Airport",
//         "city":"San Francisco",
//         "country":"United States",
//         "faa":"SFO",
//         "icao":"KSFO",
//         "alt":"14",
//         "tz-offset":"-8",
//         "dst":"A",
//         "tz":"America/Los_Angeles"},
//         "geometry":{
//             "type":"Point",
//             "coordinates":[-122.375,37.61899948120117]}}
// ]};

// // Grabbing our GeoJSON data.
// L.geoJSON(sanFranAirport, {
//     // We turn each feature into a marker on the map.
//     onEachFeature: function(feature, layer) {
//       console.log(layer);
//       layer.bindPopup('<h2>' + 'Airport code: ' + layer.feature.properties.faa + '</h2>' + 
//       '<h3>' + 'Airport name: ' + layer.feature.properties.name + '</h3>'
//       );
//     }

//   }).addTo(map);

// We create the tile layer that will be the background of our map.
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

// We create the dark view tile layer that will be an option for our map.
let sats = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

// Create a base layer that holds both maps.
let baseMaps = {
    'Streets': streets,
    'Satellite': sats
  };

// Create the map object with center, zoom level and default layer.
let map = L.map('mapid', {
    center: [39.5, -98.5],
    zoom: 3,
    layers: [streets]
});

// Pass our map layers into our layers control and add the layers control to the map.
L.control.layers(baseMaps).addTo(map);

let quakes = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson';

// Create a style for the lines.
let streetStyle = {
    color: "blue",
    weight: 1,
    fillColor: 'yellow'
}
let satStyle = {
    color: "white",
    weight: 1,
    fillColor: 'orange'
}

let myStyle = streetStyle

// Grabbing our GeoJSON data.
d3.json(quakes).then(function(data) {
    console.log(data);
  // Creating a GeoJSON layer with the retrieved data.
  var geoJSON = L.geoJSON(data, {
    //style: myStyle,
    onEachFeature: function(feature, layer) {
        console.log(layer);
        // layer.bindPopup('<h3>' + 'Neighborhood: ' + layer.feature.properties.AREA_NAME + '</h3>'
        // );
    }
  }).addTo(map);

  // changing style for each map layer

//   streets.on('add', function(e) {
//     console.log('switched to sat');
//     geoJSON.eachLayer(function(layer) {
//         layer.setStyle(streetStyle);
//     });
//     });

//   sats.on('add', function(e) {
//     console.log('switched to sat');
//     geoJSON.eachLayer(function(layer) {
//         layer.setStyle(satStyle);
//     });
//     });

});