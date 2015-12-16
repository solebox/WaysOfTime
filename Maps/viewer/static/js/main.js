$(document).ready(function(){
    fetch_thumbnails("null");
});

$(function (){
    "use strict"

    var pallet =["#F44336","#E91E63","#9C27B0","#3F51B5","#03A9F4","#4CAF50","#CDDC39"];
    var ctr = 0;


    /**
     *  Handle thumbnail click.
     *  Set the image-map on the map and add it to chosen layers.
     */
    $('#thumb').on('click', '.thumbnail-click', function(){
        var imgId = $(this).find('img').data('id');
        var thumbPng = $(this).find('img').attr('src');

        // Add support for right side drawer
        $('.mdl-layout__drawer-right').addClass('active'); 
        
        $.get("/getMapById/" + imgId, function (maps) {
            $.each(maps, function (i, map) {
                //L.tileLayer(map.url).addTo(window.NLIMaps.map);
                addNewLayer(map, thumbPng);
            });
        });
    });


    /**
     *  Handle search click.
     *  Empty all thumbnails and call fetch_thumbnails with the search string.
     */
    $('.mdl-cell').on('click', '.mdl-button', function(){
        var searchString = $('#fixed-search').val();
        $('#thumb').empty();
        if(searchString !== ""){
            fetch_thumbnails(searchString);
        } else {
            fetch_thumbnails("null");
        }
    });


  /**
   *
   */
    $( "#sortable" ).sortable({
        revert: true,
        change: function(event, ui) {
            var start_pos = ui.item.data('start_pos');
            var index = ui.placeholder.index();
            $(ui.item[0]).data("layer").setZIndex(index)
        }
    });


    $( "ul, li" ).disableSelection();


    /**
     *
     * @param newMap
     * @param pngUrl
     */
    function addNewLayer(newMap, pngUrl) {
        var newLayer = L.tileLayer(newMap.url);
        var elem = $('<div class="demo-card-image mdl-card mdl-shadow--2dp" style="background: url('+ pngUrl +') center / cover;">'+
  '<div class="mdl-card__title mdl-card--expand"></div>'+
  '<div class="mdl-card__actions">'+
    '<span class="demo-card-image__filename">1900</span>'+
  '</div></div>');
        ctr++;
        $($("#layers_slider").find("#sortable")).append(elem);
        elem.data("layer",newLayer);
        elem.find(".mdl-card__media").css("background-color", pallet[ctr%7]);
        componentHandler.upgradeDom();

        elem.find(".mdl-button").on('click',function(e) {
            window.NLIMaps.map.removeLayer(newLayer);
            elem.remove();
        });
        elem.find(".mdl-slider").on('change', function (e) {
            newLayer.setOpacity(this.value / 100.0);
        });
        newLayer.addTo(window.NLIMaps.map);
    }


    /**
     *
     * @param elem
     */
    function addFunctionality(elem) {
        $(".mdl-slider").each(function (a) {
            this.onchange = function (e) {
                $.data($(".mdl-slider").get(0), "layer").setOpacity(this.value / 100.0);
            };
        })
    }

});


/**
 *  Fetch thumbnails from the db, and place them in thumb div (in the slider)
 *  with lazy loading.
 *
 * @param string - the string to search in db, "null" if there isn't any.
 */
function fetch_thumbnails(string){
    $.getJSON("getThumbs/" + string, function(data){
        var thumbs =[];
        var thumbs_container = $("#thumb");
        $.each(data, function(key, thumb){
            thumbs.push(
                "<li class='thumbnail-click'><div class='demo-card-image mdl-card mdl-shadow--2dp' style='background: url("+ thumb.url +") center / cover;'>" +
                "<img src='"+thumb.url+"' data-id='"+thumb.id+"' style='visibility:hidden;'/>" +
                "<div class='mdl-card__actions'>" +
                "<span class='demo-card-image__filename'>Image.jpg</span>" +
                "</div></div></li>");
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


$('.mdl-layout__drawer-button').click(function(){
    $('#').hide();
});
