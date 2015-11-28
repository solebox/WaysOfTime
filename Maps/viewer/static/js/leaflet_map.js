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

    // create a base map layer
    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
                    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
                    maxZoom: 18,
                    id: 'nirgn975.cigmtjxyw000rc3knz02njkhn',
                    accessToken: 'pk.eyJ1IjoibmlyZ245NzUiLCJhIjoiY2lnbXRqeTcxMDAwdmx6a3RueGViemV0eCJ9.3wBhw04dxzXHfd56yUfufQ'
    }).addTo(map);

    // get all the maps from the db
    getMapsListId(map);
}


function getMapsListId(onMap){
    $.get("/getMaps/", function (maps) {
        $.each(maps, function (i, map) {
            L.tileLayer(map.url).addTo(onMap);
        })
    });
}
