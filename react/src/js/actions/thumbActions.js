//thumbActions.js
import axios from "axios";
export function fetchThumbs(){
	return (dispatch) => {
		axios.get("getThumbs/null")
			.then((response)=>{
				dispatch({type: "FETCH_THUMBS_FULFILLED", payload: response.data});
			})
			.catch((error)=>{
				dispatch({type: "FETCH_THUMBS_REJECTED", payload: error});
			})
	}
}