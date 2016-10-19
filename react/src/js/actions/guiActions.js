//guiActions.js
export function toggleSliderLeft(){
	return (dispatch) => {
		dispatch({type: "TOGGLE_SLIDER_LEFT", payload: true});
	}
}
