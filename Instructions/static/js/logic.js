// Creating map object using Los Angeles lat and lng
var myMap = L.map("map", {
    center: [0, 0],
    zoom: 2
  });

  // Adding tile layer
L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/streets-v11",
    accessToken: "pk.eyJ1IjoidHBoaWxsaXBzMjciLCJhIjoiY2tpczB1dWhvMG9jMTJycDR0eHBlMHJldSJ9.N7HFGkzJjoh2IKRo7ypu6Q"
  }).addTo(myMap);

  // Variable for endpoint API data
var quakeURL = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

//Write get request of API data from above url
//add in a bit more here to read

d3.json(quakeURL, function (json) {
  // features refers to the section in the url where magnitude (mag) is placed
    var data = json.features;
    console.log(data);
    var geoJsonLayer =   L.geoJson(data, {
      // Changing to circles 
      pointToLayer: function(feature, latlng) {
        return new L.CircleMarker(latlng, {
          radius: (feature.properties.mag)*5,
          color: 'red'
        });
      },
      // Called on each feature
      onEachFeature: function(feature, layer) {
        layer.bindPopup("<h1>" + feature.geometry.coordinates + "</h1> <hr> <h2>" + feature.properties.mag + "</h2>");
      }
    }).addTo(myMap);
});
  
  //how to change color for each location 
  // function circleFillColor(mag) {
  //   switch (true) {
  //     case 'mag > 1 ':
  //       return 'blue';
  //     case 'mag > 2':
  //       return 'red';
  //     case 'mag > 3 ':
  //         return 'yellow';
  //     case 'mag > 4':
  //         return 'purple';
  //     case 'mag > 5 ':
  //         return 'green';
  //     case 'mag > 6':
  //         return 'orange';
  //     case 'mag > 7 ':
  //         return 'brown';
  //     case 'mag > 8':
  //         return 'pink';
  //     case 'mag > 9':
  //         return 'black';
  //     default: 
  //       return 'white'
  //   };
  // }

//   function style(feature) {
//     return {
//         fillColor: getColor(feature.properties.mag),
//         weight: 2,
//         opacity: 1,
//         color: 'white',
//         dashArray: '3',
//         fillOpacity: 0.7
//     };
// }

// .addTo(mymap);


    //add legend
  var legend = L.control({position: 'bottomright'});

  legend.onAdd = function () {
    
  var div = L.DomUtil.create('div', 'info legend'),
    magnitude = [0, 1, 2, 3, 4, 5, 6, 7 , 8, 9];
            //labels = [];
    
        // loop through our density intervals and generate a label with a colored square for each interval
  for (var i = 0; i < magnitude.length; i++) {
    div.innerHTML +=
    '<i style="background:' + getColor(magnitude[i] + 1) + '"></i> ' +
    magnitude[i] + (magnitude[i + 1] ? '&ndash;' + magnitude[i + 1] + '<br>' : '+');
  }
    
      return div;
    };
    
    legend.addTo(map);
