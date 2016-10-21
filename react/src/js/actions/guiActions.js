//guiActions.js
export function toggleSliderLeft(){
	return (dispatch) => {
		dispatch({type: "TOGGLE_SLIDER_LEFT", payload: true});
	}
}

export function toggleInfoModal(map_id){
	return (dispatch) => {
		dispatch({type: "TOGGLE_INFO_MODAL", payload: map_id});
	}
}
