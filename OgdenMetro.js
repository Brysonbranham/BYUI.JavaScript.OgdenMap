// Load the Map and MapView modules
require(["esri/Map", "esri/views/MapView"], function(Map, MapView) {
    // Create a Map instance
    const myMap = new Map({
      basemap: "streets-vector"
    });
    // Create a MapView instance (for 2D viewing) and reference the map instance
    const view = new MapView({
      container: "viewDiv",
      map: myMap,
      zoom: 12, // Optional: Set initial zoom level
      center: [-111.9731, 41.223] 

    });

    view.when(() => {
      console.log("Map view is ready!");
  }, (error) => {
      console.error("Error loading map view:", error);
  });
  
  });
