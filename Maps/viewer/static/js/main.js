$(document).ready(function(){
    (function fetch_thumbnails(){
        $.getJSON("getThumbs", function(data){
            var thumbs =[];
            var thumbs_container = $("#thumb");
            $.each(data, function(key, thumb){
                thumbs.push("<a class='thumbnail-click' href='#'><li class='map-thumbnail' id='thumb-" + thumb.id + "'>" +
                    "<div class='demo-card-image mdl-card mdl-shadow--2dp'>" +
                    "<img class='lazy' data-original='"+thumb.url+"' data-id='"+thumb.id+"'/>" +
                    "<div class='mdl-card__actions'>" +
                    "<span class='demo-card-image__filename'>Image.jpg</span>" +
                    "</div></div></li></a>");

            });

            $.each(thumbs, function(key, marked_up_thumb){
                thumbs_container.append(marked_up_thumb);
            });

            if ($().lazyload) {
                $("img.lazy").lazyload({
                    container: $("#slider"),
                    effect : "fadeIn"
                });
            } else {
                console.log("lazyload plugin was too lazy to load");
            }
        });
    })();
});

function addNewLayer(newMap,pngUrl){

    var newLayer =  L.tileLayer(newMap.url);
    var elem =    $('<div class="mdl-card maps-card mdl-cell mdl-cell--10-col "><div class="mdl-card__media"><span><img src="'+pngUrl+'" height="50" width="30"  border="0" alt="" style="padding:10px;"></span>  </div>  <div class="mdl-card__actions"><input class="mdl-slider mdl-js-slider" type="range" min="0" max="100" value="25" tabindex="0"></input></div></div>');

    $("#layers_slider").append(elem);
    componentHandler.upgradeDom();
    elem.find(".mdl-slider").on('change', function(e){
        newLayer.setOpacity(this.value/100.0);
    });
    newLayer.addTo(window.NLIMaps.map);
}
function addFunctionality(elem){
    $(".mdl-slider").each(function(a) {

        this.onchange = function(e){
            $.data($(".mdl-slider").get(0),"layer").setOpacity(this.value/100.0);

            ;};})
}


$('#thumb').on('click', '.thumbnail-click', function(){
    var imgId = $(this).find('img').data('id');
    var thumbPng =  $(this).find('img').data('original');
    $('#chosenLayers').show();
    console.log("some thumb was clicked");

    $.get("/getMapById/" + imgId, function (maps) {
        $.each(maps, function (i, map) {
            addNewLayer(map,thumbPng);
         //   L.tileLayer(map.url).addTo(window.NLIMaps.map);
        })
    });
});


$('.mdl-cell').on('click', '.mdl-button', function(){
	console.log('search button was clicked');
});
