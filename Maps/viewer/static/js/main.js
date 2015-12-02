$(document).ready(function(){
    fetch_thumbnails("null");
});

$(function (){
  "use strict"

  $('#thumb').on('click', '.thumbnail-click', function(){
      var imgId = $(this).find('img').data('id');
      $('#chosenLayers').show();

      $.get("/getMapById/" + imgId, function (maps) {
         $.each(maps, function (i, map) {
             L.tileLayer(map.url).addTo(baseMap);
         });
      });
  });

  $('.mdl-cell').on('click', '.mdl-button', function(){
    var searchString = $('#fixed-search').val();
    $('#thumb').empty();
    if(searchString !== ""){
        fetch_thumbnails(searchString);
    } else {
      fetch_thumbnails("null");
    }

  });

});
// efi

    var pallet =["#F44336","#E91E63","#9C27B0","#3F51B5","#03A9F4","#4CAF50","#CDDC39"];
    var ctr = 0;

    $(function() {
    $( "#sortable" ).sortable({
      revert: true,
      change: function(event, ui) {
            var start_pos = ui.item.data('start_pos');
            var index = ui.placeholder.index();

          $(ui.item[0]).data("layer").setZIndex(index)

        }
    });

    $( "ul, li" ).disableSelection();
  });

    function addNewLayer(newMap, pngUrl) {

        var newLayer = L.tileLayer(newMap.url);
        var elem = $('<div id="draggable" class="mdl-card maps-card mdl-cell mdl-cell--10-col ui-state-highlight "><div class="mdl-card__media"><span><img class="nopadding" src="' + pngUrl + '" height="50" width="30"  border="0" alt="" style="padding:10px;"> <button class="mdl-button mdl-js-button mdl-button--fab mdl-button--colored"> <i class="material-icons">clear</i></button></span>  </div>  <div class="mdl-card__actions"><input class="mdl-slider mdl-js-slider" type="range" min="0" max="100" value="25" tabindex="0"></input></div></div>');
        ctr++;
        $($("#layers_slider").find("#sortable")).append(elem);
        elem.data("layer",newLayer);
        elem.find(".mdl-card__media").css("background-color", pallet[ctr%7]);
        componentHandler.upgradeDom();
        elem.find(".mdl-slider").on('change', function (e) {
            newLayer.setOpacity(this.value / 100.0);
        });
        newLayer.addTo(window.NLIMaps.map);
    }

    function addFunctionality(elem) {
        $(".mdl-slider").each(function (a) {

            this.onchange = function (e) {
                $.data($(".mdl-slider").get(0), "layer").setOpacity(this.value / 100.0);


            };
        })
    }


    $('#thumb').on('click', '.thumbnail-click', function () {
        var imgId = $(this).find('img').data('id');
        var thumbPng = $(this).find('img').data('original');
        $('#chosenLayers').show();
        console.log("some thumb was clicked");

        $.get("/getMapById/" + imgId, function (maps) {
            $.each(maps, function (i, map) {
                addNewLayer(map, thumbPng);
                //   L.tileLayer(map.url).addTo(window.NLIMaps.map);
            })
        });
    });


// efi END

function fetch_thumbnails(string){
    $.getJSON("getThumbs/" + string, function(data){
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
};
