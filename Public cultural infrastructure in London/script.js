// The value for 'accessToken' begins with 'pk...'
mapboxgl.accessToken = "pk.eyJ1IjoiMjc0NzI0NGMiLCJhIjoiY2xjcDhpdjFsMDJmbTN2bzRmeHRsdWg2eSJ9.TBzsgc_mF3JitNmp1x1s8Q";


//button
const toggleButton3 = "mapbox://styles/2747244c/clduswdhq000p01pa3raewb1i";
const toggleButton4 = "mapbox://styles/2747244c/cldm1l9re000g01p4i8etfwsj";
const toggleButton5 = "mapbox://styles/2747244c/cldm1sch3005101t9j55saqyd";
const toggleButton6 = "mapbox://styles/2747244c/cldus6tmc000601rytm6w6887";

const map = new mapboxgl.Map({
  container: "map", // container ID
  style: toggleButton3,
  center: [-0.089932, 51.484441],
  zoom: 10
});

const layerList = document.getElementById("menu");
const inputs = layerList.getElementsByTagName("input");

//On click the radio button, toggle the style of the map.
for (const input of inputs) {
  input.onclick = (layer) => {
    if (layer.target.id == "toggleButton3") {
      map.setStyle(toggleButton3);
    }
    if (layer.target.id == "toggleButton4") {
      map.setStyle(toggleButton4);
    }
    if (layer.target.id == "toggleButton5") {
      map.setStyle(toggleButton5);
    }
    if (layer.target.id == "toggleButton6") {
      map.setStyle(toggleButton6);
    }
  };
}


//click event
map.on("click", (event) => {
  // If the user clicked on one of your markers, get its information.
  const features = map.queryRenderedFeatures(event.point, {
    layers: ["museums-and-public-galleries"] 
  });
  if (!features.length) {
    return;
  }
  const feature = features[0];

  /* 
    Create a popup, specify its options 
    and properties, and add it to the map.
  */
  const popup = new mapboxgl.Popup({ offset: [0, -15], className: "my-popup" })
    .setLngLat(feature.geometry.coordinates)
    .setHTML(
      `<h3>Name: ${feature.properties.name}</h3>
    <p>Address: ${feature.properties.address1}</p>
    <p>Borough code: ${feature.properties.borough_code}</p>
    <p>Website: ${feature.properties.website}</p> 
    </p>`
    )
    .addTo(map);
});


//search bar
const geocoder = new MapboxGeocoder({
  // Initialize the geocoder
  accessToken: mapboxgl.accessToken, // Set the access token
  mapboxgl: mapboxgl, // Set the mapbox-gl instance
  marker: false, // Do not use the default marker style
  placeholder: "Search for the culture instructure in London", // Placeholder text for the search bar
  proximity: {
    longitude: 52.0,
    latitude: 0.11
  } // Coordinates of London center
});
map.addControl(geocoder, "bottom-right");


//Control bar
map.addControl(new mapboxgl.NavigationControl(), "bottom-right");
map.addControl(
  new mapboxgl.GeolocateControl({
    positionOptions: {
      enableHighAccuracy: true
    },
    trackUserLocation: true,
    showUserHeading: true
  }),
  "bottom-right"
);



// legend
  const legend = document.getElementById("legend");