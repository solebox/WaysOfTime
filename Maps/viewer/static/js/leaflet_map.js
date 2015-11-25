$(document).ready(function(){
  getLocation();
});

/**
 *  get the position of the user
 */
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}


function showPosition(position) {
  // set the map where the uer is (based on his coordinates
  var map = L.map('map').setView([position.coords.latitude, position.coords.longitude], 16);
  var marker = L.marker([position.coords.latitude, position.coords.longitude]).addTo(map);

  // create a tile layers arrays for the map
  var ovi =   L.tileLayer('http://maptile.maps.svc.ovi.com/maptiler/maptile/newest/satellite.day/{z}/{x}/{y}/256/png8'),
      base_map = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
                  attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
                  maxZoom: 18,
                  id: 'nirgn975.cigmtjxyw000rc3knz02njkhn',
                  accessToken: 'pk.eyJ1IjoibmlyZ245NzUiLCJhIjoiY2lnbXRqeTcxMDAwdmx6a3RueGViemV0eCJ9.3wBhw04dxzXHfd56yUfufQ'
                }),
      openstreets =  L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'),
      hiking =  L.tileLayer('http://osm.org.il/IsraelHiking/Tiles/{z}/{x}/{y}.png');

    var baseLayers = {
            "Base Map": base_map,
			"OVI Satellite": ovi,
			"OpenStreet map": openstreets,
			"Israel Hiking Trails": hiking
		};

    // add the widget layers to the map, and set the base map to be the default
    L.control.layers(baseLayers).addTo(map);
    //base_map.addTo(map);

    // get all the maps from the db
    getMapsListId(map);
}


function getMapsListId(onMap){
    $.get("/getMaps/", function (maps) {
        $.each(maps, function (i, map) {
            m = map;
            //onMap = base_map;
            L.tileLayer(map.url).addTo(onMap);
            //L.tileLayer(map.url).addTo($('#map'));
        })
    });
}