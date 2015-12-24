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
            var modal = $("<div id='modal' class='demo-card-wide mdl-card mdl-shadow--4dp'style='position: absolute;margin: 0 auto;padding: 5px;top: 50%;left: 50%;transform: translate(-50%, -50%);width: 250px;min-height: 100px;z-index: 10;'><p>Can't load the some image twice.</p><button id='popup-button'>OK</button></div>");

            $('#map').append(modal);
            return;
        }
        chosenMaps.push(imgId);

        // Add support for right side drawer
        $('.mdl-layout__drawer-right').addClass('active');
        $(this).hide();

        $.get("/getMapById/" + imgId, function (maps) {
            $.each(maps, function (i, map) {
                addNewLayer(imgId,map);
            });
        });
    });


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


    $( "ul, li" ).disableSelection();


    /**
     *
     * @param newMap
     * @param pngUrl
     */
    function addNewLayer(imgId,newMap) {
        var newLayer = L.tileLayer(newMap.url);

        $.get("getLayer/" + String(imgId), function(data) {
            var elem =$(data);
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
            ctr++;
        });


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
 * Hide the left slider when clicked
 */
$('.mdl-layout__drawer-button').click(function(){
    $('#').toggle();
});



/******* *******/
function showLoading() {
    // remove existing loaders
    $('.loading-container').remove();
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
