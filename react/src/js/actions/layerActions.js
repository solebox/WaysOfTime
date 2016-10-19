//layerActions.js

export function addLayer(map_id){
	return (dispatch) => {
		pleaseAddLayer(map_id);
		dispatch({type: "ADD_LAYER",payload: {map_id:map_id}});
	}
}
