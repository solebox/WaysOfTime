window.NLIMaps = {};

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


function createMap() {
    // set the map where the uer is (based on his coordinates
    var baseMap = L.map('map', { zoomControl:false }).setView(["31.771959", "35.217018"], 16);

    // Initialise the FeatureGroup to store editable layers
    var drawnItems = new L.FeatureGroup();
    baseMap.addLayer(drawnItems);

    // Initialise the draw control and pass it the FeatureGroup of editable layers
    var drawControl = new L.Control.Draw({
        position: 'topleft',
        draw: {
            //polyline: {
            //    metric: true
            //},
            polygon: {
                allowIntersection: false,
                showArea: true,
                drawError: {
                    color: '#b00b00',
                    timeout: 1000
                },
                shapeOptions: {
                    color: '#bada55'
                }
            },
            //circle: {
            //    shapeOptions: {
            //        color: '#662d91'
            //    }
            //},
            marker: false
        },
        edit: {
            featureGroup: drawnItems,
            remove: false
        }
    });
    baseMap.addControl(drawControl);

    // create a base map layer
    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
                    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
                    maxZoom: 18,
                    id: 'nirgn975.cigmtjxyw000rc3knz02njkhn',
                    accessToken: 'pk.eyJ1IjoibmlyZ245NzUiLCJhIjoiY2lnbXRqeTcxMDAwdmx6a3RueGViemV0eCJ9.3wBhw04dxzXHfd56yUfufQ'
    }).addTo(baseMap);

    baseMap.on('draw:created', function (e) {
        var type = e.layerType,
            layer = e.layer;

        if (type === 'marker') {
            layer.bindPopup('A popup!');
        }

        drawnItems.addLayer(layer);
        debugger;
        geoSearch(layer._latlngs);
    });

    baseMap.on('draw:edited', function (e) {
        var layers = e.layers;
        var countOfEditedLayers = 0;
        layers.eachLayer(function(layer) {
            countOfEditedLayers++;
        });
        console.log("Edited " + countOfEditedLayers + " layers");
        for (var layerObject in layers._layers) {
            debugger;
            geoSearch(layers._layers[layerObject]._latlngs);
        }
    });
    return baseMap;
}

// using jQuery
function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie != '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = jQuery.trim(cookies[i]);
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) == (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

function csrfSafeMethod(method) {
    // these HTTP methods do not require CSRF protection
    return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
}

function geoSearch(array) {
    $.ajaxSetup({
        beforeSend: function(xhr, settings) {
            if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
                xhr.setRequestHeader("X-CSRFToken", csrftoken);
            }
        }
    });
    var csrftoken = getCookie('csrftoken');
    $.ajax({
            type: 'POST',
            url: '/getGeoThumbs/',
            data: {'lenlat[]': array},
    }).done(function(data) {
        $('#thumb').empty()
        var thumbs_container = $("#thumb");
        thumbs_container.append(data);
    });
}
