$(document).ready(function(){
    fetch_thumbnails("null");
});

$(function (){
    "use strict"

    var ctr = 0;
    var chosenMaps = [];

    /**
     *  Handle thumbnail click.
     *  Set the image-map on the map and add it to chosen layers.
     */
    $('#thumb').on('click', '.thumbnail-click', function(){
        var imgId = $(this).find('img').data('id');
        var thumbPng = $(this).find('img').attr('src');

        if ($.inArray(imgId, chosenMaps) !== -1){
            console.log("no!!!!");
            return;
        }
        chosenMaps.push(imgId);

        // Add support for right side drawer
        $('.mdl-layout__drawer-right').addClass('active');
        $(this).hide();

        $.get("/getMapById/" + imgId, function (maps) {
            $.each(maps, function (i, map) {
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
            $(ui.item[0]).data("layer").setZIndex(index);
        },
        stop: function(event, ui) {
            ($('#sortable').sortable('toArray')).map(function(item){
                $('#'+item).data("layer").setZIndex($('#'+item).index());
            });

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

        var elem = $('<div id="id' + ctr + '" data-id="' + newMap.id + '" class="demo-card-image mdl-card mdl-shadow--2dp" style="background: url(' + pngUrl + ') center / cover;">'+
                    '<div class="mdl-card__title mdl-card--expand"><h2 class="mdl-card__title-text">' + newMap.title + '</h2></div>'+
                    '<div class="mdl-card__menu">'+
                    '<button id="info" class="mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect"><i class="material-icons">info</i></button>'+
                    '<button id="delete" class="mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect"><i class="material-icons">clear</i></button>'+
                    '</div>'+
                    '<div class="mdl-card__actions"><input class="mdl-slider mdl-js-slider" type="range" min="0" max="100" value="100" tabindex="0" />'+
                    '</div></div>');

        ctr++;
        $($("#layers_slider").find("#sortable")).append(elem);
        elem.data("layer",newLayer);
        componentHandler.upgradeDom();

        elem.find("#delete").on('click',function(e) {
            window.NLIMaps.map.removeLayer(newLayer);
            elem.remove();
            var idToRemove = $(this).parents(".demo-card-image").data("id");
            chosenMaps.splice(chosenMaps.indexOf(idToRemove));

            if(!$('#sortable').children().length){
                $('.mdl-layout__drawer-right').removeClass('active');
            }
        });

        elem.find("#info").on("click", function(){
            $("#modal").toggle();
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
                "<span class='demo-card-image__filename'>" + thumb.title + "</span>" +
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


/**
 *
 */
$('.mdl-layout__drawer-button').click(function(){
    $('#').hide();
});
