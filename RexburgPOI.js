// Load the Map and MapView modules
require(["esri/Map", "esri/views/MapView", "esri/Graphic", "esri/geometry/Point", "esri/layers/GraphicsLayer", "esri/symbols/SimpleMarkerSymbol", "esri/PopupTemplate"], function(Map, MapView, Graphic, Point, GraphicsLayer, SimpleMarkerSymbol, PopupTemplate) {
  
    // Create a Map instance
    const myMap = new Map({
      basemap: "streets-vector"
    });
    // Create a MapView instan43ce (for 2D viewing) and reference the map instance
    const view = new MapView({
      container: "viewDiv",
      map: myMap,
      zoom: 12, // Optional: Set initial zoom level
      center: [-111.7897289722608, 43.82001148969177] 

    });
    
  
    var graphicsLayer = new GraphicsLayer();
    myMap.add(graphicsLayer);
  
    // Function to add a point graphic for a Place of interest
    function addPOI(longitude, latitude, stopName, description) {
    var point = new Point({
      longitude: longitude,
      latitude: latitude
    });

    var markerSymbol = new SimpleMarkerSymbol({
      color: [226, 119, 40],  // Orange
      outline: {
        color: [255, 255, 255],  // White outline
        width: 2
      }
    });

   
  
  

  // Create a PopupTemplate for the POI
        var popupTemplate = new PopupTemplate({
            title: "{name}",
            content: "This is {name}! {description}: {longitude}, {latitude}."
        });

        var pointGraphic = new Graphic({
            geometry: point,
            symbol: markerSymbol,
            attributes: {
                name: stopName,
                longitude: longitude,
                latitude: latitude,
                description: description
            },
            popupTemplate: popupTemplate  // Assign the popup template
        });
      
        graphicsLayer.add(pointGraphic);
      }
var POI = [
  { longitude: -111.78303723114027, latitude: 43.82030010519513, name: "Planetarium" , description: "With 3 to four unique showings each month this is a must see date for any galaxy fans out there!", Category: "Fun"},
  { longitude: -111.77589747564505, latitude: 44.15562113747064, name: "Civil Defense Caves" , description: "Home to some serious crevaces and even deadlier stalagmites and stalactites. It's quite the expedition for whichever adventurer!", Category: "hike" },
  { longitude: -111.79136030450309, latitude: 43.82300441847539, name: "Porter Park", description: "A peaceful park that attracts avid runners and Spikeball players alike!", Category: "Walk" },
  { longitude: -111.77830142939811, latitude:  44.00740520424963, name: "Sand Dunes", description: "Want to take a girl star gazing? Or are you looking to go sledding? If so have I got the place for you! Perfect for both and for Summer bonfires!", Category: "Fun" },
  { longitude: -111.79278194988042, latitude:  43.81850261290867, name: "Taco Truck", description: "An OG Taco truck. Want some delicious Mexican tacos, a taste of your old mission? Then this is the place for you", Category: "Food" },
  { longitude: -111.78148716217464, latitude:  43.81562316209788, name: "Ricks Gardens", description: "Peaceful place especially in the Spring and Summer. Feel free to come here and enjoy the sweet peace that envelopes one around God's nature.", Category: "Walk" },
  { longitude: -111.77469103792788, latitude:  43.85039325260046, name: "King's Roundup", description: "Great for beginners especially during their first 30 minutes of beginner classes! Open on Wednesdays and Fridays 8-12pm.", Category: "Fun" },
  { longitude: -111.7804890756667, latitude:  43.836083764591024, name: "Fat Cats", description: "The place for all avid and not so avid minigolfers! Can be a little pricy but the fun is well worth it!", Category: "Fun" },
  { longitude: -111.78529827751557, latitude: 43.83227539186468, name: "Rexburg Rapids", description: "Water slides and mini riptides! What more to say?", Category: "Fun" },
  { longitude: -111.78279867239625, latitude:  43.818403221985456, name: " Rexburg RollerBlading", description: "Open Saturday and Monday 6:30pm-10:00pm. Come on down if you wanna twist your ankle! Or just wanna have some light fun!", Category: "Sports" },
  { longitude: -111.78440434683236, latitude:  43.81865325463382, name: "VolleyBall", description: "Come on down almost any day of the week, besides Sunday. To enjoy some good ole fashioned Volleyball!", Category: "Sports" },
  { longitude: -111.81027027333195 , latitude: 43.83087792746074, name: "The Rock Gym", description: "Rock climbing can be daunting especially for beginners. But I guarantee you wont forget it! A little on the pricy end but it makes for a memorable date!", Category: "Sports" },
  { longitude: -111.77858592643412, latitude:  43.81167269238662, name: "Rexburg Temple", description: "A beautiful small temple. Home to one of the most peaceful gardens I've ever had the chance of relaxing at. One of my favorite spots to read.", Category: "Walk" },
  { longitude: -112.04117557568924, latitude:  43.50015413694857,  name: "Idaho Falls Temple", description: "Overlooking a beatiful River. Walks around this temple are not to be underestimated!", Category: "Walk" },
  { longitude: -111.81714073334564, latitude:  43.718492775829596, name: "Haunted Maze", description: "Scary and exhilirating! A must for all who are easily scared!", Category: "Fun" },
  { longitude: -111.67736108357137, latitude:  43.892774599445445, name: "Haunted Mill", description: "A scary Mill and even scarier barn! Claustrophobes beware!", Category: "Fun"},
  { longitude: -110.57475840089901, latitude: 44.64059972197151, name: "YellowStone ", description: "Beautiful park, if you go you must see ole Faithful.", Category: "Hike" },
  { longitude: -111.9890501676114 , latitude: 43.78655324868936,  name: "R Mountain ", description: "A fun, light hike for beginners and experts alike!", Category: "Hike" },
  { longitude: -111.78798371799655, latitude: 43.822160082829164, name: "Kiwi loco", description: "The premier first date spot! With good qualit froyo as a bonus", Category: "Food" },
  { longitude: -112.34425247571001, latitude:  43.19066050378673, name: "Oh Key! Escape Games ", description: "One of the most enjoyable dating spots in the area! Be careful though as this is where friendships go to die.", Category: "Fun" }
  // Add more stops from your GTFS data
];

POI.forEach(function(place) {
  addPOI(place.longitude, place.latitude, place.name, place.description);
});




document.getElementById('filter-button').addEventListener('click', function() {
  const selectedCategory = document.getElementById('category-filter').value;
  applyFilter(selectedCategory);
});

function applyFilter(category) {
  // Clear existing POIs from the map
// Clear existing POIs from the map
graphicsLayer.removeAll(); // Clear existing graphics in the graphics layer

// Filter POIs based on selected category
const filteredPOIs = POI.filter(poi => {
  return category === "all" || poi.Category.toLowerCase() === category.toLowerCase();
});

filteredPOIs.forEach(poi => {
  addPOI(poi.longitude, poi.latitude, poi.name, poi.description);
});
}

});





