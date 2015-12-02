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
