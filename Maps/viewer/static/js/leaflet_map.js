window.NLIMaps = {

};

$(document).ready(function(){
    NLIMaps.map = createMap();

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

function addNewLayer(onMap, newMap){

    var newLayer =  L.tileLayer(newMap.url);
    $.data($(".mdl-slider").get(0),"layer",newLayer);
    newLayer.addTo(onMap);

    map.setExtent(newMap.fullExtent, true);
//    onMap.fitBounds(.getBounds());
}

function addFunctionality(){
    $(".mdl-slider").each(function(a) {

        this.onchange = function(e){
            $.data($(".mdl-slider").get(0),"layer").setOpacity(this.value/100.0);

            ;};})
}

function createMap() {
    // set the map where the uer is (based on his coordinates
    baseMap = L.map('map').setView(["31.771959", "35.217018"], 16);


    // create a base map layer
    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
                    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
                    maxZoom: 18,
                    id: 'nirgn975.cigmtjxyw000rc3knz02njkhn',
                    accessToken: 'pk.eyJ1IjoibmlyZ245NzUiLCJhIjoiY2lnbXRqeTcxMDAwdmx6a3RueGViemV0eCJ9.3wBhw04dxzXHfd56yUfufQ'
    }).addTo(baseMap);
    return baseMap;
}


