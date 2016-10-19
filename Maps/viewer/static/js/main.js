
$(function (){
    "use strict"

    var layer_counter = 0;
    var chosenMaps = [];

    // fetch_thumbnails("null");

    $('#layers_slider').on('click', 'button.show-info', function (e) {
        var map_id = $(this).data("id");
         $.get("/get_map_info/" + map_id, function (info) {
            showDialog({
                text: info
            })
        });
    });

    /**
     *  Handle thumbnail click.
     *  Set the image-map on the map and add it to chosen layers.
     */
    // $('#thumb').on('click', '.thumbnail-click', function(){
    //     var map_thumpnail = $(this);
    //     var map_image = map_thumpnail.find('img');
    //     var map_id = map_image.data('id');
    //     var thumbPng = map_image.attr('src');
    //
    //     if ($.inArray(map_id, chosenMaps) !== -1){
    //         //var modal = $("<div id='modal' class='demo-card-wide mdl-card mdl-shadow--4dp'style='position: absolute;margin: 0 auto;" +
    //         //    "padding: 5px;top: 50%;left: 50%;transform: translate(-50%, -50%);width: 250px;min-height: 100px;" +
    //         //    "z-index: 10;'><p>Can't load the some image twice.</p><button id='popup-button'>OK</button></div>");
    //
    //         //$('#map').append(modal);
    //         /* isn't this nicer?  */
    //         showDialog({title: 'Error', text : "Please refrain from selecting the same map again and again"});
    //         return;
    //     }
    //     chosenMaps.push(map_id);
    //
    //     // Add support for right side drawer
    //     $('.mdl-layout__drawer-right').addClass('active');
    //     map_thumpnail.detach();
    //
    //     $.get("/get_map_by_id/" + map_id, function (maps) {
    //         $.each(maps, function (i, map) {
    //             addNewLayer(map_thumpnail, map_id, map);
    //         });
    //     });
    // });


    /**
     *  Handle search click.
     *  Empty all thumbnails and call fetch_thumbnails with the search string.
     */
    $('#search').on('click', '.mdl-button', function(){
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
            var len = $('#sortable').sortable('toArray').length;
            ($('#sortable').sortable('toArray')).map(function(item){
                $('#'+item).data("layer").setZIndex(len-$('#'+item).index()-1);
            });
        }
    });

    /**
     * Remove the popup modal when his
     * ok button pressed
     */
    $('#map').on('click', '#popup-button', function(){
        $('#modal').remove();
    });


    //$( "ul, li" ).disableSelection();

    function  zoomLayer(bbox){
        var t =bbox.split(",");
        var b1 = t.slice(0,2);
        var b2 = t.slice(2,4);

        window.NLIMaps.map.fitBounds([b1.reverse(),b2.reverse()],{padding:[100,100]});
    }

    /**
     *
     * @param newMap
     * @param pngUrl - the id of the map we want to fetch
     */
    function addNewLayer(map_thumbnail, map_id, newMap) {
        var newLayer = L.tileLayer(newMap.url);

        zoomLayer(newMap.bbox)

        /* id use a less ambiguose id for the selected_thumbnail_list */
        $("#sortable").prepend(map_thumbnail);


        map_thumbnail.data("layer",newLayer);

        map_thumbnail.find(".mdl-card__menu").removeClass("invisible");
        map_thumbnail.find(".thumb-slider").removeClass("invisible").addClass("mdl-slider mdl-js-slider");

        componentHandler.upgradeDom();

        map_thumbnail.find(".delete").on('click',function(e) {
            window.NLIMaps.map.removeLayer(newLayer);
            map_thumbnail.remove();
            var idToRemove = $(this).parents(".demo-card-image").data("id");
            chosenMaps.splice(chosenMaps.indexOf(idToRemove));

            if(!$('#sortable').children().length){
                $('.mdl-layout__drawer-right').removeClass('active');
            }
        });

        map_thumbnail.find("#info").on("click", function(){
            $("#modal").toggle();
        });

        map_thumbnail.find(".zoom-map").on("click", function(){
            zoomLayer(newMap.bbox);
        });

        var layers_list = [];
        var fg;
        map_thumbnail.find(".inspect").on('click',function(e) {


                $("#sortable").children().each(function(i,card){
                    layers_list.push($(card).data("layer"));
                });

                for (var layer in layers_list){
                    window.NLIMaps.map.removeLayer(layers_list[layer]);
                }
                $.getScript("static/js/leaflet-tilelayer-mask.js", function(){
                    fg = L.tileLayer.mask(newMap.url, {
                        maskWidth : 800,  //optional
                        maskHeight : 800
                    });
                      window.NLIMaps.map.addLayer(fg);
                     window.NLIMaps.map.on("mousemove", function(e) {
                        fg.setCenter(e.containerPoint.x, e.containerPoint.y);
                     });
                });



                $('.mdl-layout__drawer-right').removeClass('active');
                $( '.mdl-layout__drawer, .mdl-layout__obfuscator' ).removeClass( 'is-visible' );



            $(document).on('keyup',function(e) {
                 if (e.keyCode == 27) { // escape key maps to keycode `27`

                     map_thumbnail.find(".inspect").removeAttr("disable");
                     window.NLIMaps.map.removeLayer(fg);
                     for (var layer in layers_list) {
                         window.NLIMaps.map.addLayer(layers_list[layer]);
                     }
                     $('.mdl-layout__drawer-right').addClass('active');
                     $( '.mdl-layout__drawer, .mdl-layout__obfuscator' ).addClass( 'is-visible' );
                     $(document).unbind('keyup');
                 }
            });



        });


        map_thumbnail.find(".mdl-slider").on('change', function (e) {
            newLayer.setOpacity(this.value / 100.0);
        });


        newLayer.addTo(window.NLIMaps.map);
        layer_counter++;
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
        });
    }
});

