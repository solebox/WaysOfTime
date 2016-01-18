$(function (){
    	var maskUrlDefault = 'data:image/png;base64,'
			+ 'iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAC7lBMVEUAAAABAQECAgIDAwMEBAQF'
			+ 'BQUGBgYHBwcICAgJCQkKCgoLCwsMDAwNDQ0ODg4PDw8QEBARERESEhITExMUFBQVFRUWFhYXFxcY'
			+ 'GBgZGRkaGhobGxscHBwdHR0eHh4fHx8gICAhISEiIiIjIyMkJCQlJSUmJiYnJycoKCgpKSkqKior'
			+ 'KyssLCwtLS0uLi4vLy8wMDAxMTEyMjIzMzM0NDQ1NTU2NjY3Nzc4ODg5OTk6Ojo7Ozs8PDw9PT0+'
			+ 'Pj4/Pz9AQEBBQUFCQkJDQ0NERERGRkZHR0dISEhJSUlKSkpLS0tMTExNTU1OTk5PT09QUFBRUVFS'
			+ 'UlJTU1NUVFRVVVVWVlZXV1dYWFhZWVlaWlpbW1tcXFxdXV1eXl5fX19gYGBhYWFiYmJjY2NkZGRl'
			+ 'ZWVmZmZnZ2doaGhpaWlqampra2tsbGxtbW1ubm5vb29xcXFycnJzc3N0dHR1dXV2dnZ3d3d4eHh5'
			+ 'eXl6enp7e3t8fHx9fX1+fn5/f3+AgICBgYGCgoKDg4OEhISFhYWGhoaHh4eIiIiKioqLi4uMjIyN'
			+ 'jY2Ojo6Pj4+QkJCRkZGSkpKTk5OUlJSVlZWWlpaXl5eYmJiZmZmampqbm5ucnJydnZ2enp6fn5+g'
			+ 'oKChoaGioqKkpKSlpaWmpqanp6eoqKipqamqqqqrq6usrKytra2urq6vr6+wsLCxsbGysrKzs7O0'
			+ 'tLS1tbW2tra3t7e4uLi5ubm6urq7u7u9vb2+vr6/v7/AwMDBwcHCwsLDw8PExMTFxcXGxsbHx8fI'
			+ 'yMjJycnKysrLy8vMzMzNzc3Pz8/Q0NDR0dHS0tLT09PU1NTV1dXW1tbX19fY2NjZ2dna2trb29vc'
			+ '3Nzd3d3e3t7f39/g4ODh4eHi4uLj4+Pk5OTl5eXm5ubn5+fo6Ojp6enq6urr6+vs7Ozt7e3u7u7v'
			+ '7+/w8PDx8fHy8vLz8/P09PT19fX29vb39/f4+Pj5+fn6+vr7+/v8/Pz9/f3+/v7///9A5nLSAAAA'
			+ 'AWJLR0QAiAUdSAAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB98FHBEuKjDLarAAAAAdaVRY'
			+ 'dENvbW1lbnQAAAAAAENyZWF0ZWQgd2l0aCBHSU1QZC5lBwAAAjNJREFUOMtjYEACjExMLCzMTIwM'
			+ '2AETK7eQhIyslAgvOzM2aU4xTbvAhMyspFAXPWkedCWM7GJGYVUz1+0+fGTfpvnNCdYynEwo8twq'
			+ 'fo1rTt978fbDh3evHl7c1hOty49kCCOPTtK8U08+fPvx4+fPnz++fXpxaXWhhRAzQr9O5uob7779'
			+ 'hIPvHx/sqLISgNnCrpK8+s6nHz+RwI8vT3aVGnJDPMwk5jfvBqo8SMWjDUkKrGAFnEYNJ9+hyQNV'
			+ 'fLo+zUUAZASTeNjaJ99+YoDvr/flKLEAFbBpVp368BML+HJzohU3UAG33Yy7X7Ep+P58XZAwEwOT'
			+ 'UOC65z+wKfj5/lCmLDMDk0T87rfYFXw6W6HGysAik3kYqxOAjrjcpM3GwCKbdQSXgivNOuwMTFLJ'
			+ '+95ht+Lz+Wp1VgYmkdBNL7Er+HA0V56FgZHXef7Db9jkf7zaEikGjC92vaYLn7Ap+HpvliMPMKyZ'
			+ 'peO3vfiOxYB3x8s02ECRxWPdc+kjpiu+3FvoKwJOESwy0asefEGX//Zid74GOyTBcOoW7njyFdWM'
			+ 'b6+Ot9rwQ3MIE79F9a5Hn74jJ5cXx3vcxeCJklnIqnTD9TdfoEp+fH13b3ebuxQrIlkzCxgmTdt3'
			+ '4/n7T1++fP7w6u6xhfk24qwo+YpbwSVn4rqDZy9fOX90y6wyXw1+tLzFyMqvZBWcUdHUXJ0b6agh'
			+ 'zI6ZgxlZuIRlVbW11eXFeFhxZHAmZlY2dlYWlPwPAD6nKPWk11d/AAAAAElFTkSuQmCC';

	var count = new Date().getTime();
	var $e = function(name, attr) {
		var id = "_leaflet_tilelayer_mask_" + (count++);
		if (document.getElementById(id) != null)
			return $e(name, attr);
		var e = document.createElementNS("http://www.w3.org/2000/svg", name);
		e.setAttribute("id", id);
		if (attr)
			for (key in attr)
				if (key == "href")
					e.setAttributeNS("http://www.w3.org/1999/xlink", key, attr[key]);
				else
					e.setAttribute(key, attr[key]);
		return e;
	};

	// Main

	L.TileLayer.Mask = L.TileLayer.extend({
		options : {
			maskWidth : 512,
			maskHeight : 512,
			maskUrl : maskUrlDefault
		},
		_tileEventHandler : {
			"tileload" : function(e) {
				if (this._e5) {
					var p = L.DomUtil.getPosition(e.tile);
					e.tile._svgimg = $e("image", {
						x : p.x,
						y : p.y,
						width : this.options.tileSize,
						height : this.options.tileSize,
						href : e.url
					});
					this._e5.appendChild(e.tile._svgimg);
				}
			},
			"tileunload" : function(e) {
				var img = e.tile._svgimg;
				if (img && img.parentNode)
					img.parentNode.removeChild(img);
			}
		},
		_mapEventHandler : {
			"move" : function(e) {
				if (this._e7 && this._map) {
					var p = this._map.containerPointToLayerPoint([ 0, 0 ]);
					this._e7.setAttribute("x", -p.x);
					this._e7.setAttribute("y", -p.y);
				}
			},
			"viewreset" : function(e) {
				if (this._e5)
					while (this._e5.firstChild)
						this._e5.removeChild(this._e5.firstChild);
			},
			"zoomstart" : function(e) {
				if (this._e1)
					this._e1.style.opacity = 0.5;
			},
			"zoomend" : function(e) {
				if (this._e1)
					this._e1.style.opacity = 1.0;
			}
		},
		onRemove : function(map) {
			L.TileLayer.prototype.onRemove.call(this, map);
			if (this._e1 && this._e1.parentNode)
				this._e1.parentNode.removeChild(this._e1);
			this.off(this._tileEventHandler, this);
			map.off(this._mapEventHandler, this);
		},
		onAdd : function(map) {
			L.TileLayer.prototype.onAdd.call(this, map);
			this.getContainer().style.display = "none";
			this.on(this._tileEventHandler, this);
			map.on(this._mapEventHandler, this);

			this._e1 = $e("svg", {
				width : "100%",
				height : "100%",
				style : "pointer-events:none;position:relative;"
			});
			this._e2 = $e("defs");
			this._e3 = $e("mask", {
				maskUnits : "userSpaceOnUse"
			});
			this._e4 = $e("image", {
				width : this.options.maskWidth,
				height : this.options.maskHeight,
				href : this.options.maskUrl,
				preserveAspectRatio : "none"
			});
			this._e5 = $e("g");
			this._e6 = $e("g", {
				mask : "url(#" + this._e3.getAttribute("id") + ")"
			});
			this._e7 = $e("use", {
				href : "#" + this._e5.getAttribute("id")
			});
			this._e1.appendChild(this._e2);
			this._e2.appendChild(this._e3);
			this._e3.appendChild(this._e4);
			this._e2.appendChild(this._e5);
			this._e1.appendChild(this._e6);
			this._e6.appendChild(this._e7);

			var cnt = map.getContainer();
			cnt.appendChild(this._e1);
			this.setCenter(cnt.clientWidth * 0.5, cnt.clientHeight * 0.5);
		},
		setCenter : function(x, y) {
			if (this._e4) {
				this._e4.setAttribute("x", x - this.options.maskWidth * 0.5);
				this._e4.setAttribute("y", y - this.options.maskHeight * 0.5);
			}
			return this;
		}
	});

	L.tileLayer.mask = function(url, options) {
		return new L.TileLayer.Mask(url, options);
	};

    "use strict"

    var layer_counter = 0;
    var chosenMaps = [];

    fetch_thumbnails("null");

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
    $('#thumb').on('click', '.thumbnail-click', function(){
        var map_thumpnail = $(this);
        var map_image = map_thumpnail.find('img');
        var map_id = map_image.data('id');
        var thumbPng = map_image.attr('src');

        if ($.inArray(map_id, chosenMaps) !== -1){
            //var modal = $("<div id='modal' class='demo-card-wide mdl-card mdl-shadow--4dp'style='position: absolute;margin: 0 auto;" +
            //    "padding: 5px;top: 50%;left: 50%;transform: translate(-50%, -50%);width: 250px;min-height: 100px;" +
            //    "z-index: 10;'><p>Can't load the some image twice.</p><button id='popup-button'>OK</button></div>");

            //$('#map').append(modal);
            /* isn't this nicer?  */
            showDialog({title: 'Error', text : "Please refrain from selecting the same map again and again"});
            return;
        }
        chosenMaps.push(map_id);

        // Add support for right side drawer
        $('.mdl-layout__drawer-right').addClass('active');
        map_thumpnail.detach();

        $.get("/get_map_by_id/" + map_id, function (maps) {
            console.log(maps[0]);
            $.each(maps, function (i, map) {
                addNewLayer(map_thumpnail, map_id, map);
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

    /**
     *
     * @param newMap
     * @param pngUrl - the id of the map we want to fetch
     */
    function addNewLayer(map_thumbnail, map_id, newMap) {
        var newLayer = L.tileLayer(newMap.url);
        /* id use a less ambiguose id for the selected_thumbnail_list */
        $("#sortable").append(map_thumbnail);
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


        var layers_list = [];
        var fg;
        map_thumbnail.find(".inspect").on('click',function(e) {

            if(map_thumbnail.find(".inspect").attr("mdl-button--raised") == undefined){
                map_thumbnail.find(".inspect").attr("disable",'');
                    $("#sortable").children().each(function(i,card){

                    layers_list.push($(card).data("layer"));
                });

                for (var layer in layers_list){
                    window.NLIMaps.map.removeLayer(layers_list[layer]);


                }

                fg = L.tileLayer.mask(newMap.url, {
                    maskWidth : 800,  //optional
                    maskHeight : 800
                 });
                window.NLIMaps.map.addLayer(fg);
                 window.NLIMaps.map.on("mousemove", function(e) {
                 fg.setCenter(e.containerPoint.x, e.containerPoint.y);
                 });
                $('.mdl-layout__drawer-right').removeClass('active');
                $( '.mdl-layout__drawer, .mdl-layout__obfuscator' ).removeClass( 'is-visible' );


            }
            $(document).on('keyup',function(e) {
                 if (e.keyCode == 27) { // escape key maps to keycode `27`

                     map_thumbnail.find(".inspect").removeAttr("disable");
                     window.NLIMaps.map.removeLayer(fg);
                     for (var layer in layers_list) {
                         window.NLIMaps.map.addLayer(layer);
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
