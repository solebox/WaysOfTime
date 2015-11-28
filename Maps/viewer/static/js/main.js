$(document).ready(function(){
    (function fetch_thumbnails(){
        $.getJSON("getThumbs", function(data){
            var thumbs =[];
            var thumbs_container = $("#thumb");
            $.each(data, function(key, thumb){
                thumbs.push("<li class='map-thumbnail' id='thumb-" + thumb.id +
                    "'><img class='lazy' data-original='"+thumb.url+"' data-id='"+thumb.id+"'/></li>");
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



