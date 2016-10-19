//layerActions.js
import axios from "axios";



export function addLayer(map_id) {
	return (dispatch) => {
        const  zoomLayer = (bbox) => {
		    var t =bbox.split(",");
		    var b1 = t.slice(0,2);
		    var b2 = t.slice(2,4);

	    	window.NLIMaps.map.fitBounds([b1.reverse(),b2.reverse()],{padding:[100,100]});
 		}
        axios.get("/get_map_by_id/"+map_id)
			.then((response)=>{
					const newMap = response.data.pop();
          
			          
			            console.log(newMap);
			            var newLayer = L.tileLayer(newMap.url);

			                
			            zoomLayer(newMap.bbox)


		                    for (var layer in window.NLIMaps.layer_list){
		                        window.NLIMaps.map.removeLayer(layers_list[layer]);
		                    }
		                    $.getScript("static/js/leaflet-tilelayer-mask.js", function(){
		                        var fg = L.tileLayer.mask(newMap.url, {
		                            maskWidth : 800,  //optional
		                            maskHeight : 800
		                        });
		                          window.NLIMaps.map.addLayer(fg);
		                         window.NLIMaps.map.on("mousemove", function(e) {
		                            fg.setCenter(e.containerPoint.x, e.containerPoint.y);
		                         });
		                    });


           				 newLayer.addTo(window.NLIMaps.map);
				dispatch({type: "ADD_LAYER", payload: response.data});
			})
			.catch((error)=>{
				dispatch({type: "LAYER_ADD_FAILED", payload: error});
			})

		}
  
    }


  