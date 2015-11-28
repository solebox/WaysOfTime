(function fetch_thumbnails(){
    $.getJSON("getThumbs", function(data){
        var thumbs =[];
        var thumbs_container = $("#thumb");
        $.each(data, function(key, thumb){
            thumbs.push("<li class='map-thumbnail' id='thumb-" + thumb.id +
                "'><img class='map-thumbnail' src='"+thumb.url+"' data-id='"+thumb.id+"'/></li>");
        });
        $.each(thumbs, function(key, marked_up_thumb){
            thumbs_container.append(marked_up_thumb);
        });
    });
})();
