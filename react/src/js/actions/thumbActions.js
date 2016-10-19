//thumbActions.js
import axios from "axios";

export function fetchThumbs(){
	return (dispatch) => {
		axios.get("thumbs/list")
			.then((response)=>{
				dispatch({type: "FETCH_THUMBS_FULFILLED", payload: response.data});
			})
			.catch((error)=>{
				dispatch({type: "FETCH_THUMBS_REJECTED", payload: error});
			})
	}
}

export function toggleThumbSelection(id){
	return (dispatch) => {
		dispatch({type: "TOGGLE_THUMB_SELECTION",payload: id});
	}
}
