//layerActions.js
import axios from "axios";
export function addLayer(map_id){
	return (dispatch) => {
		pleaseAddLayer(map_id);
		dispatch({type: "ADD_LAYER",payload: {map_id:map_id}});
	}
}


window.NLIMaps.layer_list = [];
window.NLIMaps.layer_counter = 0;
function pleaseAddLayer(map_id) {
        
        
        $.getJSON("/get_map_by_id/" + map_id, (data) => {
           const newMap = data.pop();
          
           
            console.log(newMap);
            var newLayer = L.tileLayer(newMap.url);

                
            zoomLayer(newMap.bbox)


                    for (var layer in window.NLIMaps.layer_list){
                        window.NLIMaps.map.removeLayer(layers_list[layer]);
                    }
                    $.getScript("static/js/leaflet-tilelayer-mask.js", function(){
                        fg = L.tileLayer.mask(newMap.url, {
                            maskWidth : 800,  //optional
                            maskHeight : 800
                        });
                          window.NLIMaps.map.addLayer(fg);
                         window.NLIMaps.map.on("mousemove", function(e) {
                            // fg.setCenter(e.containerPoint.x, e.containerPoint.y);
                         });
                    });


            newLayer.addTo(window.NLIMaps.map);
            window.NLIMaps.layer_counter++;
         });
    }