/**
 *  Fetch thumbnails from the db, and place them in thumb div (in the slider)
 *  with lazy loading.
 *
 * @param string - the string to search in db, "null" if there isn't any.
 */
function fetch_thumbnails(string){
    $.get("getThumbs/" + string, function(data){
        var thumbs_container = $("#thumb");
        thumbs_container.append(data);

        if ($().lazyload) {
            //$("img.lazy").lazyload({
            //    container: $("#slider"),
            //    effect : "fadeIn"
            //});
        } else {
            console.log("lazyload plugin was too lazy to load");
        }
    });
}

/**
 * Hide the left slider when clicked
 */
$('.mdl-layout__drawer-button').click(function(){
    $('#').toggle();
});

/******* *******/
function showLoading() {
    // remove existing loaders
    $('.loading-container').remove();
    /* you sick sick person :) */
    $('<div id="orrsLoader" class="loading-container"><div><div class="mdl-spinner mdl-js-spinner is-active"></div></div></div>').appendTo("body");

    componentHandler.upgradeElements($('.mdl-spinner').get());
    setTimeout(function () {
        $('#orrsLoader').css({opacity: 1});
    }, 1);
}

function hideLoading() {
    $('#orrsLoader').css({opacity: 0});
    setTimeout(function () {
        $('#orrsLoader').remove();
    }, 400);
}

function showDialog(options) {
    options = $.extend({
        id: 'orrsDiag',
        title: null,
        text: null,
        negative: false,
        positive: false,
        cancelable: true,
        contentStyle: null,
        onLoaded: false
    }, options);

    // remove existing dialogs
    $('.dialog-container').remove();
    $(document).unbind("keyup.dialog");

    $('<div id="' + options.id + '" class="dialog-container"><div class="mdl-card mdl-shadow--16dp"></div></div>').appendTo("body");
    var dialog = $('#orrsDiag');
    var content = dialog.find('.mdl-card');
    if (options.contentStyle != null) content.css(options.contentStyle);
    if (options.title != null) {
        $('<h5>' + options.title + '</h5>').appendTo(content);
    }
    if (options.text != null) {
        $('<p>' + options.text + '</p>').appendTo(content);
    }
    if (options.negative || options.positive) {
        var buttonBar = $('<div class="mdl-card__actions dialog-button-bar"></div>');
        if (options.negative) {
            options.negative = $.extend({
                id: 'negative',
                title: 'Cancel',
                onClick: function () {
                    return false;
                }
            }, options.negative);
            var negButton = $('<button class="mdl-button mdl-js-button mdl-js-ripple-effect" id="' + options.negative.id + '">' + options.negative.title + '</button>');
            negButton.click(function (e) {
                e.preventDefault();
                if (!options.negative.onClick(e))
                    hideDialog(dialog)
            });
            negButton.appendTo(buttonBar);
        }
        if (options.positive) {
            options.positive = $.extend({
                id: 'positive',
                title: 'OK',
                onClick: function () {
                    return false;
                }
            }, options.positive);
            var posButton = $('<button class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect" id="' + options.positive.id + '">' + options.positive.title + '</button>');
            posButton.click(function (e) {
                e.preventDefault();
                if (!options.positive.onClick(e))
                    hideDialog(dialog)
            });
            posButton.appendTo(buttonBar);
        }
        buttonBar.appendTo(content);
    }
    componentHandler.upgradeDom();
    if (options.cancelable) {
        dialog.click(function () {
            hideDialog(dialog);
        });
        $(document).bind("keyup.dialog", function (e) {
            if (e.which == 27)
                hideDialog(dialog);
        });
        content.click(function (e) {
            e.stopPropagation();
        });
    }
    setTimeout(function () {
        dialog.css({opacity: 1});
        if (options.onLoaded)
            options.onLoaded();
    }, 1);
}

function hideDialog(dialog) {
    $(document).unbind("keyup.dialog");
    dialog.css({opacity: 0});
    setTimeout(function () {
        dialog.remove();
    }, 400);
}
